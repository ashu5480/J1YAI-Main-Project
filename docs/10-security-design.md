# 10 — Security Design

## 1. Threat Model (v1 scope)
| Threat | Mitigation | Where |
|---|---|---|---|
| Credential theft / replay | HttpOnly+Secure+SameSite=None JWT cookies; short-lived access (15 min); refresh rotation on 401 retry | `server.py` auth |
| Brute-force login | Per `(client_ip:email)` counter; lock 15 min after 5 fails; delete counter on success | `login_attempts` + `login()` |
| Admin endpoint abuse | Every `/api/admin/*` guarded by `Depends(get_current_user)` (decodes+loads user) | router deps |
| XSS (stored, reflected) | React auto-escaping; no `dangerouslySetInnerHTML`; blog content rendered as plain React nodesby `BlogContent` | frontend |
| CSRF | SameSite=None + CORS allow-list + JSON-only bodies + cookie not sent cross-origin without permissive CORS | CORS middleware, axios withCredentials |
| Token leakage via JS | HttpOnly cookies — JS never reads them | `set_cookie(...)` |
| Phishing email content sent to owner | `emailer._assert_safe_email`: blocks forms/inputs, credential-asking phrases, non-https URLs, shortener/ip hosts, mismatched anchor text | `emailer.py` |
| Secrets in VCS | `backend/.gitignore` + `frontend/.gitignore` ignore `.env*` (keep `.env.example`); export ZIP never contains real env | git + export |
| BOLA/IDOR (blog, settings) | Admin-only write routes; delete/update verify existence + auth first | admin routes |
| Injection | Pydantic types (EmailStr, str, int), lengths, `pattern` for status; MongoDB queries built from validated models | models |
| DoS-ish / spamming contact | Length caps (4000 msg), fixed option lists, min-length validations | validation |

## 2. Authentication Model
- **Password storage:** bcrypt (`gensalt()` default cost 12 via bcrypt lib), never plaintext. Admin seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD`; if user exists with different password, env password updates it (startup).
- **Token scheme:** JWT HS256, secret `JWT_SECRET` != default in prod.
  - `access_token` — 15 min;; `sub` = user id;; `email`; `type: "access"`.
  - `refresh_token` — 7 days;; `sub` = user id;; `type: "refresh"`.
- **Cookie attrs:** `HttpOnly`, `Secure` (true even in local dev — works because browsers treat `localhost` as secure context;, `SameSite=None`, `Max-Age`, `Path=/`.
- **Request auth:** `get_current_user` reads cookie, falls back to `Authorization: Bearer` header; validates type=="access"; loads active user (filters `password_hash`); 401 on any failure.

- **Refresh:** `POST /api/auth/refresh` validates refresh cookie → reissues both cookies.

## 3. Session Handling in Frontend
- `AuthContext` boots by calling `GET /api/auth/me`.
- axios instance: `withCredentials: true`; response interceptor: on 401 (non-auth URL, once per request) → `POST /auth/refresh` → retry original; if refresh fails → `onUnauthorized()` → user state `false` → redirect `/admin/login`.
- Logout calls `/auth/logout` (cookie delete) and clears client state.



## 4. CORS Policy
```python
app.add_middleware(CORSMiddleware,
    allow_credentials=True,
    allow_origins=[FRONTEND_URL],   # env, e.g. http://localhost:6060
    allow_methods=["*"],
    allow_headers=["*"],
)
```
- Only the configured `FRONTEND_URL` origin is allowed (no `*` with credentials;). Frontend must call backend through this exact (scheme,host,port) pair.



## 5. Input Validation Matrix
| Field | Rule | Mechanism |
|---|---|---|---|
| name | 2–120 | pydantic + form |
| email | EmailStr | pydantic + client regex |
| company | ≤ 160, optional | pydantic |
| message | 10–4000 | pydantic + client |
| title | 3–200 | pydantic |
| excerpt | ≤ 400 | pydantic |
| cover_image | ≤ 1000 | pydantic |
| content | ≥ 10 | pydantic |
| status | `^(published|draft)$` | pydantic pattern |
| tags | list[str] | pydantic |
| login email | EmailStr | pydantic |
| settings emails | EmailStr | pydantic |



## 6. Email Safety (`emailer.py`)
- Only absolute `https://` links allowed in email HTML/assets (no http, no mailto except allowed, no `cid:`); shortener hosts blocked; IP/numeric hosts blocked; punycode (`xn--`) blocked; anchor text must match host; no `form/input/textarea/select`; no credential-phrases ("send your password", "seed phrase", "cvv", …). Suspicious payload → `ValueError` before any send.



## 7. Secrets & Hygiene Checklist
- [ ] `JWT_SECRET` = long random string (not "change-me" in non-local).
- [ ] `ADMIN_PASSWORD` strong, rotated periodically.
- [ ] `EMERGENT_EMAIL_KEY` stored env-only (blank locally).
- [ ] `.env` files never pushed (gitignored; `.env.example` committed).
- [ ] Prod uses HTTPS (required for Secure cookies when origin not localhost).
- [ ] CORS origin updated to exact prod frontend URL.

## 8. Cookie & Header Recap
| Artifact | Value | Flags |
|---|---|---|---|
| `access_token` | JWT 15 min | HttpOnly, Secure, SameSite=None, Path=/ |
| `refresh_token` | JWT 7 days | same |
| Authorization fallback | `Bearer <access_token>` | — |