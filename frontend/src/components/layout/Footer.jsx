import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Linkedin, Instagram, Github, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Navbar";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const nav = [
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get(`${API}/settings`).then(({ data }) => setSettings(data)).catch(() => setSettings({}));
  }, []);

  const socials = [
    { icon: Linkedin, href: settings?.social_linkedin, label: "LinkedIn" },
    { icon: Instagram, href: settings?.social_instagram, label: "Instagram" },
    { icon: Github, href: settings?.social_github, label: "GitHub" },
  ].filter((s) => s.href);

  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-[#02060f]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              We build modern digital products powered by software and AI.
            </p>
            {settings?.contact_phone && (
              <a
                href={`tel:${settings.contact_phone.replace(/[^+0-9]/g, "")}`}
                data-testid="footer-phone"
                className="mt-5 block w-fit text-sm text-slate-300 transition-colors duration-200 hover:text-cyan-300"
              >
                <span className="text-slate-500">Call / WhatsApp · </span>
                {settings.contact_phone}
              </a>
            )}
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase()}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-[color,border-color] duration-200 hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            {nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`footer-link-${l.label.toLowerCase()}`}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="font-display text-lg font-semibold text-slate-50">Have an idea? Let's talk.</p>
            <Link
              to="/contact"
              data-testid="footer-cta"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-[background-color,transform] duration-200 hover:bg-cyan-400/10 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div className="mt-14 border-t border-white/5 pt-6 text-sm text-slate-500">
          © 2026 J1YAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
