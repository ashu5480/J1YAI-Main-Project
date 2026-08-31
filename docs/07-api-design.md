# 07 — API Design

**Base:** all endpoints served by FastAPI under `/api`; JSON request/response; auth via HttpOnly cookies or `Authorization: Bearer <access_token>`. **Admin routes require valid access token** (`get_current_user`) — otherwise `401 {"detail": "Not authenticated"}`.

## Public — General
### `GET /api/`
- **200** `{"message": "J1YAI API"}` — liveness/root marker.



### `POST /api/status`
Body: `{"client_name": string}` → creates health check. **201/200** `{"id", "client_name", "timestamp"}`.

### `GET /api/status`
- **200** `[{ "id", "client_name", "timestamp" }]` — up to 1000, newest first. Used by monitoring agents.



## Public — Settings
### `GET /api/settings`
- **200** merged doc: `{ "contact_email", "contact_phone", "social_linkedin", "social_instagram", "social_github" }` — DB doc merged over `DEFAULT_SETTINGS` (no auth).



## Public — Contact
### `POST /api/contact`
Request:
```json
{
  "name": "Ashutosh Singh",            // min 2, max 120
  "email": "founder@startup.com",      // EmailStr
  "company": "Acme Inc",               // optional, max 160
  "project_type": "Web Application",    // from PROJECT_TYPES
  "budget": "$5,000 – $10,000",   // from BUDGETS
  "message": "We want to build an MVP of an analytics platform."  // min 10, max 4000
}
```
- **200** `{"success": true, "id": "<uuid>"}` — persisted first; owner email best-effort (failure only logged.
- **422** validation detail per field (pydantic.



## Public — Blog
### `GET /api/blog`
- **200** `[{ "id", "title", "excerpt", "cover_image", "content", "tags", "status", "slug", "created_at", "updated_at" }]` — **published only**, newest `created_at` first, max 200.limit.



### `GET /api/blog/{slug}`
- **200** full published post as above.
- **404** `{"detail": "Post not found"}` — unknown slug OR unpublished/draft.



## Auth
### `POST /api/auth/login`
Request: `{"email": EmailStr, "password": string}`.

- **200** `{"id", "email", "name", "role"}` + **Set-Cookie**: `access_token` (15 min, HttpOnly, Secure, SameSite=None, Path=/) and `refresh_token` (7 days, same attrs.
- **401** `{"detail": "Invalid email or password"}` — increments attempt counter for `(client_ip:email)`.
- **429** `{"detail": "Too many failed attempts. Try again in a few minutes."}` — after 5 fails / 15-min lockout.
- Lockout cleared on successful login (`login_attempts` doc deleted).



### `POST /api/auth/logout`
- **200** `{"success": true}` — deletes both cookies (no auth required.



### `GET /api/auth/me`
- **200** current user minus `password_hash`: `{"id", "email", "name", "role", "created_at"}`.
- **401** no/invalid/expired access token.



### `POST /api/auth/refresh`
- Uses `refresh_token` cookie only.
- **200** `{"success": true}` + reissues new `access_token` cookie (and new refresh.
- **401** `{"detail": "No refresh token"}` / `"Invalid token type"` / `"Invalid refresh token"` / `"User not found"`.



## Admin
### `GET /api/admin/inquiries`
- **200** `[{ "id", "name", "email", "company", "project_type", "budget", "message", "timestamp" }]` — newest first, max 500.



### `PUT /api/admin/settings`
Request: `{"contact_email": EmailStr, "contact_phone": str, "social_linkedin": str, "social_instagram": str, "social_github": str}`.

- **200** `{"success": true, "contact_email", "contact_phone", "social_linkedin", "social_instagram", "social_github"}` — upserts doc `{"key": "site"}` into `site_settings`.



### `GET /api/admin/blog`
- **200** all posts (incl. drafts), newest first, max 500.



### `POST /api/admin/blog`
Request: `{"title"(3–200), "excerpt"(≤400), "cover_image"(≤1000), "content"(≥10), "tags": [str], "status": "published|draft"}`.
)
- **200** created post with auto slug (unique: base, `-2`, `-3`, ….,
- **422** validation errors (e.g. bad `status` pattern.



### `PUT /api/admin/blog/{post_id}`
- **200** merged `{...existing, ...update, "updated_at": now}`.
- **404** `{"detail": "Post not found"}`.



### `DELETE /api/admin/blog/{post_id}`
- **200** `{"success": true}`.
- **404** `{"detail": "Post not found"}`.



### `GET /api/admin/export`
- **200** `application/zip` — `j1yai-project.zip` (frontend/backend/scripts/memory) excluding `.env`/`node_modules`/build artifacts; injecting `backend/.env.example`, `frontend/.env.example`, `README_EXPORT.md`, `data_export.json` (blog_posts + site_settings + contact_inquiries.
- **401** unauthenticated.



## Error Conventions
| Code | Shape | Common causes |
|---|---|---|---|
| 200 | success payload | — |
| 401 | `{"detail": "Not authenticated"}` & al. | no/bad/expired token |
| 404 | `{"detail": "Post not found"}` | unknown slug/id |
| 422 | pydantic array detail | invalid fields/lengths/enum |
| 429 | `{"detail": "Too many failed attempts…"}` | login lockout |
| 500/502 | `{"detail": "Failed to …"}` | email gateway failure (502) or internal (500) |