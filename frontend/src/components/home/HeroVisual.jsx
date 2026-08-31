import { Bot, Workflow, Cloud, Smartphone, Braces, Sparkles } from "lucide-react";

const chips = [
  { icon: Bot, label: "AI Agents", className: "-left-4 top-8 animate-float-slow sm:-left-8" },
  { icon: Cloud, label: "Cloud Deploy", className: "-right-3 top-24 animate-float-slower sm:-right-6" },
  { icon: Smartphone, label: "Mobile", className: "-left-3 bottom-24 animate-float-slower sm:-left-6" },
  { icon: Braces, label: "APIs", className: "-right-4 bottom-10 animate-float-slow sm:-right-8" },
  { icon: Workflow, label: "Automation", className: "left-1/2 -bottom-5 -translate-x-1/2 animate-float-slow" },
];

const HeroVisual = () => (
  <div className="relative" data-testid="hero-visual" aria-hidden="true">
    <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

    <div className="glass relative rounded-2xl p-5 shadow-2xl shadow-cyan-950/40 sm:p-6">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
          j1yai.studio — build console
        </span>
      </div>

      <div className="space-y-4 pt-5">
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-cyan-400/15 px-4 py-2.5 text-sm text-cyan-100">
            Build an AI agent that triages our inbound leads.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
            <Sparkles className="h-3.5 w-3.5 text-slate-950" />
          </span>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
            Agent configured. Connected to your API, queued 3 automations, deployed to cloud.
            <span className="mt-2 flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse-dot" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse-dot" style={{ animationDelay: "0.3s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse-dot" style={{ animationDelay: "0.6s" }} />
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 font-mono text-xs leading-6">
          <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">api</span> <span className="text-slate-500">/v1/agents</span> <span className="text-cyan-300">201 created</span></p>
          <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">deploy</span> <span className="text-slate-500">production</span> <span className="text-cyan-300">live in 42s</span></p>
          <p><span className="text-blue-400">→</span> <span className="text-slate-400">workflow</span> <span className="text-slate-500">lead-triage</span> <span className="text-slate-300">running…</span></p>
        </div>
      </div>
    </div>

    {chips.map((c) => (
      <div
        key={c.label}
        className={`glass absolute z-10 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-slate-200 ${c.className}`}
      >
        <c.icon className="h-3.5 w-3.5 text-cyan-300" />
        {c.label}
      </div>
    ))}
  </div>
);

export default HeroVisual;
