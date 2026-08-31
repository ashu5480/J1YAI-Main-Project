# 01 — Project Overview

## 1. Background
J1YAI is a technology studio that turns ideas into digital products — web apps, mobile apps, AI chatbots, AI agents, AI automation, SaaS platforms, custom software, MVP development, UI/UX, APIs, cloud and on-going support. The website is its public storefront, built to look like a premium "Silicon Valley AI startup" while staying **honest** — no fake stats, no fake testimonials, no made-up case studies.

## 2. Vision
Position J1YAI as the partner a startup founder or SMB turns to when they need a product built right — from first idea to production anda support.** The site must convert visitors into project inquiries via the contact form ("Start Your Project" / "Let's Talk").

## 3. Business Goals
- **G1** Generate qualified inbound leads through the contact form.
- **G2** Build trust through honest positioning, a real internal project (FundrHub live demo), and transparent process/pricing content.

- **G3** Provide a self-serve content channel (blog, FAQ) that demonstrates expertise and improves SEO.

- **G4** Let the owner manage site content (blog, social links, contact email, inquiries)without code changesvia an admin panel.


## 4. Scope — In
| Area | Detail |
|---|---|
| Public site | Home, Services, Solutions, Projects, Process, About, Pricing, Blog, Blog Post, FAQ, Contact |
| Content | 6 service offerings, 4 project showcases (1 live internal, 3 concept), 7-step process, tech stack, 10 FAQ Q&As, blog posts |
| Blog platform | Public list + detail; admin CRUD with draft/published states, cover images, tags |
| Contact/lead capture | Validated form → persisted to MongoDB + email notification to owner |
| Admin panel | JWT-cookie auth, inquiries inbox, blog manager, social/contact settings editor, full-project export (ZIP) |
| SEO | Title/meta description/OG/Twitter tags, semantic HTML, `document.title` per route |
| Analytics/health | PostHog snippet in `index.html`; optional webpack health-check plugin; backend `/api/status` check |

## 5. Scope — Out (v1)
- No e-commerce/checkout on the site itself.
- No multi-language site (English only).
- No case-study pages for external clients yet ((only honest concept projects)).
- No public user registration — admin-only authentication.

- No sitemap.xml/robots.txt generation yet (**backlog P2**).)

## 6. Stakeholders
| Stakeholder | Interest |
|---|---|
| Site owner / founder (singhashu772@gmail.com) | Lead generation, brand credibility, content control, knowing who inquires |
| Visitors — startup founders | Evaluate J1YAI capabilities, pricing, process; reach out |
| Visitors — SMBs adopting AI | Understand AI offerings and costs; contact for automation |
| Visitors — SaaS founders | Assess full-product build capability; start a project |
| Agencies / dev partners | Evaluate partnership potential (Process, Projects) |
| QA/testing agent (qabot) | Stable `data-testid` hooks to automate verification |

## 7. Success Metrics (suggested)
- Contact form submissions per week (primary conversion KPI).
- Blog read-through (list → detail sessions).
- Admin self-service usage (posts created/updated via admin, not code).
- Page load / Lighthouse performance scores (target ≥ 90 performance on production build).
- Bounce reduction on pricing/process pages.