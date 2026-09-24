import { Bot, BarChart3, Workflow, Smartphone, ArrowRight, ArrowUpRight } from "lucide-react";

const ICONS = { "ai-support": Bot, "smart-dashboard": BarChart3, "ai-automation": Workflow, mobchecker: Smartphone };

const ProjectCard = ({ project, onOpen }) => {
  const Icon = ICONS[project.id] || Bot;
  const isLive = project.status === "live";

  return (
    <article
      data-testid={`project-card-${project.id}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/80"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 to-[#0a1428]">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-8 w-8 text-cyan-300" />
        </span>
        <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold ${
          isLive
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-amber-400/30 bg-amber-400/10 text-amber-300"
        }`}>
          {project.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-medium text-cyan-300">{project.category} · {project.label}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-50">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <button
            onClick={() => onOpen(project)}
            data-testid={`project-view-${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
          >
            View Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`project-live-${project.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-colors duration-200 hover:text-emerald-200"
            >
              Visit Live Site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
