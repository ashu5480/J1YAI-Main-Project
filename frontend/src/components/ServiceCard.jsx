import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service, className = "" }) => (
  <article
    data-testid={`service-card-${service.id}`}
    className={`card-hover group flex flex-col rounded-2xl border border-white/10 bg-[#0F172A]/80 p-8 ${className}`}
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
      <service.icon className="h-6 w-6 text-cyan-300" />
    </span>
    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-slate-50">{service.title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.tagline}</p>
    <ul className="mt-5 flex flex-wrap gap-2">
      {service.examples.slice(0, 4).map((ex) => (
        <li key={ex} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          {ex}
        </li>
      ))}
    </ul>
    <Link
      to={`/services#${service.id}`}
      data-testid={`service-cta-${service.id}`}
      className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
    >
      {service.cta}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  </article>
);

export default ServiceCard;
