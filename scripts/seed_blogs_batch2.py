import json
import os
import urllib.request

API = os.environ["API_URL"] + "/api"
ADMIN = {"email": "singhashu772@gmail.com", "password": "J1yai#Admin@2026"}

IMG = {
    "app_cost": "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwYXBwJTIwaW50ZXJmYWNlJTIwZGFya3xlbnwwfHx8fDE3ODgxNzA2NzZ8MA&ixlib=rb-4.1.0&q=85",
    "deploy": "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwc2VydmVyc3xlbnwwfHx8fDE3ODgxNzA2NzZ8MA&ixlib=rb-4.1.0&q=85",
    "automation": "https://images.unsplash.com/photo-1581832092832-70a3a75b19c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3ODgxNzA2NzZ8MA&ixlib=rb-4.1.0&q=85",
    "saas": "https://images.unsplash.com/photo-1642952469120-eed4b65104be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxjb2RlJTIwZWRpdG9yJTIwZGFyayUyMHRoZW1lfGVufDB8fHx8MTc4ODE3MDY3Nnww&ixlib=rb-4.1.0&q=85",
}

POSTS = [
    {
        "title": "How Much Does It Cost to Build an App? An Honest Breakdown",
        "excerpt": "The honest answer is 'it depends' — but that's useless without knowing what it depends on. Here's what actually moves the number.",
        "tags": ["Pricing", "MVP", "Startups"],
        "status": "published",
        "cover_image": IMG["app_cost"],
        "content": """"How much will it cost?" is always the first question, and "it depends" is always the first answer. Both are fair. So let's make "it depends" useful by breaking down what the number actually depends on.

## What moves the price

**Scope is the biggest lever by far.** Ten screens cost more than five. Three user roles cost more than one. Every feature multiplies into design, frontend, backend, testing and edge cases — which is why ruthless MVP scoping is worth real money.

**AI capabilities change the shape of a project.** A simple chatbot grounded in your docs is a contained build. An agent that takes actions across your systems needs guardrails, approvals and audit trails — more engineering, more testing, more cost.

**Integrations add up quietly.** Payments, CRMs, email providers, analytics — each one is its own small project with its own failure modes.

**Design depth matters.** A clean, functional interface is fast. A distinctive, animated, brand-defining experience takes longer — and for a consumer product, is often worth it.

## What a sensible budget structure looks like

- **Discovery & scoping** — a short, fixed phase that ends in a written plan
- **Design** — flows, wireframes, UI
- **Build** — the bulk of the budget, milestone by milestone
- **Test & launch** — quality work and production deployment
- **Ongoing** — optional maintenance and improvement after launch

## How to protect your budget

Ask for a **fixed quote per milestone**, not an open hourly meter. Demand a scope document before work starts. And treat "we'll figure it out as we go" as a red flag unless you're deliberately paying for exploration.

Our own approach is on the Pricing page: scope together, quote in writing, then build. The consultation costs nothing, and the proposal is yours to keep either way.""",
    },
    {
        "title": "The Founder's Deployment Checklist: From Localhost to Production",
        "excerpt": "Your app works on your laptop. Production is a different world. The checklist we run before anything we build goes live.",
        "tags": ["Cloud", "Engineering", "Launch"],
        "status": "published",
        "cover_image": IMG["deploy"],
        "content": """There's a moment in every project where the app works beautifully on a developer's machine — and then real users arrive. Production is a different environment: different scale, different failure modes, different consequences. Here's the checklist we run before anything we build goes live.

## Infrastructure

- **Environment variables, not hardcoded config.** Secrets and URLs live in the environment, never in the repository.
- **A real deployment target.** Vercel, AWS or containers with Docker — chosen for your scale, not for fashion.
- **Separate staging and production.** You should be able to break things somewhere users can't see.

## Reliability

- **Health checks and logging.** When something breaks at 2am, logs are the difference between minutes and hours.
- **Database backups.** Automated, tested, and restorable — a backup you've never restored is a hope, not a backup.
- **Graceful failure states.** Every external dependency will fail eventually. Decide what the user sees when it does.

## Security

- **HTTPS everywhere**, with secure, httpOnly session handling.
- **Rate limiting and lockouts** on anything that takes a password.
- **Dependency updates.** Known vulnerabilities in old packages are the quietest way to get breached.

## The human layer

- **A rollback plan.** If the launch goes wrong, how fast can you be back on the previous version?
- **An owner.** Someone is responsible when alerts fire. "Everyone" means no one.
- **Monitoring you'll actually read.** A dashboard nobody opens is decoration.

None of this is glamorous, and all of it is what separates a demo from a product. It's also why "production ready" is a phrase we use carefully — this checklist is what it means to us.""",
    },
    {
        "title": "Five Business Processes You Can Automate With AI This Month",
        "excerpt": "You don't need a moonshot to get value from AI. These five everyday processes are where our clients see hours come back first.",
        "tags": ["AI", "Automation", "Operations"],
        "status": "published",
        "cover_image": IMG["automation"],
        "content": """AI adoption doesn't have to start with a six-month platform build. The fastest returns come from automating the repetitive processes your team already hates. Five we see pay back almost immediately:

## 1. Lead triage and routing

An AI agent reads every inbound enquiry, extracts the essentials, scores urgency, and routes it to the right person with a summary. Your team starts conversations with context instead of a cold inbox.

## 2. Document processing

Invoices, contracts, applications, forms — anything that currently means a human reading a document and typing fields into a system. Document intelligence extracts the data, flags the exceptions, and leaves humans to handle only the weird cases.

## 3. Meeting and call summaries

Calls get transcribed, summarised, and turned into action items pushed into your project tool. Decisions stop evaporating the moment the call ends.

## 4. First-line customer support

A RAG-based assistant answers the repetitive tier of support questions from your own documentation, instantly, at any hour — with an honest handoff to a human when it's unsure. Your team handles the interesting problems.

## 5. Reporting and data collection

The weekly ritual of pulling numbers from five tools into a spreadsheet is a solved problem. An automated pipeline gathers, checks and delivers the report before you've finished your coffee.

## The pattern

Notice what these share: **high volume, clear rules, and a human available for exceptions.** That combination is where AI automation is reliable today. Start there, measure the hours returned, and expand with confidence.

The build for each of these is measured in weeks, and the first step is just identifying which process costs your team the most time. That's usually a ten-minute conversation.""",
    },
    {
        "title": "Auth, Billing, Multi-Tenancy: The Three Pillars Every SaaS Needs",
        "excerpt": "Every SaaS product stands on the same three foundations. Get them right early, or pay for them later — with interest.",
        "tags": ["SaaS", "Engineering", "Architecture"],
        "status": "published",
        "cover_image": IMG["saas"],
        "content": """Strip away the features and every SaaS product is the same three systems wearing different clothes. Understanding them early saves founders from the most expensive class of mistake in software: the architectural rewrite.

## Pillar one: Authentication and authorization

**Authentication** is proving who someone is; **authorization** is deciding what they're allowed to do. Version one usually needs email login, password reset, and roles — at minimum "admin" and "user". Get authorization right early: retrofitting permissions into a product that assumed everyone sees everything is painful.

## Pillar two: Billing and subscriptions

Billing feels like a feature. It's actually a state machine. Trials, upgrades, downgrades, failed payments, cancellations, refunds — each transition has edge cases, and each edge case is a real customer having a real bad day. This is why we build on Stripe rather than reinventing it: the state machine is their life's work.

Design your data model so "what plan is this customer on, right now?" is always answerable in one query. Future you, debugging a payment issue, will be grateful.

## Pillar three: Multi-tenancy

Multi-tenancy means many customers share your application while never seeing each other's data. The key decision is how you isolate tenants:

- **Shared database with a tenant key on every row** — simplest, right for most early SaaS
- **Schema or database per tenant** — stronger isolation, more operational weight, worth it for enterprise compliance needs

The dangerous middle is no strategy at all: data scoped by convention and hope. One missing filter is a data leak. Every query in a multi-tenant app should be physically unable to cross tenant boundaries.

## Why "later" is expensive

Each pillar is cheap to build at the start and expensive to retrofit once customers and data exist. They don't need to be elaborate on day one — they need to be correct. That's the difference between a SaaS that scales and one that stalls at its first hundred users.

Building a SaaS and want the foundations right from day one? That's literally our favourite kind of project — the consultation is free.""",
    },
]


def req(method, path, payload=None, cookie=None):
    data = json.dumps(payload).encode() if payload is not None else None
    r = urllib.request.Request(API + path, data=data, method=method)
    r.add_header("Content-Type", "application/json")
    r.add_header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36")
    if cookie:
        r.add_header("Cookie", cookie)
    with urllib.request.urlopen(r) as resp:
        return resp.status, json.loads(resp.read()), resp.headers


_, login_data, headers = req("POST", "/auth/login", ADMIN)
cookies = "; ".join(h.split(";")[0] for h in headers.get_all("Set-Cookie"))
print("logged in as:", login_data["email"])

for p in POSTS:
    status, data, _ = req("POST", "/admin/blog", p, cookies)
    print(status, "->", data.get("slug"))

_, public, _ = req("GET", "/blog")
print("public posts total:", len(public))
