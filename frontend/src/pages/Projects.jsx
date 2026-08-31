import { useState } from "react";
import { SEO } from "@/components/layout/Layout";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PROJECTS } from "@/data/content";

const Projects = () => {
  const [modalProject, setModalProject] = useState(null);
  const [featured, ...concepts] = PROJECTS;

  return (
    <>
      <SEO
        title="Projects — Products We've Built | J1YAI"
        description="Real products, real technology. Explore FundrHub — our live founder-investor platform — and the concepts we're building next."
      />
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <SectionHeading
            testid="projects-heading"
            eyebrow="Portfolio"
            title="Projects We've Built"
            subtitle="Real products. Real technology. Built to solve real problems."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="projects-list">
        <FeaturedProject project={featured} onOpen={setModalProject} />

        <Reveal className="mt-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50" data-testid="concepts-heading">
            In The Lab
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Concept projects we're actively developing. These are our own works in progress — shown honestly as concepts, not client engagements.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((p, i) => (
            <Reveal key={p.id} delay={0.05 * i}>
              <ProjectCard project={p} onOpen={setModalProject} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
      <ProjectModal project={modalProject} open={!!modalProject} onOpenChange={(v) => !v && setModalProject(null)} />
    </>
  );
};

export default Projects;
