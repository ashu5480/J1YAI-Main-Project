import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroVisual from "@/components/home/HeroVisual";

const Hero = () => (
  <section data-testid="hero-section" className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 70% 55% at 65% 20%, rgba(6,182,212,0.10), transparent 65%)" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          data-testid="hero-trust-indicator"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-300"
        >
          From idea <ChevronRight className="h-3 w-3 text-cyan-300" /> MVP <ChevronRight className="h-3 w-3 text-cyan-300" /> Production
        </p>
        <h1
          data-testid="hero-headline"
          className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
        >
          Turn Your Ideas Into <span className="text-gradient">Powerful Digital Products.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
          We design and build web apps, mobile apps, AI agents, chatbots, SaaS platforms and custom software that help businesses move faster.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/contact"
            data-testid="hero-cta-start"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-base font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/projects"
            data-testid="hero-cta-explore"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-slate-100 transition-[background-color,border-color,transform] duration-200 hover:border-cyan-400/40 hover:bg-white/5 hover:-translate-y-0.5"
          >
            Explore Our Work
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 sm:px-8 lg:px-0"
      >
        <HeroVisual />
      </motion.div>
    </div>
  </section>
);

export default Hero;
