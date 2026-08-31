import { Link } from "react-router-dom";
import { Check, ArrowRight, Quote } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";

const ENGAGEMENTS = [
  {
    title: "MVP Sprint",
    for: "For founders validating a new idea fast.",
    includes: ["Scoped, focused MVP", "Core features only, done well", "Launch-ready deployment", "Short, fixed timeline"],
  },
  {
    title: "Product Build",
    for: "For businesses that need a complete product.",
    includes: ["Design, engineering & AI features", "Payments, auth & dashboards", "Cloud deployment & scaling", "Full testing before launch"],
  },
  {
    title: "Ongoing Partnership",
    for: "For products that need to keep growing.",
    includes: ["Maintenance & support", "Continuous improvements", "Performance monitoring", "Priority response"],
  },
];

const FACTORS = [
  "Scope and number of features",
  "AI capabilities and integrations",
  "Design and user experience complexity",
  "Timeline and team size required",
];

const Pricing = () => (
  <>
    <SEO
      title="Pricing — Honest, Project-Based Quotes | J1YAI"
      description="Every project is different. J1YAI pricing depends on your scope, features and timeline — get a fixed, transparent quote after a free consultation."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="pricing-heading"
          eyebrow="Pricing"
          title="Honest Pricing, Shaped Around Your Project"
          subtitle="No generic packages that don't fit. Pricing depends on your project's scope, features and timeline — and you get one clear, fixed quote before we write a line of code."
        />
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="pricing-engagements">
      <div className="grid gap-8 md:grid-cols-3">
        {ENGAGEMENTS.map((e, i) => (
          <Reveal key={e.title} delay={0.06 * i}>
            <article className="card-hover flex h-full flex-col rounded-3xl border border-white/10 bg-[#0F172A]/80 p-8" data-testid={`pricing-card-${e.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Quote className="h-3 w-3" /> Custom quote
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-50">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.for}</p>
              <ul className="mt-6 space-y-2.5">
                {e.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                data-testid={`pricing-cta-${e.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50" data-testid="pricing-factors-heading">
              What Shapes Your Quote
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
              After a free consultation, we scope your project together and send a fixed proposal — milestones, deliverables and price, in writing. No surprises halfway through.
            </p>
          </div>
          <ul className="space-y-3">
            {FACTORS.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300 md:text-base" data-testid={`pricing-factor-${f.split(" ")[0].toLowerCase()}`}>
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
    <CTASection />
  </>
);

export default Pricing;
