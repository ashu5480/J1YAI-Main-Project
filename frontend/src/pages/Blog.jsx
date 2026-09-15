import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, PenLine } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal, SectionHeading } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const Blog = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get(`${API}/blog`).then(({ data }) => setPosts(data)).catch(() => setPosts([]));
  }, []);

  return (
    <>
      <SEO title="Blog — Notes on Building Products & AI | J1YAI" description="Thoughts on MVPs, AI agents, SaaS and shipping software — from the J1YAI studio." />
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <SectionHeading testid="blog-heading" eyebrow="Blog" title="Notes From the Studio" subtitle="What we're learning about MVPs, AI agents, SaaS and shipping software that lasts." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="blog-list">
        {posts === null ? (
          <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>
        ) : posts.length === 0 ? (
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[#0F172A]/70 p-12 text-left" data-testid="blog-empty">
              <PenLine className="h-8 w-8 text-cyan-300" />
              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-50">Articles are on the way.</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
                We're writing about how we build MVPs, AI agents and SaaS products. Check back soon — or start a conversation with us directly.
              </p>
              <Link to="/contact" data-testid="blog-empty-cta" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                Let's Talk <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={0.05 * i}>
                <Link to={`/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`} className="card-hover block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/80">
                  {p.cover_image && (
                    <img src={p.cover_image} alt={`Cover image for ${p.title}`} loading="lazy" className="h-44 w-full object-cover" />
                  )}
                  <div className="p-7">
                    <p className="text-xs text-slate-500">{formatDate(p.created_at)}</p>
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-slate-50">{p.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.excerpt}</p>
                    {p.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">{t}</li>)}
                      </ul>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
};

export default Blog;
