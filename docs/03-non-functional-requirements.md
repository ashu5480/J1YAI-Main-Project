# 03 — Non-Functional Requirements

Priorities: **MUST** (P0)/ **SHOULD** (P1)/ **COULD** (P2).

## Performance
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-1.1 | Initial page load feels instant (< ~3s on broadband, dev) | MUST | CRA dev server; static marketing content served server-side-free in JS bundle |
| NFR-1.2 | API latency low for read endpoints | MUST | FastAPI async + Motor (async MongoDB driver); indexed queries |
| NFR-1.3 | No render-blocking heavy work on public pages | SHOULD | Content driven by local `content.jsx` constants; `react-query` cache (60 s stale) |
| NFR-1.4 | Compile-time optimization for production | SHOULD | `craco build` minification, tree-shaken lucide icons |

## Security & Privacy
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-2.1 | Passwords never stored/transmitted in plain text | MUST | bcrypt hashing; HTTPS in prod; HttpOnly cookies |
| NFR-2.2 | Session tokens protected from XSS/JS access | MUST | HttpOnly + Secure + SameSite=None cookies |
| NFR-2.3 | Admin endpoints require valid access token | MUST | `Depends(get_current_user)` on all `/api/admin/*` |
| NFR-2.4 | Brute-force login protection | MUST | 5-attempt / 15-min per (IP,email) lockout |
| NFR-2.5 | Cross-origin policy explicit | MUST | CORS allow-list = `FRONTEND_URL` only; `allow_credentials=True` |
| NFR-2.6 | Input validation on every write path | MUST | Pydantic `BaseModel` validators (lengths, EmailStr, pattern for status) |
| NFR-2.7 | Email content safely-scanned before sending | MUST | `emailer.py` scans for forms/credentials/phishing patterns, https-only links |
| NFR-2.8 | Secrets not committed to version control | MUST | `.env` git-ignored (backend + frontend), only `.env.example` committed |
| NFR-2.9 | HTML escaping of user content in email templates | MUST | `html.escape` used in `inquiry_email_html` |

## Usability & Accessibility
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-3.1 | Responsive from 320 px to desktop | MUST | Tailwind responsive utilities; mobile drawer nav |
| NFR-3.2 | Keyboard-accessible forms & controls | MUST | Native `<button>/<form>/<input>`, Radix primitives (accessible by default) |
| NFR-3.3 | Respect reduced-motion preference | MUST | `MotionConfig reducedMotion="user"` (framer-motion) |
| NFR-3.4 | Semantic landmarks (header, nav, main, footer), aria-labels on icon-only controls | MUST | Layout + Navbar/Footer structure; `aria-label` on social/menu buttons |
| NFR-3.5 | Clear form error messages | MUST | Inline error panes + sonner toasts + `formatApiError` |

## Compatibility & Maintainability
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-4.1 | Works on evergreen Chrome/Firefox/Safari/Edge | MUST | CRA browserslist (`last 1` versions dev; >0.2% prod) |
| NFR-4.2 | Clean separation frontend/backend | MUST | SPA ↔ REST JSON over HTTP; no server-side templating |
| NFR-4.3 | Environment-based config via `.env` | MUST | `REACT_APP_BACKEND_URL`, `MONGO_URL`, `JWT_SECRET`, etc. |
| NFR-4.4 | Centralized content data for marketing copy | SHOULD | `src/data/content.jsx` single source for pages |
| NFR-4.5 | Stable UI hooks for automated testing | SHOULD | Central `constants/testIds` registry + `data-testid` attributes across UI |
| NFR-4.6 | Python deps pinned | MUST | `requirements.txt` exact versions |
| NFR-4.7 | JS deps pinned via `yarn.lock` + `packageManager` field | MUST | lockfile committed |

## SEO
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-5.1 | Descriptive `<title>` + meta description | MUST | `index.html` defaults + per-route `SEO` helper |
| NFR-5.2 | Open Graph / Twitter cards for sharing | MUST | `og:*` + `twitter:*` tags |
| NFR-5.3 | Semantic content headings | SHOULD | `h1`–`h3` hierarchy in pages & blog renderer |
| NFR-5.4 | sitemap.xml / robots.txt | COULD | **Backlog P2** — not yet implemented |

## Data Integrity & Reliability
| ID | Requirement | Priority | How it's met |
|---|---|---|---|
| NFR-6.1 | Persist contact inquiries even if email fails | MUST | DB insert first, email in try/except logged |
| NFR-6.2 | Unique constraints enforced at DB layer | MUST | unique indexes: `users.email`, `blog_posts.slug` |
| NFR-6.3 | Data restorable / exportable | MUST | `data_export.json` + import scripts + admin ZIP export |