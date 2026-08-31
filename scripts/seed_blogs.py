import json
import os
import urllib.request

API = os.environ["API_URL"] + "/api"
ADMIN = {"email": "singhashu772@gmail.com", "password": "J1yai#Admin@2026"}

POSTS = [
    {
        "title": "From Idea to MVP: How to Scope Your First Product Without Burning Your Budget",
        "excerpt": "The biggest MVP killer isn't bad code — it's building too much. Here's the scoping framework we use with every founder we work with.",
        "tags": ["MVP", "Startups", "Product"],
        "status": "published",
        "content": """Every founder we've worked with starts with the same instinct: add one more feature. If the app just had notifications, a referral system, and an admin analytics page, then it would be ready. This instinct is completely understandable — and it's the single biggest reason MVPs fail before they launch.

An MVP has exactly one job: prove that a real person has the problem you think they have, and that your solution is good enough for them to care. Anything that doesn't serve that job is a cost, not an investment.

Here's the scoping exercise we run in our discovery phase. Write down your product idea in one sentence. Then ask: what is the single action a user takes that delivers the core value? For a marketplace, it's a completed transaction. For a SaaS tool, it's the first "aha" output. For FundrHub, our own platform, it's a founder discovering an investor who actually fits their thesis. Everything in version one exists to make that one action happen reliably.

Once that action is clear, features sort themselves into three buckets. Bucket one is what the core action literally cannot work without — auth, the core flow, and the minimum data model. Bucket two is what makes it pleasant — polish, empty states, basic settings. Bucket three is everything else. Version one is bucket one, plus a thin slice of bucket two. Bucket three is your roadmap, and it's a great roadmap precisely because real users will reshape it.

A practical test we use: if a feature's absence means a user can't complete the core action, it's in. If its absence just means the experience is less delightful, it's out — for now. Delight matters, but delight on top of an unvalidated idea is expensive decoration.

The founders who launch fastest aren't the ones with the biggest budgets. They're the ones who were ruthless about what "version one" means. Scope small, ship, learn, and let real users tell you what bucket three should actually contain.""",
    },
    {
        "title": "AI Chatbot vs AI Agent: Which One Does Your Business Actually Need?",
        "excerpt": "Everyone wants 'an AI'. But a chatbot that answers questions and an agent that does work are very different builds — choosing wrong wastes months.",
        "tags": ["AI", "AI Agents", "Chatbots"],
        "status": "published",
        "content": """"We want to add AI to our business" is how most of our conversations start. The first thing we do is narrow it down, because "AI" usually means one of two very different things: a chatbot that answers questions, or an agent that performs tasks. They sound similar. They are not.

A chatbot's job is conversation. A customer asks "where is my order?" or "what's your refund policy?" and the bot retrieves the right answer — ideally grounded in your actual documentation using RAG, so it answers from your knowledge base instead of making things up. Chatbots shine when the bottleneck is information: support queues, repeated questions, onboarding help, internal knowledge lookup.

An agent's job is action. It doesn't just tell you the refund policy — it looks up the order, checks eligibility, issues the refund in your payment system, and logs what it did. Agents shine when the bottleneck is work: processing, routing, researching, updating records across tools.

The build complexity differs enormously. A well-scoped chatbot with RAG over your docs is a contained project — retrieval, prompting, a clean interface, and honest fallback to a human when confidence is low. An agent needs tool integrations, guardrails, approval steps for anything irreversible, and audit logs so you can see exactly what it did and why. That extra engineering is worth it when the task volume is real — and a waste when a chatbot would have solved the actual problem.

Our rule of thumb: if your team spends its day answering, start with a chatbot. If your team spends its day doing — copying data between systems, triaging requests, running the same multi-step process — that's agent territory. Many businesses end up needing both, but in sequence: answer first, automate second.

If you're not sure which side your problem falls on, that's exactly what a consultation is for. Describe the bottleneck, not the technology, and the right build usually becomes obvious within one call.""",
    },
    {
        "title": "Why We Built FundrHub Ourselves Before Asking You to Trust Us With Your Product",
        "excerpt": "Every agency claims they can ship a complete product. We decided to prove it on ourselves first — here's what building FundrHub taught us.",
        "tags": ["FundrHub", "Build in Public", "Startups"],
        "status": "published",
        "content": """When you hire a product studio, you're taking their word for a lot: that they can design, architect, build, and ship something real. We didn't love that dynamic. So before asking founders to trust us with their ideas, we built and shipped our own.

FundrHub is a founder-investor discovery and connection platform — a place where startups can showcase their business and discover investors whose focus actually matches their stage and sector. It's live, in production, and it's entirely ours: concept, design, engineering, deployment.

We built it because fundraising discovery is genuinely broken. Early-stage founders find investors through scattered lists, cold outreach, and luck. Investors see decks that were never a fit. The problem was real, the workflow was clear, and it was exactly the kind of product we build for clients — so we treated it like a client engagement with an unusually demanding client: ourselves.

That meant the same discipline we'd bring to your project. A scoped version one instead of an endless feature list. Modern, boring-in-the-right-ways technology — Next.js, TypeScript, PostgreSQL, deployed on Vercel — chosen for maintainability, not novelty. AI used where it genuinely helps, in matching and discovery, rather than sprinkled everywhere for the landing page.

It also taught us things we now apply to every client build. How much clarity a one-page product brief creates before any code is written. How fast scope creeps when you don't have the three-bucket discipline. How valuable it is to deploy to production early, even in private, because real infrastructure surfaces real problems that localhost never will.

You can try FundrHub live from our Projects page. It's the best answer we have to the question every founder should ask a studio before hiring them: "Show me something complete that you built." """,
    },
    {
        "title": "RAG, Explained for Founders: How an AI Chatbot Learns Your Business",
        "excerpt": "The difference between a chatbot that sounds smart and one that's actually right comes down to three letters. Here's RAG without the jargon.",
        "tags": ["AI", "RAG", "Chatbots"],
        "status": "published",
        "content": """Ask a generic AI model about your refund policy and it will give you a confident, fluent, completely invented answer. This is the failure mode that makes businesses nervous about customer-facing AI — and it's exactly the problem RAG was invented to solve.

RAG stands for retrieval-augmented generation. Strip the jargon and it's a simple idea: before the AI writes an answer, your system first searches your own documents — help center articles, policies, product docs, internal wikis — and hands the relevant passages to the model as reference material. The AI isn't relying on what it absorbed during training. It's reading from your library, then answering in natural language.

The difference in practice is enormous. Without RAG, a chatbot knows a little about everything and nothing reliably about you. With RAG, it answers questions about your product using your documentation, can quote the actual policy, and — just as importantly — can tell when your docs don't contain the answer, which is when it should hand the conversation to a human.

A good RAG build has a few non-obvious parts. Your documents get split into chunks and indexed so search is fast and relevant. Retrieval quality matters more than model choice — the best model in the world gives a bad answer if it's handed the wrong paragraph. And the honest-escalation path is a feature, not a compromise: a bot that says "let me connect you with the team" when it's unsure builds more trust than one that guesses.

This is the foundation of the AI support assistants and knowledge-base chatbots we build. The pattern extends further than support — the same approach powers internal assistants that answer "how do we do X here?" for your own team, trained on the documentation nobody reads.

If your business has documents and your customers or team have questions, you already have everything RAG needs. The build is shorter than most founders expect.""",
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
print("public posts:", len(public), [x["title"][:40] for x in public])
