import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api, formatApiError } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "contact_email", label: "Contact Email", placeholder: "info@jiyaitech.com" },
  { key: "contact_phone", label: "Contact Phone", placeholder: "+91 70000 00000" },
  { key: "social_linkedin", label: "LinkedIn URL", placeholder: "https://www.linkedin.com/company/…" },
  { key: "social_instagram", label: "Instagram URL", placeholder: "https://www.instagram.com/…" },
  { key: "social_github", label: "GitHub URL", placeholder: "https://github.com/…" },
];

const AdminSocial = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setForm(data)).catch(() => setForm({}));
  }, []);

  if (form === null) {
    return <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>;
  }

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/settings", form);
      toast.success("Settings saved — live on the website footer.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSave} className="max-w-xl space-y-6 rounded-2xl border border-white/10 bg-[#0F172A]/70 p-8" data-testid="social-settings-form">
      <div>
        <h2 className="font-display text-xl font-semibold text-slate-50">Social Links & Contact Email</h2>
        <p className="mt-2 text-sm text-slate-400">These URLs power the social icons in the website footer. Leave one blank to hide it.</p>
      </div>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <Label htmlFor={f.key} className="text-slate-300">{f.label}</Label>
          <Input
            id={f.key}
            data-testid={`social-input-${f.key}`}
            value={form[f.key] || ""}
            onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600"
          />
        </div>
      ))}
      <Button type="submit" disabled={saving} data-testid="social-save-button"
        className="rounded-full bg-cyan-400 px-8 py-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
        {saving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</>) : "Save Settings"}
      </Button>
    </form>
  );
};

export default AdminSocial;
