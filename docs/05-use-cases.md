# 05 — Use Cases

**Actors:** Visitor (anonymous), Owner/Admin (authenticated), System (backend/MongoDB/email gateway.**

## UC-01 — Browse Public Site
- **Primary actor:** Visitor
- **Preconditions:** None
- **Main flow:**
  1. Visitor opens `/` and sees hero, services, projects preview.
  2. Visitor navigates navbar (Services, Solutions, Projects, Process, Pricing, Blog, FAQ, About, Contact).
  3. Pages render from local content constants + live API data (blog, settings).
- **Postconditions:** Visitor reaches `/contact` or leaves.
- **Related:** FR-1, FR-2 … FR-7, FR-9, FR-13

## UC-02 — View Project Details
- **Primary actor:** Visitor
- **Main flow:**
  1. Visitor opens `/projects`.
  2. Visitor sees featured FundrHub card (live demo link) and 3 concept cards labeled "Coming Soon / Concept Project".
  3. Visitor clicks a project → detail modal opens (overview, problem, solution, features, tags).
  4. Visitor closes modal (ESC/backdrop/close).
- **Postconditions:** —	
- **Related:** FR-4, US-02

## UC-03 — Submit Contact Inquiry
- **Primary actor:** Visitor
- **Preconditions:** Form fields valid per FR-8.
- **Main flow:**
  1. Visitor fills name, email, company (opt), project type, budget, message.
  2. Client validates; on submit → `POST /api/contact`.
  3. Backend validates again (pydantic), persists inquiry to MongoDB.
  4. Backend emails owner (`OWNER_EMAIL`) via gateway with reply-to = sender (best-effort, failure logged).
  5. Frontend shows success toast.

- **Alternate flow (validation failure):** inline error + no persist.
- **Alternate flow (email failure):** inquiry still saved; toast still success; backend logs error.
- **Postconditions:** Inquiry stored in `contact_inquiries`; owner notified (if gateway works).
- **Related:** FR-8, US-04, US-05, NFR-6.1

## UC-04 — Admin Login
- **Primary actor:** Admin
- **Preconditions:** Admin user seeded from env vars.
- **Main flow:**
  1. Admin opens `/admin` → redirected to `/admin/login` (if no session).
  2. Admin enters email + password.
  3. Backend verifies bcrypt hash + lockout state;; sets HttpOnly `access_token` (15 min) + `refresh_token` (7 days) cookies.
  4. Admin lands on dashboard tabs.

- **Alternate flow (fail):** 401 "Invalid email or password"; counter increments ;; at 5 → locked 15 minutes (429).
- **Alternate flow (session expiry):** axios interceptor calls `/auth/refresh` onceand retries original request; else user logged out to `/admin/login`.**
- **Postconditions:** Valid JWT cookies present.
- **Related:** FR-10, US-08, NFR-2.4

## UC-05 — Manage Inquiries
- **Primary actor:** Admin
- **Preconditions:** Authenticated.
- **Main flow:**
  1. Admin opens Inquiries tab.
  2. `GET /api/admin/inquiries` returns newest-first list.
  3. Admin reads name/email/company/type/budget/timestamp/message; clicks mailto to reply.
- **Related:** FR-11.1–11.2, US-09

## UC-06 — Manage Blog Posts
- **Primary actor:** Admin
- **Preconditions:** Authenticated.
- **Main flow:**
  1. Blog tab lists posts (title, slug, date, status).
  2. New Post → editor (title, excerpt, cover URL, content, tags, status, preview pane).
  3. Save → `POST /api/admin/blog` (slug auto-generated unique).
  4. Edit → `PUT /api/admin/blog/{id}`; Delete → confirm → `DELETE /api/admin/blog/{id}`.
- **Postconditions:** Public blog reflects published posts only.
- **Related:** FR-11.3–11.4, US-10, BR-1

## UC-07 — Manage Social & Contact Settings
- **Primary actor:** Admin
- **Preconditions:** Authenticated.
- **Main flow:**
  1. Social tab loads current settings via `GET /api/settings`.
  2. Admin edits contact_email / LinkedIn / Instagram / GitHub (blank → hide icon).
  3. `PUT /api/admin/settings` upserts doc `{"key": "site"}`.
  4. Footer re-fetches and renders updated icons/contact.
- **Related:** FR-11.5, US-11

## UC-08 — Export Project Archive
- **Primary actor:** Admin
- **Preconditions:** Authenticated.
- **Main flow:**
  1. Admin clicks "Download Project" in dashboard header.
  2. `GET /api/admin/export` zips `frontend/backend/scripts/memory` (excluding `.env`,node_modules, build dirs).
  3. Writes `.env.example` templates + `README_EXPORT.md` + `data_export.json` (blog posts, settings, inquiries) into the ZIP archive.


- **Postconditions:** Browser downloads `j1yai-project.zip`.
- **Related:** FR-12, US-12

## UC-09 — Health Check (System)
- **Primary actor:** System/monitoring
- **Main flow:**
  1. Monitor `POST /api/status` with `client_name` → stored status check.
  2. `GET /api/status` lists checks (newest first.
  3. Optional frontend webpack health plugin reports compile state (behind `ENABLE_HEALTH_CHECK=true`).
- **Related:** FR-14