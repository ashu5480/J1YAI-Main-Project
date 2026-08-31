import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { SOLUTIONS } from "@/data/content";

const Solutions = () => (
  <>
    <SEO
      title="Solutions — MVPs, AI Adoption, Automation & SaaS | J1YAI"
      description="Launch your MVP, add AI to your business, automate operations, scale your product or build your SaaS — outcome-driven solutions from J1YAI."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="solutions-heading"
          eyebrow="Solutions"
          title="We Sell Outcomes, Not Just Code"
          subtitle="You don't need 'a React app'. You need a launched product, an automated operation, or an AI-enabled business. Start from the outcome."
        />
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="solutions-list">
      <div className="grid gap-8 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.title} delay={0.05 * i} className={i === 4 ? "md:col-span-2" : ""}>
            <article
              data-testid={`solution-detail-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="card-hover h-full rounded-3xl border border-white/10 bg-[#0F172A]/70 p-8 sm:p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <s.icon className="h-6 w-6 text-cyan-300" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-50">{s.title}</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">{s.text}</p>
              <ul className="mt-6 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                data-testid={`solution-cta-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
              >
                {s.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
    <CTASection />
  </>
);

export default Solutions;
