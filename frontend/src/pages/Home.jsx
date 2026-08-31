import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectModal from "@/components/ProjectModal";
import TechStack from "@/components/TechStack";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { SERVICES, WHY_US, PROJECTS, SOLUTIONS, PROCESS_STEPS } from "@/data/content";

const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];

const Home = () => {
  const [modalProject, setModalProject] = useState(null);

  return (
    <>
      <SEO
        title="Build Digital Products With AI | J1YAI"
        description="We build web apps, mobile apps, AI chatbots, AI agents, SaaS platforms and custom software for ambitious startups and businesses."
      />
      <Hero />
      <TrustBar />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" data-testid="home-services">
        <SectionHeading
          testid="home-services-heading"
          eyebrow="Services"
          title="What We Build"
          subtitle="From your first idea to a production-ready product, we handle the technology."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={0.05 * i} className={`md:col-span-1 ${SPANS[i]}`}>
              <ServiceCard service={s} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02]" data-testid="home-why-us">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionHeading
            testid="home-why-us-heading"
            eyebrow="Why J1YAI"
            title="Why Build With Us?"
            subtitle="A product studio built around startup speed, engineering quality and AI."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={0.05 * i}>
                <div className="card-hover h-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-7" data-testid={`why-us-${w.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <w.icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-50">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" data-testid="home-projects">
        <SectionHeading
          testid="home-projects-heading"
          eyebrow="Our Work"
          title="Projects We've Built"
          subtitle="Real products. Real technology. Built to solve real problems."
        />
        <div className="mt-14">
          <FeaturedProject project={PROJECTS[0]} onOpen={setModalProject} />
        </div>
        <Reveal className="mt-8">
          <Link
            to="/projects"
            data-testid="home-projects-view-all"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02]" data-testid="home-solutions">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionHeading
            testid="home-solutions-heading"
            eyebrow="Solutions"
            title="Outcomes, Not Just Technology"
            subtitle="Tell us where you want to go — we pick the right technology to get you there."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={0.05 * i}>
                <Link
                  to="/solutions"
                  data-testid={`solution-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="card-hover block h-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-7"
                >
                  <s.icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-50">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8" data-testid="home-process-strip">
        <SectionHeading testid="home-process-heading" eyebrow="Process" title="How We Build" subtitle="A clear path from idea to a growing product." />
        <Reveal delay={0.1}>
          <ol className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-7 lg:overflow-visible">
            {PROCESS_STEPS.map((p) => (
              <li key={p.n} className="min-w-[10rem] snap-start rounded-2xl border border-white/10 bg-[#0F172A]/80 p-5">
                <span className="font-display text-sm font-bold text-cyan-300">{p.n}</span>
                <p className="mt-2 font-display text-base font-semibold text-slate-50">{p.title}</p>
              </li>
            ))}
          </ol>
          <Link
            to="/process"
            data-testid="home-process-link"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            See the full process
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <TechStack />
      <CTASection />
      <ProjectModal project={modalProject} open={!!modalProject} onOpenChange={(v) => !v && setModalProject(null)} />
    </>
  );
};

export default Home;
