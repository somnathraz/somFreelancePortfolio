"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SESSION_DISMISSED_KEY = "mvp_helper_dismissed";
const SESSION_SEEN_KEY = "mvp_helper_seen";
const VISIT_KEY = "mvp_helper_visit_count";

type IntentId =
  | "saas-mvp"
  | "improve-product"
  | "ai-features"
  | "previous-work"
  | "book-call";

type HelperAction = {
  id: IntentId;
  label: string;
  sectionId: string;
  message: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  bookHref?: string;
};

const INTENTS: HelperAction[] = [
  {
    id: "saas-mvp",
    label: "I want to build a SaaS MVP",
    sectionId: "saas-mvp",
    message: "Here’s how I help founders turn an idea into a working SaaS product.",
    secondaryHref: "#proof",
    secondaryLabel: "See shipped products",
    bookHref: "#enquire",
  },
  {
    id: "improve-product",
    label: "I want to improve an existing product",
    sectionId: "improve-product",
    message: "I harden fragile MVPs — architecture, performance, and production readiness.",
    secondaryHref: "/services/production-readiness-upgrade",
    secondaryLabel: "Production readiness",
    bookHref: "#enquire",
  },
  {
    id: "ai-features",
    label: "I want to add AI features",
    sectionId: "stack",
    message: "Practical AI in your product — not demos. See the stack, then talk scope.",
    secondaryHref: "/services/ai-saas-development",
    secondaryLabel: "AI SaaS service",
    bookHref: "#enquire",
  },
  {
    id: "previous-work",
    label: "I want to see your previous work",
    sectionId: "proof",
    message: "These live products are the closest examples of my product-development work.",
    secondaryHref: "/projects/paperchai",
    secondaryLabel: "PaperChai case study",
    bookHref: "#enquire",
  },
  {
    id: "book-call",
    label: "I want to book a call",
    sectionId: "enquire",
    message: "Pick a time or send requirements — I reply within one business day.",
    bookHref: "/book",
  },
];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function highlightSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.setAttribute("data-helper-highlight", "true");
  window.setTimeout(() => {
    el.removeAttribute("data-helper-highlight");
  }, 2800);
}

export function MvpPageHelper() {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<HelperAction | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const ctaClicked = useRef(false);
  const lastScrollY = useRef(0);
  const directionChanges = useRef(0);
  const lastDirection = useRef<"up" | "down" | null>(null);
  const idleTimer = useRef<number | null>(null);
  const autoOpened = useRef(false);
  const reached60 = useRef(false);
  const isReturning = useRef(false);

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const tryAutoOpen = useCallback(
    (reason: string) => {
      if (dismissed || autoOpened.current || isReturning.current) return;
      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") return;
      autoOpened.current = true;
      setButtonVisible(true);
      setOpen(true);
      trackEvent("helper_auto_open", {
        event_category: "helper",
        event_label: reason,
      });
    },
    [dismissed]
  );

  const showButtonOnly = useCallback(() => {
    if (dismissed) return;
    if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") return;
    setButtonVisible(true);
  }, [dismissed]);

  const resetIdle = useCallback(() => {
    clearIdle();
    if (dismissed || autoOpened.current) return;
    if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") return;

    const delay = isMobile() ? 25000 : 18000;
    idleTimer.current = window.setTimeout(() => {
      tryAutoOpen("inactivity");
    }, delay);
  }, [clearIdle, dismissed, tryAutoOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") {
      setDismissed(true);
      return;
    }

    const visits = Number(localStorage.getItem(VISIT_KEY) || "0") + 1;
    localStorage.setItem(VISIT_KEY, String(visits));
    isReturning.current = visits > 1;

    // Returning visitors: button visible, no auto-open
    if (isReturning.current) {
      setButtonVisible(true);
    } else {
      resetIdle();
    }

    sessionStorage.setItem(SESSION_SEEN_KEY, "1");

    const onActivity = () => {
      if (!isReturning.current) resetIdle();
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a[href="/book"], a[href="#enquire"], a[href="#project-form"], [data-helper-cta]'
        )
      ) {
        ctaClicked.current = true;
      }
      onActivity();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dir: "up" | "down" = y > lastScrollY.current ? "down" : "up";
      if (lastDirection.current && dir !== lastDirection.current) {
        directionChanges.current += 1;
        if (directionChanges.current >= 4) {
          tryAutoOpen("scroll_thrash");
        }
      }
      lastDirection.current = dir;
      lastScrollY.current = y;

      const doc = document.documentElement;
      const depth = (y + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (depth >= 0.6) reached60.current = true;
      if (isMobile() && depth >= 0.5) {
        showButtonOnly();
      }
      if (reached60.current && !ctaClicked.current) {
        tryAutoOpen("deep_scroll_no_cta");
      }

      onActivity();
    };

    const onExitIntent = (e: MouseEvent) => {
      // Top-edge exit intent (desktop). Ignore bubbled child leave events.
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      tryAutoOpen("exit_intent");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseout", onExitIntent);

    return () => {
      clearIdle();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseout", onExitIntent);
    };
  }, [clearIdle, resetIdle, showButtonOnly, tryAutoOpen]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
    setDismissed(true);
    setOpen(false);
    setButtonVisible(false);
    setActive(null);
    trackEvent("helper_dismiss", {
      event_category: "helper",
      event_label: "session",
    });
  };

  const openManual = () => {
    setOpen(true);
    setButtonVisible(true);
    trackEvent("helper_opened", {
      event_category: "helper",
      event_label: "manual",
    });
  };

  const selectIntent = (intent: HelperAction) => {
    setActive(intent);
    trackEvent("helper_option_selected", {
      event_category: "helper",
      event_label: intent.id,
    });
    highlightSection(intent.sectionId);
    trackEvent("helper_section_visited", {
      event_category: "helper",
      event_label: intent.sectionId,
    });
  };

  if (dismissed && !open) return null;

  return (
    <div className="pointer-events-none fixed bottom-[7.5rem] right-4 z-[480] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {open ? (
        <div className="pointer-events-auto w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-3 border-b border-white/5 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">What are you looking for?</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                I’ll jump you to the right section.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-white"
              aria-label="Close helper"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[min(60vh,22rem)] space-y-1.5 overflow-y-auto p-3">
            {!active ? (
              INTENTS.map((intent) => (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => selectIntent(intent)}
                  className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white"
                >
                  <span>{intent.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                </button>
              ))
            ) : (
              <div className="space-y-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-sm leading-relaxed text-zinc-200">{active.message}</p>
                <div className="flex flex-col gap-2">
                  {active.secondaryHref ? (
                    <Link
                      href={active.secondaryHref}
                      data-helper-cta
                      onClick={() =>
                        trackEvent("helper_case_study_click", {
                          event_category: "helper",
                          event_label: active.id,
                        })
                      }
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 text-sm text-white hover:bg-white/5"
                    >
                      {active.secondaryLabel ?? "See more"}
                    </Link>
                  ) : null}
                  <Link
                    href={active.bookHref ?? "/book"}
                    data-helper-cta
                    onClick={() =>
                      trackEvent("helper_booking_opened", {
                        event_category: "helper",
                        event_label: active.id,
                      })
                    }
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-white text-sm font-semibold text-black hover:bg-zinc-200"
                  >
                    {active.id === "book-call" ? "Open booking" : "Book a call"}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    ← Choose something else
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
            <button
              type="button"
              onClick={dismiss}
              className="text-[11px] text-zinc-600 hover:text-zinc-400"
            >
              Don’t show again this session
            </button>
          </div>
        </div>
      ) : null}

      {buttonVisible && !dismissed ? (
        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openManual())}
          className={cn(
            "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/95 px-3.5 py-2.5 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform active:scale-[0.98]",
            open && "border-emerald-400/30"
          )}
        >
          <HelpCircle className="h-4 w-4 text-emerald-300" />
          <span className="hidden sm:inline">Need help finding something?</span>
          <span className="sm:hidden">Need help?</span>
        </button>
      ) : null}
    </div>
  );
}
