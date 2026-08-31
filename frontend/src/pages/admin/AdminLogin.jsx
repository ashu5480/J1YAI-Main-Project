import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth, formatApiError } from "@/context/AuthContext";
import { Logo } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/admin", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10" data-testid="admin-login-card">
        <Logo />
        <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight text-slate-50">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-400">Manage inquiries, social links and blog posts.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
          <div>
            <Label htmlFor="admin-email" className="text-slate-300">Email</Label>
            <Input id="admin-email" type="email" required data-testid="admin-email-input" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@j1yai.com" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
          </div>
          <div>
            <Label htmlFor="admin-password" className="text-slate-300">Password</Label>
            <Input id="admin-password" type="password" required data-testid="admin-password-input" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
          </div>
          {error && <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-300" data-testid="admin-login-error">{error}</p>}
          <Button type="submit" disabled={loading} data-testid="admin-login-submit"
            className="w-full rounded-full bg-cyan-400 py-6 text-base font-semibold text-slate-950 hover:bg-cyan-300">
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</>) : "Sign In"}
          </Button>
        </form>
        <Link to="/" data-testid="admin-login-back" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
