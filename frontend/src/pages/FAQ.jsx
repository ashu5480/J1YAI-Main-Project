import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How much does it cost to build with J1YAI?",
    a: "It depends on your project — scope, features, AI complexity and timeline all shape the price. After a free consultation we send a fixed, written proposal with milestones and deliverables, so you know the full cost before we write a line of code. No surprise invoices halfway through.",
  },
  {
    q: "How long does an MVP take?",
    a: "Most MVPs ship in weeks, not months. The exact timeline depends on scope, which is why we run a discovery phase first and commit to a milestone plan you can hold us to.",
  },
  {
    q: "I'm not technical. Can I still work with you?",
    a: "Absolutely — many of the founders we work with aren't. We explain decisions in plain language, show you working software every week, and handle the technical details so you can focus on your business and your users.",
  },
  {
    q: "Who owns the code and the product?",
    a: "You do — 100%. All code, designs, accounts and infrastructure are transferred to you, and the product is built in repositories and cloud accounts you own.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We're happy to sign your NDA before you share any details about your idea, or provide a standard mutual NDA from our side.",
  },
  {
    q: "Can you add AI to my existing product?",
    a: "Yes — this is one of our most common requests. We integrate AI chatbots, RAG knowledge assistants, AI agents and workflow automation into existing products and stacks, without requiring a rebuild.",
  },
  {
    q: "What technologies do you work with?",
    a: "A modern, proven stack: React and Next.js, TypeScript, Node.js and Python, PostgreSQL, OpenAI and other LLM APIs, deployed on AWS, Vercel and Docker. We choose per project based on what will be easiest for you to maintain and scale.",
  },
  {
    q: "How do we communicate during the build?",
    a: "Weekly progress updates with working demos, a shared milestone plan, and direct access to the people building your product. You always know what's done, what's next and what's blocked.",
  },
  {
    q: "What happens after launch?",
    a: "Launch isn't the finish line. We offer ongoing maintenance and support — monitoring, fixes, improvements and new features — so your product keeps getting better as your user base grows.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Yes. We can deliver a complete product end-to-end, or embed with your team to add senior capacity for a specific build — an AI feature, a mobile app, a redesign, or a scaling push.",
  },
];

const FAQ = () => (
  <>
    <SEO
      title="FAQ — Questions Founders Ask Us | J1YAI"
      description="Answers about pricing, timelines, MVP development, AI integration, code ownership and working with J1YAI."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="faq-heading"
          eyebrow="FAQ"
          title="Questions Founders Ask Us"
          subtitle="Straight answers about cost, timelines, ownership and how we work. Something missing? Ask us directly."
        />
      </div>
    </section>

    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8" data-testid="faq-list">
      <Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="rounded-2xl border border-white/10 bg-[#0F172A]/80 px-6 data-[state=open]:border-cyan-400/30"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-slate-50 hover:text-cyan-200 hover:no-underline sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-400 md:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8" data-testid="faq-more-questions">
          <h2 className="font-display text-xl font-semibold text-slate-50">Still have questions?</h2>
          <p className="mt-2 text-sm text-slate-400">Every project starts with a free consultation. Ask us anything — no commitment required.</p>
          <Link
            to="/contact"
            data-testid="faq-contact-cta"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
          >
            Ask Your Question
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
    <CTASection />
  </>
);

export default FAQ;
