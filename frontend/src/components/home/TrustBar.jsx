import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const items = ["Startup Friendly", "AI Powered", "Scalable Architecture", "Production Ready", "Modern Technology"];

const TrustBar = () => (
  <section data-testid="trust-bar" className="border-y border-white/5 bg-white/[0.02]">
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Built for ambitious founders & growing businesses
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-300" data-testid={`trust-item-${item.toLowerCase().replace(/\s+/g, "-")}`}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15">
                <Check className="h-3 w-3 text-emerald-400" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default TrustBar;
