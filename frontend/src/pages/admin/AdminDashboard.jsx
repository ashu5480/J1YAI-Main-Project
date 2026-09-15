import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Inbox, Newspaper, Share2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/layout/Navbar";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminSocial from "@/pages/admin/AdminSocial";

const TABS = [
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "blog", label: "Blog Posts", icon: Newspaper },
  { id: "social", label: "Social & Contact", icon: Share2 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("inquiries");

  return (
    <div className="min-h-screen bg-background" data-testid="admin-dashboard">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`${process.env.REACT_APP_BACKEND_URL || ""}/api/admin/export`}
              data-testid="admin-export-button"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
            >
              Download Project
            </a>
            <span className="hidden text-sm text-slate-400 sm:block">{user?.email}</span>
            <button
              onClick={logout}
              data-testid="admin-logout-button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-rose-400/40 hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              data-testid={`admin-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                tab === t.id ? "bg-cyan-400 text-slate-950" : "border border-white/10 text-slate-300 hover:border-cyan-400/40"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === "inquiries" && <AdminInquiries />}
          {tab === "blog" && <AdminBlog />}
          {tab === "social" && <AdminSocial />}
        </div>

        <p className="mt-14 text-sm text-slate-500">
          <Link to="/" className="text-cyan-300 hover:text-cyan-200" data-testid="admin-back-to-site">← Back to website</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
