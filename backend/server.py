from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from html import escape
import bcrypt
import jwt
import io
import json
import zipfile
from fastapi.responses import StreamingResponse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from emailer import send_email

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ["JWT_SECRET"]
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Auth helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def set_auth_cookies(response: Response, user_id: str, email: str):
    response.set_cookie("access_token", create_access_token(user_id, email), httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie("refresh_token", create_refresh_token(user_id), httponly=True, secure=True, samesite="none", max_age=604800, path="/")

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


async def seed_admin():
    email = os.environ["ADMIN_EMAIL"].lower()
    password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()), "email": email, "password_hash": hash_password(password),
            "name": "Admin", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded")
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})
        logger.info("Admin password updated from env")


@app.on_event("startup")
async def startup():
    await seed_admin()
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.blog_posts.create_index("slug", unique=True)


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    project_type: str
    budget: str
    message: str = Field(min_length=10, max_length=4000)

class ContactInquiry(ContactInquiryCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class SettingsIn(BaseModel):
    contact_email: EmailStr
    contact_phone: str = ""
    social_linkedin: str = ""
    social_instagram: str = ""
    social_github: str = ""

class BlogPostIn(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    excerpt: str = Field(default="", max_length=400)
    cover_image: str = Field(default="", max_length=1000)
    content: str = Field(min_length=10)
    tags: List[str] = []
    status: str = Field(default="published", pattern="^(published|draft)$")

class BlogPost(BlogPostIn):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


DEFAULT_SETTINGS = {
    # Public-facing contact mailbox shown on the website UI (info@jiyaitech.com).
    # OWNER_EMAIL (env) remains the private notification target for inquiries.
    "contact_email": "info@jiyaitech.com",
    "contact_phone": "+91 7042579843",
    "social_linkedin": "https://www.linkedin.com",
    "social_instagram": "https://www.instagram.com",
    "social_github": "https://github.com",
}


def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug or "post"

def inquiry_email_html(inq: ContactInquiry) -> str:
    rows = [
        ("Name", inq.name), ("Email", inq.email), ("Company", inq.company or "-"),
        ("Project Type", inq.project_type), ("Budget", inq.budget), ("Message", inq.message),
    ]
    body = "".join(
        f'<tr><td style="padding:8px 14px;color:#64748b;font-size:13px;vertical-align:top">{escape(k)}</td>'
        f'<td style="padding:8px 14px;font-size:13px;color:#0f172a">{escape(v)}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">'
        '<tr><td>'
        '<table role="presentation" width="100%" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:20px">'
        f'<tr><td style="font-size:16px;font-weight:bold;color:#0f172a;padding-bottom:12px">New project inquiry via the J1YAI website</td></tr>'
        f'<tr><td><table role="presentation">{body}</table></td></tr>'
        '</table>'
        '<p style="font-size:11px;color:#94a3b8;padding-top:12px">Sent by the J1YAI contact form. Reply directly to respond to the sender.</p>'
        '</td></tr></table>'
    )


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"message": "J1YAI API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact")
async def create_contact_inquiry(input: ContactInquiryCreate):
    inquiry = ContactInquiry(**input.model_dump())
    doc = inquiry.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_inquiries.insert_one(doc)
    try:
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New inquiry: {inq_safe(inquiry.project_type)} from {inq_safe(inquiry.name)}",
            html=inquiry_email_html(inquiry),
            reply_to=inquiry.email,
        )
    except Exception as e:
        logger.error(f"Inquiry email notification failed: {e}")
    return {"success": True, "id": inquiry.id}

def inq_safe(value: str) -> str:
    return re.sub(r"[\r\n]+", " ", value)[:80]

@api_router.get("/settings")
async def get_settings():
    doc = await db.site_settings.find_one({"key": "site"}, {"_id": 0, "key": 0})
    return {**DEFAULT_SETTINGS, **(doc or {})}

@api_router.get("/blog")
async def list_published_posts():
    return await db.blog_posts.find({"status": "published"}, {"_id": 0}).sort("created_at", -1).to_list(200)

@api_router.get("/blog/{slug}")
async def get_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "status": "published"}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# ---------- Auth routes ----------
@api_router.post("/auth/login")
async def login(input: LoginIn, request: Request, response: Response):
    email = input.email.lower()
    identifier = f"{request.client.host}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until"):
        locked_until = datetime.fromisoformat(attempt["locked_until"])
        if locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in a few minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        count = (attempt.get("count", 0) if attempt else 0) + 1
        update = {"identifier": identifier, "count": count, "last_attempt": datetime.now(timezone.utc).isoformat()}
        if count >= 5:
            update["locked_until"] = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    set_auth_cookies(response, user["id"], email)
    return {"id": user["id"], "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"success": True}

@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user

@api_router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    user = await db.users.find_one({"id": payload["sub"]})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    response.set_cookie("access_token", create_access_token(user["id"], user["email"]), httponly=True, secure=True, samesite="none", max_age=900, path="/")
    return {"success": True}


# ---------- Admin routes ----------
@api_router.get("/admin/inquiries")
async def list_inquiries(user=Depends(get_current_user)):
    return await db.contact_inquiries.find({}, {"_id": 0}).sort("timestamp", -1).to_list(500)

@api_router.put("/admin/settings")
async def update_settings(input: SettingsIn, user=Depends(get_current_user)):
    doc = input.model_dump()
    await db.site_settings.update_one({"key": "site"}, {"$set": {"key": "site", **doc}}, upsert=True)
    return {"success": True, **doc}

@api_router.get("/admin/blog")
async def admin_list_posts(user=Depends(get_current_user)):
    return await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)

@api_router.post("/admin/blog")
async def create_post(input: BlogPostIn, user=Depends(get_current_user)):
    post = BlogPost(**input.model_dump())
    base = slugify(post.title)
    slug, n = base, 1
    while await db.blog_posts.find_one({"slug": slug}):
        n += 1
        slug = f"{base}-{n}"
    post.slug = slug
    await db.blog_posts.insert_one(post.model_dump())
    return post

@api_router.put("/admin/blog/{post_id}")
async def update_post(post_id: str, input: BlogPostIn, user=Depends(get_current_user)):
    existing = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    update = input.model_dump()
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.blog_posts.update_one({"id": post_id}, {"$set": update})
    return {**existing, **update}

@api_router.delete("/admin/blog/{post_id}")
async def delete_post(post_id: str, user=Depends(get_current_user)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True}


# ---------- Project export (admin only) ----------
EXPORT_EXCLUDE_DIRS = {"node_modules", "__pycache__", ".git", "build", "dist", ".next", ".pnpm-store"}

BACKEND_ENV_EXAMPLE = """MONGO_URL="mongodb://localhost:27017"
DB_NAME="j1yai"
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="generate-a-long-random-string-here"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="change-me"
EMERGENT_EMAIL_KEY=""
EMAIL_FROM_NAME="J1YAI"
EMAIL_REPLY_TO="you@example.com"
OWNER_EMAIL="you@example.com"
"""

FRONTEND_ENV_EXAMPLE = """REACT_APP_BACKEND_URL=http://localhost:8001
"""

EXPORT_README = """# J1YAI Website — Project Export

## What's inside
- frontend/ — React app (pages, components, admin panel)
- backend/ — FastAPI API (server.py, emailer.py, requirements.txt)
- scripts/ — blog seed scripts
- memory/ — PRD and credentials record
- data_export.json — your MongoDB data: blog posts, site settings, contact inquiries

## Setup locally
1. Install MongoDB locally (or use a free MongoDB Atlas cluster).
2. Backend: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
3. Copy backend/.env.example to backend/.env and fill in real values.
4. Run backend: uvicorn server:app --host 0.0.0.0 --port 8001 --reload
5. Frontend: cd frontend && yarn install
6. Copy frontend/.env.example to frontend/.env (point REACT_APP_BACKEND_URL at your backend).
7. Run frontend: yarn start (opens on port 3000)
8. The admin user is seeded automatically on backend startup from ADMIN_EMAIL/ADMIN_PASSWORD.

## Restore your content (blog posts, settings, inquiries)
Import data_export.json into MongoDB, e.g. with a small Python script using pymongo:
insert blog_posts -> blog_posts collection, site_settings -> site_settings, contact_inquiries -> contact_inquiries.
Or re-run scripts/seed_blogs.py and scripts/seed_blogs_batch2.py with API_URL pointing at your local backend.

## Notes
- Real .env files are intentionally excluded (they contain secrets).
- Email sending uses the Emergent integrations gateway (EMERGENT_EMAIL_KEY); outside Emergent, swap emailer.py for Resend/SMTP directly.
"""


@api_router.get("/admin/export")
async def export_project(user=Depends(get_current_user)):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for folder in ["frontend", "backend", "scripts", "memory"]:
            base = Path("/app") / folder
            if not base.exists():
                continue
            for path in sorted(base.rglob("*")):
                if path.is_dir():
                    continue
                if set(path.parts) & EXPORT_EXCLUDE_DIRS or path.name == ".env":
                    continue
                zf.write(path, str(path.relative_to("/app")))
        zf.writestr("backend/.env.example", BACKEND_ENV_EXAMPLE)
        zf.writestr("frontend/.env.example", FRONTEND_ENV_EXAMPLE)
        posts = await db.blog_posts.find({}, {"_id": 0}).to_list(1000)
        settings = await db.site_settings.find({}, {"_id": 0}).to_list(10)
        inquiries = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
        zf.writestr(
            "data_export.json",
            json.dumps({"blog_posts": posts, "site_settings": settings, "contact_inquiries": inquiries}, indent=2, default=str),
        )
        zf.writestr("README_EXPORT.md", EXPORT_README)
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=j1yai-project.zip"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
