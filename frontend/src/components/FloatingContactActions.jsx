import { MessageCircle, Phone } from "lucide-react";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/data/content";

const tooltipClass =
  "pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/95 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-xl transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block";

const FloatingContactActions = () => (
  <aside
    aria-label="Contact J1YAI"
    className="fixed bottom-28 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6"
  >
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-link"
      aria-label={`Chat with J1YAI on WhatsApp at ${CONTACT_PHONE_DISPLAY}`}
      title="Chat on WhatsApp"
      className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_14px_36px_-10px_rgba(16,185,129,0.75)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className={tooltipClass}>Chat on WhatsApp</span>
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
    <a
      href={`tel:${CONTACT_PHONE}`}
      data-testid="floating-call-link"
      aria-label={`Call J1YAI at ${CONTACT_PHONE_DISPLAY}`}
      title="Call J1YAI"
      className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_14px_36px_-10px_rgba(34,211,238,0.75)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className={tooltipClass}>Call J1YAI</span>
      <Phone className="h-6 w-6" aria-hidden="true" />
    </a>
  </aside>
);

export default FloatingContactActions;
