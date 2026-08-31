# 11 — Testing Strategy

## 1. Test Levels
| Level | Scope | Tooling |
|---|---|---|---|
| Unit (backend) | models, slugify, email safety scan, token helpers | pytest (`backend/pytest.ini`, pytest-xdist); manual `python -c` invocations |
| Integration (API) | endpoint contracts, auth flows, CORS, persistence | httpx/Invoke-RestMethod smoke scripts; headless-browser E2E |
| E2E (frontend) | route rendering, form flows, admin guard, cookies | headless Chrome (`--dump-dom`, virtual-time-budget) with `data-testid` hooks |
| Manual/Acceptance | visual fidelity, responsive, reduced-motion, SEO meta | browser (Edge/Chrome), Lighthouse |

## 2. UI Test-ID Registry
- Central: `frontend/src/constants/testIds/index.js` → re-exports feature files (`auth.js`, `home.js` …`.
- Conventions: keys camelCase; values kebab-case `<feature>-<element>[-<qualifier>]` (e.g. `login-email-input`, `blog-admin-row-{slug}`).
- Inline `data-testid` values across UI (navbar, admin tabs/buttons, blog rows, inquiry cards, settings form, contact form, footer socials, etc.) enable the QA agent (qabot) to locate elements robustly.

## 3. Automated Verification Checklist (mirrors acceptance criteria)
### Auth
- [ ] `POST /api/auth/login` correct creds → 200 + `Set-Cookie` access/refresh (HttpOnly, Secure, SameSite=None, max-age 900/604800).
- [ ] Wrong creds → 401; 5 fails → lock 15 min (429).

- [ ] `GET /api/auth/me` with cookie → 200 user (no password_hash); without → 401.

- [ ] `/admin` unauthenticated → redirect `/admin/login`; authenticated → dashboard (admin-dashboard testid).
- [ ] Logout clears session.

### Public Pages
- [ ] Each route returns 200 and expected content markers (hero "Build Digital Products With AI", "Start Your Project" CTA, "J1YAI" brand, nav links, footer.
- [ ] Mobile drawer toggles (mobile-menu-toggle...) and closes on route change.
- [ ] Footer socials render per `/api/settings` (blank URL hides icon.

### Blog
- [ ] `/api/blog` returns published only (drafts absent); max 200.
- [ ] `/api/blog/:slug` 200 for published; 404 for unknown OR draft.
- [ ] `/blog` lists 8 posts (from seeded data); `/blog/:slug` renders formatted content (##, bullets, **bold**), cover image.
- [ ] Admin blog CRUD: create → appears public when published; edit; delete (confirm) → gone; draft stays hidden.

### Contact
- [ ] Valid submit → success toast + inquiry in `AdminInquiries` + row in MongoDB (`contact_inquiries` count + 1).
- [ ] Invalid email / short message → inline error, nothing persisted.


### Settings & Export
- [ ] Admin settings save → `site_settings` upsert + footer reflects (blank hides icon.
- [ ] `/api/admin/export` (auth) → ZIP containing `frontend/`, `backend/`, `data_export.json`, `.env.example` templates; no `.env`/`node_modules` inside.

### Health
- [ ] `POST/GET /api/status` round-trip persists a check (id, client_name, timestamp).

## 4. Environment Smoke Script (run locally)
```powershell
# Services up? (27017, 8001, 6060)
Test-NetConnection -ComputerName 127.0.0.1 -Port 8001
# API read
Invoke-RestMethod http://localhost:8001/api/blog
# Login headers → cookie hand-off (real browser recommended for cookie test:
#    browsers treat http://localhost as a secure context → Secure cookies work.
```

## 5. Regression Notes
- `yarn.lock` + `requirements.txt` pinned — installs are reproducible (`yarn install --frozen-lockfile`).
- Backend deps installable subset for runtime: fastapi, uvicorn, motor, pymongo, bcrypt, PyJWT, python-dotenv, pydantic, email-validator, httpx.
- DB is idempotently restorable from `data_export.json` (import script skips existing slug/id; settings replace_one by key.
- After DB wipe, `seed_admin()` recreates admin on backend startup from env.

## 6. Known Manual Checks (visual)
- Responsive: nav drawer at ≤ 1024 px; no overflow at 320 px; footer stacks.
 - Reduced motion: `prefers-reduced-motion` disables hero animations (MotionConfig.
- Contrast: cyan on slate-950 CTAs (text slate-950 on cyan-400) readable.
- SEO: default meta + per-route `document.title` changerson navigation (Layout `SEO` helper).
- Instruments/analytics: PostHog loads (network tab.



## 7. Traceability (Sample)
| Acceptance Criterion | Automated Step | Doc Ref |
|---|---|---|---|
| US-08 admin login | Login + `/auth/me` + `/admin` redirect tests | FR-10; 07-auth; 10-security |
| US-04 contact | POST + Mongo count + inbox | FR-8; UC-03; 07-contact |
| US-06 blog read | `/api/blog` + `/blog/:slug` render | FR-7; UC-06 |
| US-10 admin blog CRUD | POST/PUT/DELETE + public list | FR-11.3–11.4, UC-06 |
| US-12 export | ZIP inspection | FR-12, UC-08 |