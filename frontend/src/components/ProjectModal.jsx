import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, ArrowUpRight } from "lucide-react";

const Block = ({ title, children }) => (
  <div>
    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{title}</h4>
    <div className="mt-2 text-sm leading-relaxed text-slate-300">{children}</div>
  </div>
);

const ProjectModal = ({ project, open, onOpenChange }) => {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="project-modal"
        className="max-h-[85vh] overflow-y-auto border-white/10 bg-[#0B1220] text-slate-100 sm:max-w-2xl"
      >
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              project.status === "live"
                ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border border-amber-400/30 bg-amber-400/10 text-amber-300"
            }`}>
              {project.badge}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">{project.label}</span>
          </div>
          <DialogTitle className="pt-3 font-display text-2xl font-semibold tracking-tight text-slate-50">
            {project.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-cyan-300">{project.category}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <Block title="Overview">{project.overview}</Block>
          <Block title="Problem">{project.problem}</Block>
          <Block title="Solution">{project.solution}</Block>
          <Block title="Key Features">
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Technology">
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{t}</li>
              ))}
            </ul>
          </Block>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="project-modal-live-demo"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5"
            >
              View Live Demo <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400" data-testid="project-modal-coming-soon">
              This is a concept project currently in development — not a client engagement.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
