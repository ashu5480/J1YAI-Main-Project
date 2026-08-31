import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import FundrHubMock from "@/components/FundrHubMock";

const FeaturedProject = ({ project, onOpen }) => (
  <Reveal>
    <article
      data-testid="project-featured-fundrhub"
      className="grid gap-10 rounded-3xl border border-white/10 bg-[#0F172A]/70 p-8 sm:p-12 lg:grid-cols-2 lg:items-center"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300" data-testid="fundrhub-live-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            {project.badge}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
            {project.label}
          </span>
        </div>
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-50">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-cyan-300">{project.category}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{t}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="fundrhub-live-demo-button"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5"
          >
            View Live Demo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            onClick={() => onOpen(project)}
            data-testid="fundrhub-details-button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100 transition-[background-color,border-color] duration-200 hover:border-cyan-400/40 hover:bg-white/5"
          >
            Project Details
          </button>
        </div>
      </div>
      <button
        onClick={() => onOpen(project)}
        data-testid="fundrhub-mockup-click"
        className="block text-left transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
        aria-label="Open FundrHub project details"
      >
        <FundrHubMock />
      </button>
    </article>
  </Reveal>
);

export default FeaturedProject;
