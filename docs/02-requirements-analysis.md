# 02 — Requirements Analysis (Functional)

Priorities: **MUST** = release-blocking; **SHOULD** = expected (P1); **COULD** = nice-to-have (P2).

## FR-1 — Public Layout & Navigation
| ID | Requirement | Priority |
|---|---|---|---|
| FR-1.1 | Sticky, blur-backed navbar with brand logo "J1YAI" | MUST |
| FR-1.2 | Nav links to: Services, Solutions, Projects, Process, Pricing, Blog, FAQ, About | MUST |
| FR-1.3 | "Let's Talk" CTA in navbar → `/contact` | MUST |
| FR-1.4 | Mobile drawer menu (animated, closes on route change) | MUST |
| FR-1.5 | Footer with nav links, social icons (LinkedIn/Instagram/GitHub), CTA, copyright | MUST |
| FR-1.6 | Social icons driven by admin site settings; **blank URL ⇒ icon hidden** | MUST |
| FR-1.7 | Scroll to hash/top on route change | MUST |

## FR-2 — Home Page
| ID | Requirement | Priority |
|---|---|---|---|
| FR-2.1 | Hero with headline, subcopy, "Start Your Project" CTA | MUST |
| FR-2.2 | Animated glass "AI build console" visual + floating capability chips | MUST |
| FR-2.3 | Trust bar (honest capability markers — no fake stats) | MUST |
| FR-2.4 | Bento-style services grid (6 services) | MUST |
| FR-2.5 | Featured internal project — FundrHub live demo, labeled "Internal Product / Startup Project" | MUST |
| FR-2.6 | Solutions preview (5 cards), Why Us (6 cards), Tech stack strip | MUST |
| FR-2.7 | CTA section ("Have an idea? Let's talk.") | MUST |

## FR-3 — Services & Solutions Pages
| ID | Requirement | Priority |
|---|---|---|---|
| FR-3.1 | Services list: Web Applications, Mobile Applications, AI Chatbots, AI Agents & Automation, SaaS Development, Custom Software | MUST |
| FR-3.2 | Each service shows tagline, examples, "who it's for", features, tech | MUST |
| FR-3.3 | Anchored per-service detail sections on `/services` | MUST |
| FR-3.4 | Solutions page: Launch MVP, Add AI, Automate Ops, Scale Product, Build SaaS — with CTA per card | MUST |

## FR-4 — Projects Page
| ID | Requirement | Priority |
|---|---|---|---|
| FR-4.1 | Featured FundrHub card with CSS browser mockup + live demo link (https://fund-r-hub-web.vercel.app/) | MUST |
| FR-4.2 | 3 concept projects clearly labeled "Coming Soon / Concept Project" | MUST |
| FR-4.3 | Project detail modal (overview, problem, solution, features, tags) | MUST |
| FR-4.4 | Honest labeling: no fake external client work | MUST |

## FR-5 — Process & About
| ID | Requirement | Priority |
|---|---|---|---|
| FR-5.1 | 7-step process timeline: Discover → Plan → Design → Build → Test → Launch → Grow | MUST |
| FR-5.2 | About page with studio narrative + principles (Startup Mindset, AI First, Production Ready, Transparent, Modern Tech, Long-Term Partnership) | MUST |

## FR-6 — Pricing Page
| ID | Requirement | Priority |
|---|---|---|---|
| FR-6.1 | Honest "it depends on your project" positioning | MUST |
| FR-6.2 | 3 engagement models: MVP Sprint / Product Build / Ongoing Partnership | MUST |
| FR-6.3 | Quote factors (scope, AI complexity, integrations, design depth) | MUST |

## FR-7 — Blog (Public)
| ID | Requirement | Priority |
|---|---|---|---|
| FR-7.1 | `/blog` lists published posts (newest first), title/excerpt/tags/date | MUST |
| FR-7.2 | `/blog/:slug` shows full post (formatted: `##` headings, `- ` bullets, `**bold**`) | MUST |
| FR-7.3 | Draft posts never visible publicly | MUST |
| FR-7.4 | Honest empty state when no posts | MUST |

## FR-8 — Contact / Lead Capture
| ID | Requirement | Priority |
|---|---|---|---|
| FR-8.1 | Fields: name, email, company (optional), project type (select), budget (select), message | MUST |
| FR-8.2 | Client-side validation (email format, min lengths) + server-side pydantic validation | MUST |
| FR-8.3 | On success persist inquiry to MongoDB and email owner (reply-to = sender) | MUST |
| FR-8.4 | User feedback (success/error toast) | MUST |
| FR-8.5 | Email failure must not break the inquiry save (persist first, email best-effort) | MUST |
## FR-9 — FAQ
| ID | Requirement | Priority |
|---|---|---|---|
| FR-9.1 | `/faq` with honest founder Q&As in an accordion | MUST |
| FR-9.2 | FAQ linked from navbar and footer | MUST |

## FR-10 — Admin Authentication
| ID | Requirement | Priority |
|---|---|---|---|
| FR-10.1 | `POST /api/auth/login` verifies credentials → issues JWT cookies | MUST |
| FR-10.2 | Access token 15 min + refresh token 7 days (HttpOnly, Secure, SameSite=None) | MUST |
| FR-10.3 | Auto cookie refresh on 401 (idempotent retry) | MUST |
| FR-10.4 | `GET /api/auth/me` restores session; `POST /api/auth/logout` clears cookies | MUST |
| FR-10.5 | Rate-limit: 5 failed attempts / 15 min per (IP,email) lockout | MUST |
| FR-10.6 | Admin auto-seeded on backend startup from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars | MUST |
| FR-10.7 | `/admin` route protected — unauthenticated users redirected to `/admin/login` | MUST |

## FR-11 — Admin Dashboard
| ID | Requirement | Priority |
|---|---|---|---|
| FR-11.1 | Tabs: Inquiries, Blog Posts, Social & Contact | MUST |
| FR-11.2 | Inquiries tab: chronological list with name, email, company, type, budget, timestamp, message | MUST |
| FR-11.3 | Blog tab: list (title, slug, date, status) + New Post + edit + delete (with confirm) | MUST |
| FR-11.4 | Blog editor: title, excerpt, cover image URL, content, tags (comma), status (draft/published), live preview pane | MUST |
| FR-11.5 | Social tab: edit contact_email + LinkedIn/Instagram/GitHub URLs; saved live on footer | MUST |
| FR-11.6 | "Download Project" button → `GET /api/admin/export` ZIP of full codebase + data export | SHOULD |

## FR-12 — Project Export
| ID | Requirement | Priority |
|---|---|---|---|
| FR-12.1 | Admin-only ZIP export of frontend/backend/scripts/memory | SHOULD |
| FR-12.2 | Excludes `.env`, `node_modules`, build artifacts; includes `.env.example` templates + `data_export.json` + `README_EXPORT.md` | SHOULD |
| FR-12.3 | `data_export.json` bundles all blog posts, site settings, contact inquiries | SHOULD |

## FR-13 — SEO & Analytics
| ID | Requirement | Priority |
|---|---|---|---|
| FR-13.1 | Static meta: description, OG title/description/site_name, Twitter card, theme-color | MUST |
| FR-13.2 | Per-route `document.title` + meta description via `SEO` helper | SHOULD |
| FR-13.3 | PostHog analytics snippet loaded in `index.html` | COULD |

## FR-14 — Health Monitoring
| ID | Requirement | Priority |
|---|---|---|---|
| FR-14.1 | `POST/GET /api/status` persist/list client health checks | COULD |
| FR-14.2 | Optional webpack health-check plugin + dev-server health endpoints behind `ENABLE_HEALTH_CHECK=true` | COULD |

## Business Rules
- **BR-1** Blog slugs are unique, auto-generated from title, suffixed `-N` on collision.
- **BR-2** Only `status = "published"` posts appear on public endpoints.
- **BR-3** Contact form: name ≥ 2 chars, message 10–4000 chars; project_type/budget from fixed option lists.

- **BR-4** Site settings fall back to defaults when missing (`DEFAULT_SETTINGS`).
- **BR-5** Admin email is unique in `users` (unique index); seeded once, then env password updates existing user. Lockout clears on successful login.**
- **BR-6** Project export writes `.env.example` templates — never real `.env` values.