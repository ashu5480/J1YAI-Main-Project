# PRD — J1YAI Startup Website

## Original Problem Statement
Build a premium, modern, production-ready website for J1YAI — a technology company that turns ideas into digital products (web apps, mobile apps, AI chatbots, AI agents, AI automation, SaaS, custom software, MVP development, UI/UX, APIs, cloud, support). Dark-first premium "Silicon Valley AI startup" aesthetic, multi-page structure, honest positioning (no fake stats/testimonials), conversion-focused toward "Start Your Project" / "Let's Talk".

## User Personas
- Startup founders looking to build an MVP
- SMBs adopting AI / automation
- SaaS founders needing full product builds
- Agencies seeking dev partners

## Architecture
- Frontend: React 19 + react-router-dom v7 (multi-page SPA), Tailwind, shadcn/ui, framer-motion, lucide-react
- Backend: FastAPI + MongoDB (motor). POST /api/contact persists inquiries (email integration point isolated in server.py)
- Design system: /app/design_guidelines.json — dark-first (#030712), cyan #06B6D4 / blue #3B82F6 / emerald accents, Outfit headings + Inter body

## Core Requirements (static)
Pages: Home, Services, Solutions, Projects, About, Process, Contact. Sticky blur navbar + mobile drawer. Hero with animated AI console visual. Trust bar. Bento services grid. Featured FundrHub project (live demo https://fund-r-hub-web.vercel.app/, labeled "Internal Product / Startup Project"). Concept projects honestly marked "Coming Soon / Concept Project". Project detail modal. 7-step process timeline. Tech stack section. Contact form with validation. SEO meta. Responsive + reduced-motion support.

## Implemented (2026-08-31)
- All 7 core pages with shared layout, navbar, footer, CTA section
- Hero with animated glass "build console" visual + floating capability chips
- Services page with detailed anchored sections per service
- Projects page: FundrHub featured card + CSS browser mockup + detail modal + 3 concept projects
- Process page: 7-step vertical timeline
- About page with studio narrative + principles
- Contact page: validated form → POST /api/contact → MongoDB + Resend email notification to owner (singhashu772@gmail.com), reply-to set to the sender
- SEO title/description/OG/Twitter meta in index.html
- Pricing page: honest "depends on your project" positioning, 3 engagement models (MVP Sprint / Product Build / Ongoing Partnership), quote factors
- Blog: public /blog list + /blog/:slug detail (paragraph rendering), honest empty state
- Admin: JWT cookie auth (15min access + 7d refresh, bcrypt, 5-attempt/15-min lockout), seeded admin (singhashu772@gmail.com), dashboard at /admin with Inquiries list, Blog CRUD (draft/published), Social & Contact settings editor
- Footer social icons driven by admin settings (blank URL = icon hidden); verified set→visible→blank flow; Instagram (fundrhub profile) configured, LinkedIn/GitHub intentionally blank
- 8 original blog posts published across 2 seed scripts (/app/scripts/seed_blogs.py, seed_blogs_batch2.py); batch 2 uses cover images + formatted content
- Blog editor upgraded: cover image URL field, live preview pane, lightweight formatting renderer (## headings, - bullets, **bold**) shared by editor preview and public article pages
- FAQ page (/faq) with 10 honest founder Q&As in an accordion, linked in navbar and footer
- Project export: admin-only GET /api/admin/export zips the full codebase (frontend/backend/scripts/memory, excludes .env + node_modules), includes .env.example templates, README_EXPORT.md setup guide, and data_export.json with all blog posts, settings and inquiries; "Download Project" button in admin dashboard header

## Backlog
- P1: FAQ page, richer blog editor (markdown/richtext), post cover images
- P2: sitemap.xml/robots.txt generation, per-page OG images, case-study pages when real client projects exist, admin analytics on inquiries
