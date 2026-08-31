import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Newspaper, Eye, EyeOff } from "lucide-react";
import { api, formatApiError } from "@/context/AuthContext";
import BlogContent from "@/components/BlogContent";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emptyPost = { title: "", excerpt: "", cover_image: "", content: "", tags: "", status: "draft" };

const AdminBlog = () => {
  const [posts, setPosts] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const load = () => api.get("/admin/blog").then(({ data }) => setPosts(data)).catch(() => setPosts([]));
  useEffect(() => { load(); }, []);

  const startEdit = (post) => {
    setShowPreview(false);
    setEditing(post ? { cover_image: "", ...post, tags: post.tags.join(", ") } : { ...emptyPost });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: editing.title,
      excerpt: editing.excerpt,
      cover_image: editing.cover_image || "",
      content: editing.content,
      tags: editing.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status: editing.status,
    };
    try {
      if (editing.id) {
        await api.put(`/admin/blog/${editing.id}`, payload);
        toast.success("Post updated.");
      } else {
        await api.post("/admin/blog", payload);
        toast.success("Post created.");
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/blog/${post.id}`);
      toast.success("Post deleted.");
      load();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    }
  };

  if (editing) {
    return (
      <form onSubmit={onSave} className="max-w-2xl space-y-6 rounded-2xl border border-white/10 bg-[#0F172A]/70 p-8" data-testid="blog-editor-form">
        <button type="button" onClick={() => setEditing(null)} data-testid="blog-editor-back"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" /> All posts
        </button>
        <h2 className="font-display text-xl font-semibold text-slate-50">{editing.id ? "Edit Post" : "New Post"}</h2>
        <div>
          <Label htmlFor="bp-title" className="text-slate-300">Title *</Label>
          <Input id="bp-title" required data-testid="blog-title-input" value={editing.title}
            onChange={(e) => setEditing((s) => ({ ...s, title: e.target.value }))}
            className="mt-2 border-white/10 bg-white/5 text-slate-100" />
        </div>
        <div>
          <Label htmlFor="bp-excerpt" className="text-slate-300">Excerpt</Label>
          <Textarea id="bp-excerpt" rows={2} data-testid="blog-excerpt-input" value={editing.excerpt}
            onChange={(e) => setEditing((s) => ({ ...s, excerpt: e.target.value }))}
            placeholder="One or two sentences shown on the blog list."
            className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
        </div>
        <div>
          <Label htmlFor="bp-cover" className="text-slate-300">Cover Image URL</Label>
          <Input id="bp-cover" data-testid="blog-cover-input" value={editing.cover_image}
            onChange={(e) => setEditing((s) => ({ ...s, cover_image: e.target.value }))}
            placeholder="https://… (shown on the article and blog cards)"
            className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bp-content" className="text-slate-300">Content * (blank line between paragraphs)</Label>
            <button type="button" onClick={() => setShowPreview((v) => !v)} data-testid="blog-preview-toggle"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300">
              {showPreview ? (<><EyeOff className="h-3.5 w-3.5" /> Hide preview</>) : (<><Eye className="h-3.5 w-3.5" /> Preview</>)}
            </button>
          </div>
          <Textarea id="bp-content" rows={12} required data-testid="blog-content-input" value={editing.content}
            onChange={(e) => setEditing((s) => ({ ...s, content: e.target.value }))}
            className="mt-2 border-white/10 bg-white/5 text-slate-100" />
          <p className="mt-2 text-xs text-slate-500">
            Formatting: start a line with <code className="text-cyan-300">## </code> for a heading, <code className="text-cyan-300">- </code> for a bullet list, wrap text in <code className="text-cyan-300">**</code> for bold.
          </p>
        </div>
        {showPreview && (
          <div className="rounded-xl border border-cyan-400/20 bg-white/[0.03] p-6" data-testid="blog-preview">
            {editing.cover_image && (
              <img src={editing.cover_image} alt="Cover preview" className="mb-6 w-full rounded-xl border border-white/10 object-cover" />
            )}
            <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight text-slate-50">{editing.title || "Untitled"}</h3>
            {editing.content ? <BlogContent content={editing.content} /> : <p className="text-sm text-slate-500">Nothing to preview yet.</p>}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="bp-tags" className="text-slate-300">Tags (comma separated)</Label>
            <Input id="bp-tags" data-testid="blog-tags-input" value={editing.tags}
              onChange={(e) => setEditing((s) => ({ ...s, tags: e.target.value }))}
              placeholder="AI, MVP, SaaS"
              className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
          </div>
          <div>
            <Label className="text-slate-300">Status</Label>
            <Select value={editing.status} onValueChange={(v) => setEditing((s) => ({ ...s, status: v }))}>
              <SelectTrigger data-testid="blog-status-select" className="mt-2 border-white/10 bg-white/5 text-slate-100" aria-label="Post status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0B1220] text-slate-100">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={saving} data-testid="blog-save-button"
          className="rounded-full bg-cyan-400 px-8 py-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          {saving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</>) : editing.id ? "Update Post" : "Create Post"}
        </Button>
      </form>
    );
  }

  return (
    <div data-testid="blog-admin-list">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-slate-50">Blog Posts</h2>
        <Button onClick={() => startEdit(null)} data-testid="blog-new-button"
          className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Plus className="mr-1.5 h-4 w-4" /> New Post
        </Button>
      </div>
      {posts === null ? (
        <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>
      ) : posts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F172A]/70 p-10" data-testid="blog-admin-empty">
          <Newspaper className="h-7 w-7 text-cyan-300" />
          <p className="mt-4 font-display text-lg font-semibold text-slate-50">No posts yet</p>
          <p className="mt-2 text-sm text-slate-400">Create your first article — drafts stay hidden until you publish them.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#0F172A]/70 p-5" data-testid={`blog-admin-row-${p.slug}`}>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-slate-50">{p.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  /blog/{p.slug} · {new Date(p.created_at).toLocaleDateString()} ·{" "}
                  <span className={p.status === "published" ? "text-emerald-400" : "text-amber-300"}>{p.status}</span>
                </p>
              </div>
              <button onClick={() => startEdit(p)} data-testid={`blog-edit-${p.slug}`} aria-label={`Edit ${p.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(p)} data-testid={`blog-delete-${p.slug}`} aria-label={`Delete ${p.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-rose-400/40 hover:text-rose-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
