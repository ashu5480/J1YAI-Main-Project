import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, CalendarCheck, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { SEO } from "@/components/layout/Layout";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROJECT_TYPES, BUDGETS } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NEXT_STEPS = [
  { icon: MessageSquare, title: "Tell us your idea", text: "Share as much or as little as you have — a sentence is enough to start." },
  { icon: CalendarCheck, title: "Free consultation call", text: "We schedule a call to understand your goals, scope and timeline." },
  { icon: Mail, title: "Proposal within days", text: "You get a clear plan with milestones and a fixed, honest estimate." },
];

const initial = { name: "", email: "", company: "", project_type: "", budget: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.project_type) e.project_type = "Select a project type.";
    if (!form.budget) e.budget = "Select a budget range.";
    if (form.message.trim().length < 10) e.message = "Tell us a bit more (at least 10 characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, { ...form, company: form.company || null });
      setStatus("success");
      toast.success("Message sent — we'll be in touch soon.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fieldError = (key) =>
    errors[key] ? <p className="mt-1.5 text-xs text-rose-400" data-testid={`contact-error-${key}`}>{errors[key]}</p> : null;

  return (
    <>
      <SEO
        title="Contact — Start Your Project | J1YAI"
        description="Tell us about your project. Web apps, mobile apps, AI chatbots, AI agents, SaaS or custom software — let's build something great."
      />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8" data-testid="contact-page">
          <SectionHeading
            testid="contact-heading"
            eyebrow="Contact"
            title="Let's Build Something Great"
            subtitle="Tell us where you are — idea, MVP or scaling product — and we'll tell you honestly how we'd approach it."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="space-y-6">
                {NEXT_STEPS.map((s, i) => (
                  <div key={s.title} className="flex gap-4" data-testid={`contact-step-${i + 1}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <s.icon className="h-5 w-5 text-cyan-300" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-slate-50">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.text}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-slate-400">Prefer email?</p>
                  <a href="mailto:singhashu772@gmail.com" data-testid="contact-email-link" className="mt-1 block font-display text-lg font-semibold text-cyan-300 hover:text-cyan-200">
                    singhashu772@gmail.com
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-slate-400">Prefer to talk?</p>
                  <a href="tel:+917042579843" data-testid="contact-phone-link" className="mt-1 block font-display text-lg font-semibold text-cyan-300 hover:text-cyan-200">
                    +91 70425 79843
                  </a>
                  <p className="mt-3 text-xs text-slate-500">Mon–Sat · 10am–7pm IST · WhatsApp friendly.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="rounded-3xl border border-white/10 bg-[#0F172A]/80 p-8 sm:p-10">
                {status === "success" ? (
                  <div className="flex flex-col items-start gap-4 py-10" data-testid="contact-success">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15">
                      <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-slate-50">Message received.</h3>
                    <p className="max-w-md text-sm leading-relaxed text-slate-400">
                      Thanks for reaching out — we've got your project details and will reply within 1–2 business days with next steps.
                    </p>
                    <Button
                      variant="outline"
                      data-testid="contact-send-another"
                      onClick={() => { setForm(initial); setStatus("idle"); }}
                      className="mt-2 border-white/15 bg-transparent text-slate-100 hover:bg-white/5"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate data-testid="contact-form" className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name" className="text-slate-300">Name *</Label>
                        <Input id="name" data-testid="contact-name-input" value={form.name} onChange={(e) => set("name", e.target.value)}
                          placeholder="Ada Lovelace" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" aria-invalid={!!errors.name} />
                        {fieldError("name")}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-300">Email *</Label>
                        <Input id="email" type="email" data-testid="contact-email-input" value={form.email} onChange={(e) => set("email", e.target.value)}
                          placeholder="ada@startup.com" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" aria-invalid={!!errors.email} />
                        {fieldError("email")}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-slate-300">Company</Label>
                      <Input id="company" data-testid="contact-company-input" value={form.company} onChange={(e) => set("company", e.target.value)}
                        placeholder="Startup Inc. (optional)" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <Label className="text-slate-300">Project Type *</Label>
                        <Select value={form.project_type} onValueChange={(v) => set("project_type", v)}>
                          <SelectTrigger data-testid="contact-project-type-select" className="mt-2 border-white/10 bg-white/5 text-slate-100" aria-label="Project type">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#0B1220] text-slate-100">
                            {PROJECT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {fieldError("project_type")}
                      </div>
                      <div>
                        <Label className="text-slate-300">Budget *</Label>
                        <Select value={form.budget} onValueChange={(v) => set("budget", v)}>
                          <SelectTrigger data-testid="contact-budget-select" className="mt-2 border-white/10 bg-white/5 text-slate-100" aria-label="Budget">
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#0B1220] text-slate-100">
                            {BUDGETS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {fieldError("budget")}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-slate-300">Message *</Label>
                      <Textarea id="message" rows={5} data-testid="contact-message-input" value={form.message} onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell us about your idea, goals and timeline…" className="mt-2 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600" aria-invalid={!!errors.message} />
                      {fieldError("message")}
                    </div>
                    <Button
                      type="submit"
                      data-testid="contact-submit-button"
                      disabled={status === "sending"}
                      className="w-full rounded-full bg-cyan-400 py-6 text-base font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-cyan-300 hover:-translate-y-0.5 sm:w-auto sm:px-10"
                    >
                      {status === "sending" ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>) : "Let's Build Something Great"}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
