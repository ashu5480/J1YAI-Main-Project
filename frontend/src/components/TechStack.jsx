import { Reveal } from "@/components/Reveal";
import { TECH_STACK } from "@/data/content";

const TechStack = () => (
  <section data-testid="tech-stack" className="bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Technology</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built With Modern Technology
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            A focused, proven stack — chosen for speed, reliability and long-term maintainability.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <ul className="mt-12 flex flex-wrap gap-3">
          {TECH_STACK.map((t) => (
            <li
              key={t}
              data-testid={`tech-badge-${t.toLowerCase().replace(/[.\s]+/g, "-")}`}
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 font-display text-sm font-semibold tracking-tight text-slate-800 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cyan-500"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default TechStack;
