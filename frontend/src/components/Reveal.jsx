import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, subtitle, testid }) => (
  <Reveal className="max-w-2xl">
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400" data-testid={testid ? `${testid}-eyebrow` : undefined}>
        {eyebrow}
      </p>
    )}
    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl" data-testid={testid ? `${testid}-title` : undefined}>
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{subtitle}</p>}
  </Reveal>
);
