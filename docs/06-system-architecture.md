# 06 — System Architecture

## 1. High-Level View

```
                          ┌────────────────────────────────────────────┐
                          │                BROWSER (user)              │
                          │  React 19 SPA @ http://localhost:6060 │
                          └───────────────┬──────────────────────────────┘
                                          │  HTTP / JSON (axios/fetch, withCredentials)
                                          ▼
                          ┌────────────────────────────────────────────┐
                          │              FastAPI Backend                  │
                          │  (uvicorn) @ http://localhost:8001   │
                          │  /api ····· auth · blog · settings ·       │
                          │  contact · status · admin/export           │
                          └──────────────┬───────────────┬───────────────┘
                                         │               │ (best-effort)
                                         ▼               ▼
                          ┌──────────────────────┐  ┌───────────────────────┐
                          │      MongoDB          │  │  Email Gateway        │
                          │  db "j1yai"      │  │  integrations.emergent │
                          │  (Motor async)   │  │  .emergentagent.com   │
                          └──────────────────────┘  └───────────────────────┘
```

## 2. Tech Stack

### Frontend
| Layer | Technology | Notes |
|---|---|---|---|
| Framework | React 19 + ReactDOM | SPA; `<StrictMode>` on |
| Build | Create React App 5 + Craco 7 | path alias `@/` → `src/`; `craco start/build/test` |
| Routing | react-router-dom v7 | `BrowserRouter`; nested `Layout` route |
| Styling | Tailwind CSS 3.4 + `tailwindcss-animate` | dark-first tokens in `index.css` |
| UI kit | shadcn/ui on Radix primitives | 30+ components in `components/ui/*` |
| Motion | framer-motion 11 | `MotionConfig reducedMotion="user"`; hero animation, hover reveals |
| Icons | lucide-react | tree-shaken |
| Forms/validation | react-hook-form + zod (deps), native validation in contact/login | |
| Data fetching | axios (auth-aware instance), @tanstack/react-query, swr | 60 s stale, no window-focus refetch |
| Notifications | sonner (toasts) | |
| Analytics | PostHog snippet in `public/index.html` | |
| Optional | `@emergentbase/visual-edits` (dev), webpack health-check plugin (`ENABLE_HEALTH_CHECK=true`) | |

### Backend
| Layer | Technology | Notes |
|---|---|---|---|
| Framework | FastAPI 0.110 + uvicorn 0.25 | async app; `APIRouter(prefix="/api")` |
| DB driver | motor 3.3 (async) / pymongo 4.6 (scripts) | single `AsyncIOMotorClient` |
| Validation | Pydantic 2 + email-validator | `EmailStr`, lengths, `pattern` |
| Auth | PyJWT 2.13 + bcrypt 4.1 | HS256; 15 min access + 7d refresh |
| Email | httpx → Emergent Integrations gateway | safe-scan before send (`emailer.py`) |
| Config | python-dotenv | loads `backend/.env` |

### Data Store
- MongoDB (local dev: portable 8.0.4 on 27017; prod: Atlas or self-managed.
- Database name: `j1yai`.

## 3. Request/Data Flow (Contact Example)
1. Contact form `POST /api/contact` (JSON).
2. Pydantic `ContactInquiryCreate` validates (name ≥ 2, email valid, message 10–4000.
3. Persist `ContactInquiry` doc → `contact_inquiries`.
4. Best-effort `send_email(...)` → gateway (scan-safe); failure logged, response unaffected.
5. Return `{"success": true, "id": ...}`.

## 4. Auth Flow
1. Login → verify bcrypt → `set_auth_cookies` (2 HttpOnly JWT cookies).
2. Subsequent requests carry cookies; `get_current_user` decodes access token → loads user without `password_hash`.
3. Refresh flow: axios interceptor on 401 → `POST /api/auth/refresh` (uses refresh cookie) → retry original request.

## 5. Admin/Export Flow
- `GET /api/admin/export` walks `/app/{frontend,backend,scripts,memory}`, zips sources, excludes `.env`/node_modules/build, injects `.env.example` templates + data export + README., streams `application/zip`.

## 6. Deployment View (Local)
```
[MongoDB :27017] ← [uvicorn server:app :8001] ← [CRA dev :6060 / prod build]
```
- Frontend talks backend via `REACT_APP_BACKEND_URL`.
- Backend CORS allow-list = `FRONTEND_URL` env (e.g. `http://localhost:6060`).
- Production: serve built `frontend/build` via static host (Vercel/Netlify/Nginx), backend via uvicorn/gunicorn + reverse proxy + TLS.

## 7. Key Environment Variables
| Var | Where | Purpose |
|---|---|---|---|
| `REACT_APP_BACKEND_URL` | frontend/.env | Base URL of backend (e.g. `http://localhost:8001`) |
| `MONGO_URL` | backend/.env | MongoDB connection string |
| `DB_NAME` | backend/.env | Database name (`j1yai`) |
| `FRONTEND_URL` | backend/.env | CORS origin (e.g. `http://localhost:6060`) |
| `JWT_SECRET` | backend/.env | HMAC secret for tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | backend/.env | Seed admin credentials |
| `OWNER_EMAIL` | backend/.env | Inquiry notification recipient |
| `EMERGENT_EMAIL_KEY` | backend/.env | Email gateway key (blank → email skipped) |
| `EMAIL_FROM_NAME` / `EMAIL_REPLY_TO` | backend/.env | Email sender identity |
| `ENABLE_HEALTH_CHECK` | frontend (build-time) | Toggles webpack health plugin |