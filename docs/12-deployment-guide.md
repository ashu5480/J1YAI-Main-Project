# 12 — Deployment Guide

## 1. Prerequisites
| Tool | Local dev (this machine) | Notes |
|---|---|---|---|
| Node.js | v24 (installed) | needed for frontend |
| Yarn 1.22 | via corepack | frontend package manager (`yarn.lock` committed) |
| Python | 3.12.10 (`AppData\Local\Programs\Python\Python312`) | backend runtime |
| MongoDB | portable 8.0.4 (`d:\Ashutosh_Work\tools\mongodb`) | local data store (or Atlas) |
| Chrome/Edge | installed | manual/E2E verification |

## 2. Local Topology
```
MongoDB  :27017  (portable, data in d:\Ashutosh_Work\tools\mongodb-data)
Backend     :8001   (uvicorn server:app — FastAPI)
Frontend    :6060   (craco start — React dev server)
```
> **Frontend runs on port 6060** (user requirement; browser opens automatically? set via `PORT=6060`, `BROWSER=none`). Backend stays 8001; CORS allows `http://localhost:6060`.



## 3. Environment Configuration
### `backend/.env` (create from `.env.example`)
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="j1yai"
FRONTEND_URL="http://localhost:6060"        # CORS origin — must match dev server
JWT_SECRET="generate-a-long-random-string-here"
ADMIN_EMAIL="singhashu772@gmail.com"
ADMIN_PASSWORD="J1yai#Admin@2026"
EMERGENT_EMAIL_KEY=""                        # empty → email skipped, inquiries still persist
EMAIL_FROM_NAME="J1YAI"
EMAIL_REPLY_TO="singhashu772@gmail.com"
OWNER_EMAIL="singhashu772@gmail.com"
```

### `frontend/.env` (create from `.env.example`)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```



## 4. First-Time Setup
```powershell
# 1) Python venv + deps (subset suffices for runtime)
cd d:\Ashutosh_Work\FullRepo\JIYAI\backend
C:\Users\ashutosh.singh\AppData\Local\Programs\Python\Python312\python.exe -m venv .venv
.\.venv\Scripts\python.exe -m pip install fastapi==0.110.1 uvicorn==0.25.0 motor==3.3.1 pymongo==4.6.3 bcrypt==4.1.3 PyJWT==2.13.0 python-dotenv==1.2.3 pydantic==2.13.4 email-validator==2.3.0 httpx==0.28.1

# 2) Frontend deps
cd ..\frontend
corepack enable
yarn install --frozen-lockfile

# 3) MongoDB data dir (portable)
d:\Ashutosh_Work\tools\mongodb\mongodb-win32-x86_64-windows-8.0.4\bin\mongod.exe --dbpath d:\Ashutosh_Work\tools\mongodb-data --port 27017 --bind_ip 127.0.0.1 --logpath d:\Ashutosh_Work\tools\mongod.log
```



## 5. Running (Restart Scripts — outside repo, not pushed)
- **Start all:** `d:\Ashutosh_Work\tools\start-j1yai.ps1` — idempotent; starts MongoDB → backend → frontend (6060) if down.
- **Stop all:** `d:\Ashutosh_Work\tools\stop-j1yai.ps1` — kills node (recent) + mongod.

Manual alternative:
```powershell
# backend
d:\...\backend\.venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8001
# frontend (new terminal)
cd d:\...\frontend; $env:PORT="6060"; $env:BROWSER="none"; yarn start
```



## 6. Data Seed / Restore
- **Admin:** auto-seeded from `ADMIN_EMAIL/ADMIN_PASSWORD` on backend startup (idempotent).
- **Blog/settings/inquiries:** restore from `data_export.json`:
```powershell
.\.venv\Scripts\python.exe ..\..\tools\import_data.py
# (or re-run scripts/seed_blogs.py + seed_blogs_batch2.py with $env:API_URL)
```
- Idempotent: skips existing slugs/ids; settings upsert by `key`.



## 7. Verification (Post-Start)
```powershell
# services
Test-NetConnection 127.0.0.1 -Port  {27017,8001,6060}
# API
Invoke-RestMethod http://localhost:8001/api/            # → {"message":"J1YAI API"}
Invoke-RestMethod http://localhost:8001/api/blog        # → 8 posts (seeded)
# browser: http://localhost:6060 → 200; homepage markers; /blog 8 posts; /admin → login
```



## 8. GitHub Push Prep (manual push)
1. Repo root = `d:\Ashutosh_Work\FullRepo\JIYAI` (no `.git` yet).
2. `.gitignore` coverage: backend (.venv,__pycache__,`.env*` keep `.env.example`,logs) and frontend (`node_modules`,`.env*` keep `.env.example`,craco.log)— verified present.
3. `git init; git add .; git commit` — ensure NO `backend/.env`, `frontend/.env`, `.venv/`, `node_modules/` staged (`git status` check).
4. Push to GitHub (manual per user), including new `docs/` folder.
5. Never push real env values; rotate `JWT_SECRET`/`ADMIN_PASSWORD` if a local `.env` ever leaks.



## 9. Production Deployment Notes
| Aspect | Recommendation |
|---|---|---|
| Frontend | `yarn build` → serve `build/` on Vercel/Netlify/Nginx; set `REACT_APP_BACKEND_URL` at build time |
| Backend | uvicorn/gunicorn behind reverse proxy + TLS (nginx/caddy); run as service |
| MongoDB | Atlas M0+ or managed; enable backup snapshots |
| HTTPS | Required — `Secure` cookies only work on https outside localhost |
| CORS | `FRONTEND_URL` = exact prod origin (https://yourdomain.com) |
| Env | `.env` on host secrets store, never in repo |
| Email | fill `EMERGENT_EMAIL_KEY` (or swap `emailer.py` for Resend/SMTP directly) |
| SEO backlog | add `sitemap.xml` / `robots.txt` (P2) |
| Analytics | PostHog project key in `index.html` |