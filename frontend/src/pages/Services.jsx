import { Link } from "react-router-dom";
import { Check, ArrowRight, Users, Hammer, Cpu } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { SERVICES } from "@/data/content";

const DetailBlock = ({ icon: Icon, title, children }) => (
  <div>
    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
      <Icon className="h-4 w-4" /> {title}
    </h4>
    <div className="mt-3">{children}</div>
  </div>
);

const Services = () => (
  <>
    <SEO
      title="Services — Web, Mobile, AI & SaaS Development | J1YAI"
      description="Web applications, mobile apps, AI chatbots, AI agents, SaaS platforms and custom software — designed, built and shipped by J1YAI."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="services-heading"
          eyebrow="Services"
          title="Everything You Need To Ship"
          subtitle="From your first idea to a production-ready product — strategy, design, engineering, AI and cloud, under one roof."
        />
      </div>
    </section>

    <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8" data-testid="services-list">
      {SERVICES.map((s, i) => (
        <Reveal key={s.id}>
          <article
            id={s.id}
            data-testid={`service-detail-${s.id}`}
            className="scroll-mt-24 rounded-3xl border border-white/10 bg-[#0F172A]/70 p-8 sm:p-12"
          >
            <div className={`grid gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="lg:[direction:ltr]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <s.icon className="h-6 w-6 text-cyan-300" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{s.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-400">{s.tagline}</p>
                <div className="mt-8">
                  <DetailBlock icon={Users} title="Who It's For">
                    <p className="text-sm leading-relaxed text-slate-400">{s.whoFor}</p>
                  </DetailBlock>
                </div>
                <Link
                  to="/contact"
                  data-testid={`service-detail-cta-${s.id}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="space-y-8 lg:[direction:ltr]">
                <DetailBlock icon={Hammer} title="What We Build">
                  <ul className="flex flex-wrap gap-2">
                    {s.examples.map((e) => (
                      <li key={e} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{e}</li>
                    ))}
                  </ul>
                </DetailBlock>
                <DetailBlock icon={Check} title="Included">
                  <ul className="space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
                <DetailBlock icon={Cpu} title="Technology">
                  <ul className="flex flex-wrap gap-2">
                    {s.tech.map((t) => (
                      <li key={t} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium text-cyan-200">{t}</li>
                    ))}
                  </ul>
                </DetailBlock>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
    <CTASection />
  </>
);

export default Services;
