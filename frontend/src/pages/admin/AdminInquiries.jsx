import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { api } from "@/context/AuthContext";

const AdminInquiries = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    api.get("/admin/inquiries").then(({ data }) => setItems(data)).catch(() => setItems([]));
  }, []);

  if (items === null) {
    return <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0F172A]/70 p-10" data-testid="inquiries-empty">
        <Inbox className="h-7 w-7 text-cyan-300" />
        <p className="mt-4 font-display text-lg font-semibold text-slate-50">No inquiries yet</p>
        <p className="mt-2 text-sm text-slate-400">New contact form submissions will appear here and in your email inbox.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="inquiries-list">
      {items.map((q) => (
        <article key={q.id} className="rounded-2xl border border-white/10 bg-[#0F172A]/70 p-6" data-testid={`inquiry-card-${q.id}`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <h3 className="font-display text-base font-semibold text-slate-50">{q.name}</h3>
            <a href={`mailto:${q.email}`} className="text-sm text-cyan-300 hover:text-cyan-200">{q.email}</a>
            {q.company && <span className="text-sm text-slate-400">{q.company}</span>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-cyan-200">{q.project_type}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{q.budget}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-500">
              {new Date(q.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{q.message}</p>
        </article>
      ))}
    </div>
  );
};

export default AdminInquiries;
