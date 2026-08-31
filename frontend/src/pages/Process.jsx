import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PROCESS_STEPS } from "@/data/content";

const Process = () => (
  <>
    <SEO
      title="Our Process — How We Build | J1YAI"
      description="Discover, plan, design, build, test, launch, grow — the seven-step process J1YAI uses to take products from idea to production."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="process-heading"
          eyebrow="Process"
          title="How We Build"
          subtitle="A transparent, milestone-driven path from first conversation to a product that grows with your business."
        />
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8" data-testid="process-timeline">
      <ol className="relative space-y-10 border-l border-white/10 pl-10 sm:pl-14">
        {PROCESS_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={0.05 * i}>
            <li data-testid={`process-step-${s.n}`} className="relative">
              <span className="absolute -left-[3.65rem] flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-gray-950 font-display text-sm font-bold text-cyan-300 sm:-left-[4.65rem] sm:h-14 sm:w-14">
                {s.n}
              </span>
              <div className="card-hover rounded-2xl border border-white/10 bg-[#0F172A]/80 p-7">
                <h2 className="font-display text-xl font-semibold tracking-tight text-slate-50">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-base">{s.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.1} className="mt-14">
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-slate-400" data-testid="process-note">
          Throughout every phase you get weekly progress updates, a shared milestone plan and direct access to the people building your product — no account-manager telephone games.
        </p>
      </Reveal>
    </section>
    <CTASection />
  </>
);

export default Process;
