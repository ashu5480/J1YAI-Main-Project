# 04 — Personas & User Stories

## Personas

### P1 — "Alex", Startup Founder (MVP Builder)
- **Needs:** Validate an idea fast without burning budget; understand scoping; get a trustworthy build partner.
- **Frustrations:** Agencies hyping fake stats; vague pricing; slow discovery; fear of building too much too soon.

### P2 — "Priya", SMB Owner Adopting AI
- **Needs:** See concrete AI offerings (chatbots, agents, automation); know what "AI" realistically means for her business; feel confident about costs.

- **Frustrations:** Jargon ("RAG", "agents"); opaque pricing; fear of another failed software project.


### P3 — "Marcus", SaaS Founder
- **Needs:** Full-product build (auth, billing, multi-tenancy, dashboards); technical credibility; references of complete builds.

- **Frustrations:** Studios that show only designs not shipped products; architecture rewrites later; unknown deployment maturity.



### P4 — "Site Owner" (J1YAI founder)
- **Needs:** Manage content without code; see inquiries centralplace; update socials/contact info; export the project for handoff/deploy; keep credentials safe .
- **Frustrations:** Losing leads; credentials leakage; edit fatigue through code changes.


## User Stories

### Core Marketing & Trust
| ID | Story | Acceptance Criteria |
|---|---|---|---|
| US-01 | As a visitor, I want to understand what J1YAI builds at a glance, so I can decide whether to explore further. | Hero states services and CTA; services grid lists 6 offerings. PASS if hero renders + CTA navigates to `/contact` |
| US-02 | As a visitor, I want to see honest proof of work, so I trust the studio. | FundrHub featured with live demo link, labeled internal product; concept projects marked "Coming Soon". |
| US-03 | As a visitor, I want to know how you work, so I feel safe starting a project. | Process page shows 7-step timeline; About states principles; Pricing explains cost drivers. |

### Contact & Lead
| ID | Story | Acceptance Criteria |
|---|---|---|---|
| US-04 | As a founder, I want to describe my project and send it, so J1YAI can follow up. | Submit with valid data → success toast; inquiry appears in admin Inquiries tab; owner email attempts send. |
| US-05 | As a visitor, I want clear validation errors, so I can fix the form myself. | Invalid email / short message shows human-readable error; nothing persisted. |

### Blog
| ID | Story | Acceptance Criteria |
|---|---|---|---|
| US-06 | As a reader, I want to read expert articles, so I learn and trust J1YAI. | `/blog` lists published posts newest-first; article pages render headings/bullets/bold + cover image. |
| US-07 | As a reader, I want drafts to stay hidden, so I never see unfinished content. | Draft posts absent from `/api/blog` and `/blog/:slug` → 404. |

### Admin
| ID | Story | Acceptance Criteria |
|---|---|---|---|
| US-08 | As an admin, I want to log in securely, so only I can manage the site. | Wrong creds → 401 (locked after 5 fails/15 min); right creds → dashboard; session survives refresh (< 15 min + auto refresh). |
| US-09 | As an admin, I want a central inbox, so I never miss inquiries. | Inquiries tab lists name/email/company/type/budget/time/message newest-first. |
| US-10 | As an admin, I want to publish blog posts myself, so content stays fresh without code. | New Post/Edit/Delete; draft/publish toggle; live preview; covers+tags. |
| US-11 | As an admin, I want to manage contact email + socials, so the footer stays correct. | Save in Social tab → footer updates (blank hides icon). |
| US-12 | As an admin, I want to download the whole project with data, so I can redeploy elsewhere. | "Download Project" returns ZIP containing source + `.env.example` + `data_export.json` + README. |

### Edge Cases
| ID | Story | Acceptance Criteria |
|---|---|---|---|
| US-13 | As a visitor, I want the site to degrade gracefully on mobile/reduced-motion, so it works everywhere. | Responsive nav drawer; `prefers-reduced-motion` respected; no broken layout at 320 px. |
| US-14 | As a visitor, I want every page to have a proper title/description, so links share well. | `document.title` per route; OG/Twitter meta present. |