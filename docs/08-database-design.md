# 08 — Database Design

**Engine:** MongoDB (local dev: 8.0.4 portable on 27017; prod: Atlas/self-managed. **Driver:** Motor (async server), Pymongo (scripts/migrations. **Database name:** `j1yai`.

## Collections Overview
| Collection | Purpose | Auth | Notes |
|---|---|---|---|
| `users` | Admin accounts | — | seeded from env; unique email |
| `blog_posts` | Blog content | admin-write | unique slug |
| `site_settings` | Footer/social/contact config | admin-write | single doc `{key: "site"}` |
| `contact_inquiries` | Lead capture | admin-read | public write-only |
| `status_checks` | Health checks | — | monitor writes |
| `login_attempts` | Brute-force lockout state | — | per `(ip:email)` |

## Schemas

### `users`
```json
{
  "id": "uuid4",
  "email": "singhashu772@gmail.com",     // unique index; lowercase
  "password_hash": "$2b$12$…",            // bcrypt
  "name": "Admin",
  "role": "admin",
  "created_at": "2026-08-31T11:42:49.826404+00:00"
}
```

### `blog_posts`
```json
{
  "id": "uuid4",
  "title": "RAG, Explained for Founders",
  "excerpt": "…",                          // ≤ 400
  "cover_image": "https://images.unsplash.com/…",   // "" ok
  "content": "## What moves the price …",    // ≥ 10 chars
  "tags": ["AI", "RAG", "Chatbots"],
  "status": "published",                    // published | draft
  "slug": "rag-explained-for-founders-…", // unique index; auto-generated
  "created_at": "ISO8601",               // string
  "updated_at": "ISO8601"
}
```

### `site_settings`
```json
{
  "key": "site",                            // upsert target
  "contact_email": "info@jiyaitech.com",
  "contact_phone": "+91 7042579843",
  "social_linkedin": "https://www.linkedin.com",
  "social_instagram": "https://www.instagram.com",
  "social_github": "https://github.com"
}
```
> Reads merge over `DEFAULT_SETTINGS` in code, so missing docs still return sensible values. Blank social == hidden icon (footer filters). Blank `contact_phone` == no call link shown in footer.



### `contact_inquiries`
```json
{
  "id": "uuid4",
  "name": "Ashutosh Singh",               // 2–120
  "email": "founder@startup.com",          // EmailStr
  "company": "Acme Inc",                   // optional ≤ 160
  "project_type": "Web Application",
  "budget": "$5,000 – $10,000",
  "message": "…",                          // 10–4000
  "timestamp": "2026-08-31T12:03:25.035453+00:00"   // ISO string
}
```

### `status_checks`
```json
{
  "id": "uuid4",
  "client_name": "smoke-test",
  "timestamp": "ISO8601"
}
```

### `login_attempts`
```json
{
  "identifier": "192.168.1.5:admin@example.com",  // index
  "count": 3,
  "last_attempt": "ISO8601",
  "locked_until": "ISO8601 | null"
}
```

## Indexes (created on startup)
| Collection | Index | Options |
|---|---|---|---|
| `users` | `email` | unique |
| `blog_posts` | `slug` | unique |
| `login_attempts` | `identifier` | plain |

> Query patterns: `blog_posts.find({status:"published"}).sort({created_at:-1})`, `contact_inquiries.find({}).sort({timestamp:-1})`, `users.find_one({email})`. Current indexes suffice atthis scale.

## Relationships
- Mostly **denormalized / document-per-entity** — no references used.
- Logical links: `contact_inquiries.email` ↔ email notifications (reply-to = sender); `site_settings` ↔ `Footer.jsx` component (reads `/api/settings`); `blog_posts.slug` ↔ public URL `/blog/:slug`; `users.id` ↔ JWT `sub` claim.



## Data Lifecycle
1. **Seed:** admin created on backend startup (`seed_admin()`; blog/settings/inquiries can be restored from `data_export.json` (see `scripts/seed_blogs*.py` + import script).
2. **Write paths:** contact (public); admin blog CRUD; admin settings upsert; status (monitor); login attempts (auth fail tracking.
3. **Export/backup:** `GET /api/admin/export` bundles `data_export.json` — full `blog_posts`, `site_settings`, `contact_inquiries` (without `_id`.
4. **Restore:** pymongo script inserts docs idempotently (skip existing slug/id; replace settings by key).



## Data Export Format (`data_export.json`)
```json
{
  "blog_posts": [ … ],        // all posts without _id
  "site_settings": [ … ],
  "contact_inquiries": [ … ]
}
```