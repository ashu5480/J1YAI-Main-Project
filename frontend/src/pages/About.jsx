import { Compass, Code2, Brain, Gauge, Rocket, Target, Lightbulb, Mail } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { IMAGES } from "@/data/content";

const PRINCIPLES = [
  { icon: Compass, title: "Product Thinking", text: "We ask 'should this exist?' before 'how do we build it?' — features earn their place." },
  { icon: Code2, title: "Engineering Discipline", text: "Clean architecture, tested code and honest estimates. No duct-tape prototypes sold as products." },
  { icon: Brain, title: "AI-Native", text: "We build with AI and we build AI itself — agents, chatbots and automation are core to how we work." },
  { icon: Gauge, title: "Startup Speed", text: "Short cycles, weekly demos, fast iteration. Momentum is a feature." },
];

const FOUNDER_POINTS = [
  {
    icon: Rocket,
    title: "Built J1YAI From A Blank Page",
    text: "Ashutosh founded J1YAI with a simple conviction — founders deserve a partner that ships, not one that disappears for months. Every process on this site is something he actually runs.",
  },
  {
    icon: Target,
    title: "Shipped FundrHub End-To-End",
    text: "He built FundrHub — J1YAI's own founder-investor platform — from idea to a live web product. It's the answer he gives to 'show me something complete you built.'",
  },
  {
    icon: Brain,
    title: "AI-First, Not AI-Washing",
    text: "He reaches for AI only where it genuinely helps — agents, chatbots, automation — and is equally happy saying 'this doesn't need AI.' The tool follows the problem.",
  },
  {
    icon: Lightbulb,
    title: "Full-Stack, No Hand-Offs",
    text: "From architecture to design to deployment, Ashutosh stays hands-on across the whole stack. There's no 'not my job' layer between your idea and your product.",
  },
];

const About = () => (
  <>
    <SEO
      title="About — We Build Products, Not Just Code | J1YAI"
      description="J1YAI is an AI-native product studio: engineering, product thinking and startup speed, focused on software that ships and scales."
    />
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          testid="about-heading"
          eyebrow="About J1YAI"
          title="We Build Products, Not Just Code."
          subtitle="A product studio for founders and businesses who want software that actually ships — and keeps working after it does."
        />
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="about-story">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-slate-400">
            <p>
              J1YAI exists because too many good ideas die between a pitch deck and a working product. Founders don't need another agency that disappears for three months and returns with something fragile — they need a partner that thinks in products and ships in weeks.
            </p>
            <p>
              We work at the intersection of engineering, product thinking and AI. That means we care about your user experience as much as your database schema, and we reach for AI — agents, chatbots, automation — wherever it genuinely makes your product or business faster.
            </p>
            <p>
              Everything we build is designed to scale: modern frameworks, cloud-native deployment, and codebases your future team will thank you for. And because we build our own products — like FundrHub — we hold ourselves to the same standard we'd want as founders.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src={IMAGES.about}
              alt="The J1YAI team collaborating on a product build"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 left-5 font-display text-lg font-semibold text-slate-50">
              Small team. Senior output.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="about-principles">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={0.05 * i}>
            <div className="card-hover h-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-7">
              <p.icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-50">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
    <section className="border-t border-white/5 bg-white/[0.02] py-24" data-testid="about-founder">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            testid="about-founder-heading"
            eyebrow="The Founder"
            title="Meet Ashutosh Singh"
            subtitle="J1YAI is built by a founder who codes, ships and stays for the long run — not a faceless agency."
          />

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#111c33] p-2">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src="/images/FounderImage.jpg"
                    alt="Ashutosh Singh - Founder of J1YAI"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-gray-950/85 px-4 py-1.5 text-sm font-semibold text-slate-100 backdrop-blur">
                  Ashutosh Singh
                </p>
                <p className="absolute bottom-5 right-5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-300 backdrop-blur">
                  Founder
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-slate-400">
                  Ashutosh Singh is the founder and hands-on lead behind J1YAI. He works directly with every client — from the first scoping call to the moment your product goes live and beyond. No account managers, no game of telephone, no disappearing act.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  This is a studio built by a single founder who decided the best way to earn trust was to build his own product — FundrHub — before asking anyone else to invest in one.
                </p>
                <a
                  href="mailto:founder@jiyaitech.com"
                  data-testid="about-founder-email"
                  aria-label="Email the founder: founder@jiyaitech.com"
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-[background-color,border-color,transform] duration-200 hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  founder@jiyaitech.com
                </a>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2" data-testid="about-founder-points">
                {FOUNDER_POINTS.map((f, i) => (
                  <Reveal key={f.title} delay={0.05 * i}>
                    <div className="card-hover h-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-6">
                      <f.icon className="h-5 w-5 text-cyan-300" />
                      <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-slate-50">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
  </>
);

export default About;
