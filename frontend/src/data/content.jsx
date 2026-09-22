import {
  Globe, Smartphone, Bot, Workflow, Rocket, Code2,
  Zap, Brain, ShieldCheck, MessagesSquare, Cpu, Handshake,
  Lightbulb, Sparkles, Repeat, TrendingUp, Layers, Info, Briefcase, LifeBuoy,
} from "lucide-react";

export const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/projects", label: "Projects" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
];

export const TEAM_EMAILS = [
  { id: "info", icon: Info, label: "General Inquiries", email: "info@jiyaitech.com", primary: true },
  { id: "founder", icon: Rocket, label: "Founder · Ashutosh", email: "founder@jiyaitech.com" },
  { id: "sales", icon: Briefcase, label: "Sales & New Projects", email: "sales@jiyaitech.com" },
  { id: "support", icon: LifeBuoy, label: "Support · Existing Clients", email: "support@jiyaitech.com" },
];

export const CONTACT_EMAIL = "info@jiyaitech.com";

export const SERVICES = [
  {
    id: "web",
    icon: Globe,
    title: "Web Applications",
    tagline: "Modern, scalable web applications built with modern frameworks.",
    examples: ["SaaS platforms", "Marketplaces", "Dashboards", "Business applications", "Customer portals"],
    cta: "Build a Web App",
    whoFor: "Founders launching a platform, and businesses replacing spreadsheets and manual workflows with real software.",
    features: ["Responsive, accessible UI", "Secure authentication & roles", "Payments & subscriptions", "Admin dashboards & analytics", "Third-party API integrations"],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Vercel"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Applications",
    tagline: "High-quality mobile experiences for iOS and Android from a single codebase.",
    examples: ["Startup apps", "Consumer apps", "Business apps", "Marketplace apps"],
    cta: "Build a Mobile App",
    whoFor: "Startups that need to be in their users' pockets, and businesses mobilizing internal operations.",
    features: ["Cross-platform iOS & Android", "Push notifications", "Offline-first data sync", "App Store & Play Store launch", "In-app purchases"],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Node.js"],
  },
  {
    id: "chatbots",
    icon: Bot,
    title: "AI Chatbots",
    tagline: "Intelligent AI-powered chatbots for customer support, sales and internal operations.",
    examples: ["Website AI chatbots", "Customer support bots", "Knowledge-base assistants", "RAG systems", "AI customer service"],
    cta: "Build an AI Chatbot",
    whoFor: "Teams drowning in repetitive questions, and products that want an intelligent conversational layer.",
    features: ["Trained on your documentation (RAG)", "Website & in-app embedding", "Human handoff flows", "Conversation analytics", "Multi-language support"],
    tech: ["OpenAI", "RAG pipelines", "Vector databases", "Next.js", "Python"],
  },
  {
    id: "agents",
    icon: Workflow,
    title: "AI Agents & Automation",
    tagline: "AI agents that don't just answer — they actually perform tasks.",
    examples: ["Workflow automation", "Research agents", "Data processing", "Customer support automation", "Business process automation"],
    cta: "Automate With AI",
    whoFor: "Operations-heavy businesses losing hours to repetitive manual processes every week.",
    features: ["Multi-step task execution", "Tool & API orchestration", "Document intelligence", "Human-in-the-loop approval", "Audit logs & monitoring"],
    tech: ["LLM APIs", "Agent frameworks", "Python", "REST APIs", "Webhooks"],
  },
  {
    id: "saas",
    icon: Rocket,
    title: "SaaS Development",
    tagline: "Turn your business idea into a scalable SaaS platform.",
    examples: ["Authentication", "Subscription systems", "Payments", "Admin dashboards", "Multi-tenancy", "Analytics", "APIs"],
    cta: "Build Your SaaS",
    whoFor: "SaaS founders who need the full product — from sign-up to billing to dashboards — done right the first time.",
    features: ["Multi-tenant architecture", "Stripe subscriptions & billing", "Role-based access control", "Usage analytics", "Public API for your customers"],
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Vercel"],
  },
  {
    id: "custom",
    icon: Code2,
    title: "Custom Software",
    tagline: "Software built specifically around your business requirements.",
    examples: ["Internal tools", "Enterprise applications", "APIs", "Integrations", "Automation systems"],
    cta: "Discuss Custom Software",
    whoFor: "Companies whose workflows don't fit off-the-shelf tools and need software shaped around how they actually work.",
    features: ["Discovery-driven scoping", "API & backend development", "Legacy system integration", "Cloud deployment", "Maintenance & support"],
    tech: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
  },
];

export const WHY_US = [
  { icon: Zap, title: "Startup Mindset", text: "We understand speed, iteration and MVP development. Ship fast, learn, improve." },
  { icon: Brain, title: "AI First", text: "We use AI to build smarter products and automate repetitive workflows from day one." },
  { icon: ShieldCheck, title: "Production Ready", text: "We don't just create prototypes. We build scalable products designed for real users." },
  { icon: MessagesSquare, title: "Transparent Development", text: "Clear communication, defined milestones and full progress visibility throughout." },
  { icon: Cpu, title: "Modern Technology", text: "Modern frameworks, cloud platforms and AI technologies — no legacy baggage." },
  { icon: Handshake, title: "Long-Term Partnership", text: "We can continue supporting and improving your product long after launch." },
];

export const PROJECTS = [
  {
    id: "fundrhub",
    name: "FundrHub",
    category: "Startup Platform / Web Application",
    badge: "Live Demo",
    label: "Internal Product / Startup Project",
    status: "live",
    description:
      "FundrHub is a founder-investor discovery and connection platform designed to help startups discover relevant investors, showcase their businesses and build meaningful fundraising connections.",
    tags: ["Next.js", "TypeScript", "AI", "PostgreSQL", "Vercel", "Modern Web Architecture"],
    liveUrl: "https://fund-r-hub-web.vercel.app/",
    overview:
      "FundrHub is our internal startup product — a platform that bridges the gap between founders raising capital and investors looking for their next opportunity.",
    problem:
      "Early-stage founders struggle to find investors whose thesis actually matches their startup. Cold outreach is noisy, and investor discovery is scattered across spreadsheets, lists and networks.",
    solution:
      "A dedicated discovery platform where startups can showcase their business profile and investors can be discovered by fit — sector, stage and focus — turning fundraising research into a structured workflow.",
    features: [
      "Founder & startup profile showcase",
      "Investor discovery by sector, stage and focus",
      "Connection workflows between founders and investors",
      "AI-assisted matching and discovery",
      "Modern, responsive web experience deployed on Vercel",
    ],
  },
  {
    id: "ai-support",
    name: "AI Support Assistant",
    category: "AI / Chatbot",
    badge: "Coming Soon",
    label: "Concept Project",
    status: "concept",
    description:
      "An AI-powered customer support chatbot that understands company documentation and answers customer questions.",
    tags: ["AI", "RAG", "OpenAI", "Next.js"],
    overview: "A concept project exploring retrieval-augmented support automation for product companies.",
    problem: "Support teams answer the same questions daily while documentation sits unused.",
    solution: "A RAG-based assistant that grounds every answer in the company's own docs, with human handoff when confidence is low.",
    features: ["Documentation ingestion & retrieval", "Grounded, cited answers", "Escalation to human agents", "Embeddable website widget"],
  },
  {
    id: "smart-dashboard",
    name: "Smart Business Dashboard",
    category: "Web Application",
    badge: "Coming Soon",
    label: "Concept Project",
    status: "concept",
    description: "A real-time analytics dashboard for business owners.",
    tags: ["React", "Node.js", "PostgreSQL", "Analytics"],
    overview: "A concept project for a unified, real-time view of business metrics.",
    problem: "Owners check five tools to answer one question about their business.",
    solution: "A single dashboard aggregating revenue, operations and product metrics in real time.",
    features: ["Real-time metric streaming", "Custom report builder", "Role-based views", "Data source connectors"],
  },
  {
    id: "ai-automation",
    name: "AI Workflow Automation",
    category: "AI Automation",
    badge: "Coming Soon",
    label: "Concept Project",
    status: "concept",
    description: "AI-powered automation platform for repetitive business operations.",
    tags: ["AI Agents", "APIs", "Automation"],
    overview: "A concept project applying AI agents to back-office operations.",
    problem: "Teams lose hours weekly to repetitive processes like data entry, routing and reporting.",
    solution: "Composable AI agents that execute multi-step workflows across existing tools and APIs.",
    features: ["Agent workflow builder", "API & tool integrations", "Human-in-the-loop approval", "Execution audit logs"],
  },
];

export const SOLUTIONS = [
  { icon: Lightbulb, title: "Launch Your MVP", text: "Have an idea? We'll turn it into a working MVP you can put in front of real users.", points: ["Scoped to validate fast", "Core features only, done well", "Launch in weeks, not months"], cta: "Start Your MVP" },
  { icon: Sparkles, title: "Add AI To Your Business", text: "Introduce AI into existing products and workflows — chatbots, assistants, intelligent features.", points: ["LLM integration & RAG", "AI features in your product", "Document intelligence"], cta: "Discuss Your AI Idea" },
  { icon: Repeat, title: "Automate Your Operations", text: "Replace repetitive manual processes with intelligent automation and AI agents.", points: ["Workflow automation", "AI agents for operations", "System integrations"], cta: "Automate Your Work" },
  { icon: TrendingUp, title: "Scale Your Product", text: "Improve architecture, performance and reliability as your user base grows.", points: ["Architecture review", "Performance optimization", "Cloud infrastructure"], cta: "Scale With Us" },
  { icon: Layers, title: "Build Your SaaS", text: "From authentication to subscriptions to dashboards — a complete SaaS product.", points: ["Auth & multi-tenancy", "Stripe billing", "Admin & analytics"], cta: "Build Your SaaS" },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Discover", text: "Understand your idea, business and goals." },
  { n: "02", title: "Plan", text: "Define requirements, architecture and roadmap." },
  { n: "03", title: "Design", text: "Create user flows, wireframes and UI." },
  { n: "04", title: "Build", text: "Develop the product using modern technology." },
  { n: "05", title: "Test", text: "Perform functional, performance and quality testing." },
  { n: "06", title: "Launch", text: "Deploy your product to production." },
  { n: "07", title: "Grow", text: "Improve, maintain and scale your product." },
];

export const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Python",
  "OpenAI", "AWS", "Vercel", "Docker", "GitHub",
];

export const PROJECT_TYPES = [
  "Web Application", "Mobile Application", "AI Chatbot", "AI Agent",
  "SaaS", "Automation", "Custom Software", "Other",
];

export const BUDGETS = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1692119867376-3938c000196b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG5lb24lMjBkYXJrfGVufDB8fHx8MTc4ODE3MDY3Nnww&ixlib=rb-4.1.0&q=85",
  about: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDB8fHx8MTc4ODE3MDY3Nnww&ixlib=rb-4.1.0&q=85",
  solutions: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG5lb24lMjBkYXJrfGVufDB8fHx8MTc4ODE3MDY3Nnww&ixlib=rb-4.1.0&q=85",
  mobile: "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwYXBwJTIwaW50ZXJmYWNlJTIwZGFya3xlbnwwfHx8fDE3ODgxNzA2NzZ8MA&ixlib=rb-4.1.0&q=85",
};
