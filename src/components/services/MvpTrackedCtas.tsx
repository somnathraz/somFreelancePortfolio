"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { MVP_WHATSAPP_MESSAGE, telUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type TrackedBookCallButtonProps = {
  label?: string;
  className?: string;
  location: string;
};

export function TrackedBookCallButton({
  label = "Discuss Your Requirements With an Engineer",
  className,
  location,
}: TrackedBookCallButtonProps) {
  return (
    <Link
      href="/contact"
      onClick={() =>
        trackEvent("book_call_click", {
          event_category: "engagement",
          event_label: location,
        })
      }
      className={cn(
        "inline-flex h-12 min-w-[220px] items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black transition-colors hover:bg-zinc-200",
        className
      )}
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

type TrackedWhatsAppButtonProps = {
  className?: string;
  location: string;
};

export function TrackedWhatsAppButton({ className, location }: TrackedWhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl(MVP_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("whatsapp_click", {
          event_category: "engagement",
          event_label: location,
        })
      }
      className={cn(
        "inline-flex h-12 min-w-[220px] items-center justify-center rounded-md border border-white/10 bg-transparent px-6 text-base font-medium text-white transition-colors hover:bg-white/5",
        className
      )}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Discuss your project on WhatsApp
    </a>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const iconBtnClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform active:scale-[0.96]";

/** Mobile-only floating CTAs — ads page has no site bottom nav. */
export function MvpMobileStickyCtas() {
  return (
    <div className="fixed inset-x-4 bottom-5 z-[490] flex items-center gap-2 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-white/10 bg-zinc-950/95 px-3 py-2.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md">
        <div className="min-w-0 flex-1 pr-2">
          <p className="truncate text-xs font-semibold text-white">
            Building a SaaS or web app?
          </p>
          <p className="truncate text-[10px] text-zinc-500">
            Talk to the engineer — not a sales desk
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telUrl()}
            aria-label="Call Somanath now"
            onClick={() =>
              trackEvent("phone_click", {
                event_category: "engagement",
                event_label: "mvp_mobile_sticky",
              })
            }
            className="flex flex-col items-center gap-1"
          >
            <span
              className={cn(
                iconBtnClass,
                "bg-white text-black shadow-[0_6px_20px_-8px_rgba(255,255,255,0.35)]"
              )}
            >
              <Phone className="h-4 w-4" />
            </span>
            <span className="text-[9px] font-medium text-zinc-400">Call</span>
          </a>
          <a
            href={whatsappUrl(MVP_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onClick={() =>
              trackEvent("whatsapp_click", {
                event_category: "engagement",
                event_label: "mvp_mobile_sticky",
              })
            }
            className="flex flex-col items-center gap-1"
          >
            <span
              className={cn(
                iconBtnClass,
                "bg-[#25D366] text-white shadow-[0_6px_20px_-8px_rgba(37,211,102,0.55)]"
              )}
            >
              <WhatsAppGlyph className="h-5 w-5" />
            </span>
            <span className="text-[9px] font-medium text-zinc-400">WhatsApp</span>
          </a>
          <Link
            href="/book"
            aria-label="Book a strategy call"
            onClick={() =>
              trackEvent("book_call_click", {
                event_category: "engagement",
                event_label: "mvp_mobile_sticky",
              })
            }
            className="flex flex-col items-center gap-1"
          >
            <span
              className={cn(
                iconBtnClass,
                "border border-white/15 bg-zinc-900 text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]"
              )}
            >
              <Calendar className="h-4 w-4" />
            </span>
            <span className="text-[9px] font-medium text-zinc-400">Book</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
