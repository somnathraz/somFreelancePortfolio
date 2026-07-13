"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { MVP_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type TrackedBookCallButtonProps = {
  label?: string;
  className?: string;
  location: string;
};

export function TrackedBookCallButton({
  label = "Book a free 20-minute MVP call",
  className,
  location,
}: TrackedBookCallButtonProps) {
  return (
    <Link
      href="/book"
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
