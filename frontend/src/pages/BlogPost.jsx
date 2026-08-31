import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import CTASection from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import BlogContent from "@/components/BlogContent";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get(`${API}/blog/${slug}`).then(({ data }) => setPost(data)).catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 sm:px-8" data-testid="blog-post-not-found">
        <h1 className="font-display text-3xl font-semibold text-slate-50">Article not found</h1>
        <p className="mt-3 text-slate-400">This post may have been moved or unpublished.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </section>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <SEO title={`${post.title} | J1YAI Blog`} description={post.excerpt || post.title} />
      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8" data-testid="blog-post">
        <Reveal>
          <Link to="/blog" data-testid="blog-post-back" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-100">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <p className="mt-8 text-xs text-slate-500">
            {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl" data-testid="blog-post-title">{post.title}</h1>
          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((t) => <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">{t}</li>)}
            </ul>
          )}
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={`Cover image for ${post.title}`}
              loading="lazy"
              className="mt-8 w-full rounded-2xl border border-white/10 object-cover"
              data-testid="blog-post-cover"
            />
          )}
          <div className="mt-10">
            <BlogContent content={post.content} />
          </div>
        </Reveal>
      </article>
      <CTASection />
    </>
  );
};

export default BlogPost;
