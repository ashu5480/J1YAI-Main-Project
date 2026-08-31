import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CTASection = () => (
  <section data-testid="cta-section" className="relative overflow-hidden border-t border-white/5">
    <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
    <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
    <div className="relative mx-auto max-w-4xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          Have an Idea? <span className="text-gradient">Let's Build It.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
          Whether you're validating an idea, building an MVP or scaling an existing product, we're ready to help.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/contact"
            data-testid="cta-start-project"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-base font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            data-testid="cta-book-consultation"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-slate-100 transition-[background-color,border-color,transform] duration-200 hover:border-cyan-400/40 hover:bg-white/5 hover:-translate-y-0.5"
          >
            <CalendarCheck className="h-4 w-4 text-cyan-300" />
            Book a Consultation
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
