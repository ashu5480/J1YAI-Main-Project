# 09 â€” Frontend Design

## 1. Design System
| Token | Value | Usage |
|---|---|---|---|
| Background | `#030712` (bg-background) | page base â€” dark-first |
| Panels | `#0F172A / #0B1220` (slate-900 variants) | cards, admin panels |
| Primary accent | cyan-400 `#22d3ee` | CTAs, active nav, links, brand |
| Secondary accent | blue-600 `#2563eb` | brand gradient, accents |
| Success/status | emerald-400 (published), amber-300 (draft) | blog status badges |
| Danger | rose-400 | delete/errors |
| Text | slate-50 (headings), slate-300/400 (body/muted) | typography |
| Fonts | **Outfit** (display/headings)+ **Inter** (body) | via Google Fonts preconnect + stylesheet |
| Effects | `glass` (blur/translucency), `bg-grid` (hero grid), backdrop-blur-xl (sticky nav), rounded-2xl/3xl cards | premium "AI startup" feel |
| Motion | framer-motion, `MotionConfig reducedMotion="user"` | reveal-on-scroll, hero console animation, mobile drawer |

> Dark-first aesthetic per PRD: "premium Silicon Valley AI startup" â€” honest copy, no fake stats/testimonials.



## 2. Routing Map (`src/App.js`)
```
BrowserRouter
â”œâ”€ Route element=<Layout/>               (public shell: Navbar + Outlet + Footer)
â”‚   â”œâ”€ "/"            â†’ Home.jsx
â”‚   â”œâ”€ "/services"   â†’ Services.jsx
â”‚   â”œâ”€ "/solutions" â†’ Solutions.jsx
â”‚   â”œâ”€ "/projects"   â†’ Projects.jsx
â”‚   â”œâ”€ "/process"    â†’ Process.jsx
â”‚   â”œâ”€ "/about"      â†’ About.jsx
â”‚   â”œâ”€ "/pricing"    â†’ Pricing.jsx
â”‚   â”œâ”€ "/blog"       â†’ Blog.jsx
â”‚   â”œâ”€ "/blog/:slug" â†’ BlogPost.jsx
â”‚   â”œâ”€ "/faq"        â†’ FAQ.jsx
â”‚   â”œâ”€ "/contact"    â†’ Contact.jsx
â”‚   â””â”€ "*"           â†’ Home.jsx (fallback)
â”œâ”€ "/admin/login"   â†’ AdminLogin.jsx
â””â”€ "/admin"         â†’ <ProtectedRoute><AdminDashboard/></ProtectedRoute>
```
- `AuthProvider` wraps all routes (session bootstrap via `/api/auth/me`).
- `ProtectedRoute`: loading spinner â†’ redirect to `/admin/login` when unauthenticated.




## 3. Component Hierarchy (Key)
```
App
â”œâ”€ AuthProvider
â”‚  â”œâ”€ Layout
â”‚  â”‚  â”œâ”€ Navbar (Logo, NavLinks, mobile drawer, Let's Talk CTA)
â”‚  â”‚  â”œâ”€ <OutletâŸ© â†’ Pages
â”‚  â”‚  â””â”€ Footer (socials from /api/settings, nav, CTA)
â”‚  â”œâ”€ pages/admin/AdminLogin
â”‚  â””â”€ pages/admin/AdminDashboard â†’ tabs â†’ AdminInquiries / AdminBlog / AdminSocial
â”œâ”€ Toaster (sonner)
â””â”€ (react-query QueryClientProvider in index.js)
```

Shared feature components: `BlogContent` (markdown-lite renderer), `CTASection`, `FeaturedProject`, `FundrHubMock` (CSS browser mockup), `ProjectCard`, `ProjectModal`, `Reveal` (scroll reveal), `ServiceCard`, `TechStack`, `home/Hero`, `home/HeroVisual`, `home/TrustBar`, 30+ `ui/*` shadcn primitives.



## 4. State & Data Fetching
| Concern | Mechanism |
|---|---|
| Auth session | `AuthContext` (user,null/false), axios `api` instance `withCredentials`, 401â†’refresh interceptor |
| Server cache | `@tanstack/react-query` (60 s staleTime, no refetchOnWindowFocus) â€” used via `QueryClientProvider` |
| Blog list/detail | axios `GET /api/blog` / `/api/blog/:slug` (local state per page)|
| Settings (footer/admin) | axios `GET /api/settings`; admin `PUT /api/admin/settings` |
| Admin data | axios admin endpoints (:inquiries,:blog,:settings) with local states + reload after mutations |
| Static content | `src/data/content.jsx` constants (NAV_LINKS, SERVICES, WHY_US, PROJECTS, SOLUTIONS, PROCESS_STEPS, TECH_STACK, PROJECT_TYPES, BUDGETS, IMAGES) |
| Toasts | sonner (`use-toast` hook wrapper available; pages use `toast.*` directly) |
| Test hooks | `data-testid` values centralized in `src/constants/testIds/*` (LOGIN, HOME, â€¦, kebab-case convention) |

## 5. Page-by-Page Notes
| Page | Highlights |
|---|---|
| Home | Hero + animated `HeroVisual` console + chips; TrustBar; SERVICES bento grid; FeaturedProject (FundrHub, live); solutions preview; WHY_US; TECH_STACK; CTASection |
| Services | 6 service cards + anchored per-service detail sections (features, tech, CTA) |
| Solutions | 5 solution cards (MVP, Add AI, Automate, Scale, SaaS) each with points + CTA |
| Projects | Featured FundrHub (live demo link, CSS mockup) + 3 concept cards ("Coming Soon"); ProjectModal details |
| Process | 7-step vertical timeline (Discoverâ†’Grow) |
| About | Studio narrative, principles (WHY_US), and a dedicated **Founder section — "Meet Ashutosh Singh"** (profile card with "AS" monogram, bio, and 4 point cards: Built J1YAI, Shipped FundrHub, AI-First, Full-Stack) |
| Pricing | Honest "depends on your project"; 3 engagement models; quote factors |
| Blog | List published posts (cover, title, excerpt, tags, date) â†’ `/blog/:slug` |
| BlogPost | Full post via `BlogContent` (## headings, - bullets, **bold**, cover image); SEO title; not-found state |
| FAQ | 10 honest Q&As in shadcn `accordion` |
| Contact | Validated form (name, email, company, project_type select, budget select, message) â†’ POST `/api/contact`; success/error feedback |

## 6. Blog Formatting Mini-Spec (`BlogContent`)
- Paragraphs split on blank lines; `## ` â†’ `<h2>`, `### ` â†’ `<h3>`; lines starting `- ` â†’ `<ul><li>`; `**text**` â†’ `<strong>`; everything else â†’ `<p>`.
- Used by both public article pages and the admin editor live preview pane (consistent WYSIWYG-ish experience.



## 7. Frontend Build & Dev
- `yarn start` â†’ `craco start` (dev server; `PORT=6060` local; `BROWSER=none`).
- `yarn build` â†’ `craco build` (production bundle to `build/`).
- `craco.config.js`: alias `@/`, watch-ignore patterns, optional health plugin + `@emergentbase/visual-edits` (dev).
- `REACT_APP_BACKEND_URL` injected at build time (all API calls use it.
- `public/index.html` holds default SEO meta + PostHog snippet + Google Fonts.
- `jsconfig.json` mirrors `@/*` â†’ `src/*` for editor intellisense.