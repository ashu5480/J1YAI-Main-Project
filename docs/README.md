# J1YAI — Documentation Suite

> Complete requirement analysis and design documentation for the **J1YAI** website project.
> Applies to the current implementation (React 19 + FastAPI + MongoDB) at `d:\Ashutosh_Work\FullRepo\JIYAI`.

## Document Map

| # | Document | Purpose | Phase |
|---|---|---|---|
| 01 | [Project Overview](01-project-overview.md) | Vision, goals, scope, stakeholders, positioning | Requirements |
| 02 | [Requirements Analysis](02-requirements-analysis.md) | Functional requirements (FR-x„ business rules, traceability | Requirements |
| 03 | [Non-Functional Requirements](03-non-functional-requirements.md) | NFR-x„ performance, security, usability, a11y, SEO | Requirements |
| 04 | [Personas & User Stories](04-personas-user-stories.md) | Personas, user stories (US-x„ acceptance criteria | Requirements |
| 05 | [Use Cases](05-use-cases.md) | Actor-level use cases (UC-x„ flows | Requirements |
| 06 | [System Architecture](06-system-architecture.md) | High-level architecture, tech stack, data flow, deployment view | Design |
| 07 | [API Design](07-api-design.md) | REST API reference — endpoints, payloads, responses, errors | Design |
| 08 | [Database Design](08-database-design.md) | MongoDB collections, schemas, indexes, data lifecycle | Design |
| 09 | [Frontend Design](09-frontend-design.md) | Design system, routing, component hierarchy, state, data fetching | Design |
| 10 | [Security Design](10-security-design.md) | Auth model, JWT/cookies, credential protection, CORS, input & email safety | Design |
| 11 | [Testing Strategy](11-testing-strategy.md) | Test levels, test-ID registry, manual/automated test plans, traceability | QA |
| 12 | [Deployment Guide](12-deployment-guide.md) | Local setup, env vars, ports, restart scripts, GitHub push prep, production seeding | Ops |

## Traceability at a Glance

| Requirement area | Where it lives in the codebase |
|---|---|
| Public marketing pages | `frontend/src/pages/*` + `frontend/src/data/content.jsx` |
| Contact form | `frontend/src/pages/Contact.jsx` → `backend/server.py` (`POST /api/contact`) |
| Blog (public) | `frontend/src/pages/Blog.jsx`, `BlogPost.jsx`, `BlogContent.jsx` → `GET /api/blog[/{slug}]` |
| Admin auth | `frontend/src/context/AuthContext.jsx` + `frontend/src/pages/admin/AdminLogin.jsx` → `/api/auth/*` |
| Admin dashboard | `frontend/src/pages/admin/AdminDashboard.jsx` + `AdminInquiries/Blog/Social` |
| Site settings (footer socials, contact email) | `backend/server.py` `site_settings` collection + `AdminSocial.jsx` + `Footer.jsx` |
| Project export | `backend/server.py` `GET /api/admin/export` + `AdminDashboard.jsx` |
| Health check | `backend` `/api/status` + `frontend/plugins/health-check/*` (optional via `ENABLE_HEALTH_CHECK`) |

## Conventions Used Across Docs

- Requirement IDs: `FR-xx`, `NFR-xx`, `US-xx`, `UC-xx`
- Priority: **MUST** (P0)/ **SHOULD** (P1)/ **COULD** (P2)
- All endpoint paths are under the `/api` prefix unless noted.