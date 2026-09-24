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
  const [featured, ...projects] = PROJECTS;
  const clientProjects = projects.filter((project) => project.status === "live");
  const concepts = projects.filter((project) => project.status !== "live");

  return (
    <>
      <SEO
        title="Projects — Products We've Built | J1YAI"
        description="Explore FundrHub, our live founder-investor platform, and MobChecker Mobile Solutions, a live client project for doorstep mobile repairs."
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
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50" data-testid="client-projects-heading">
            Client Work
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Live products built for real customers. Explore the work we have designed, developed and shipped.
          </p>
        </Reveal>
        {clientProjects.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clientProjects.map((project, i) => (
              <Reveal key={project.id} delay={0.05 * i}>
                <ProjectCard project={project} onOpen={setModalProject} />
              </Reveal>
            ))}
          </div>
        )}

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
