"use client";

import { useCallback, useEffect, useRef } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

const AUTO_OPENED_KEY = "helper_auto_opened";
const MIN_DWELL_MS = 8000;

/**
 * Hook that manages auto-open triggers for the page helper.
 *
 * Triggers (both require MIN_DWELL_MS on page first, so a fast scroll or
 * stray cursor move on arrival never fires it):
 * - Exit intent (desktop only, cursor leaves viewport top) — the one moment
 *   someone is about to leave without converting.
 * - 60% scroll depth without a CTA click — genuine engagement with no action.
 *
 * Deliberately removed: a blind inactivity timer (reading an article for a
 * few seconds is not "stuck") and scroll-direction thrashing (not a reliable
 * intent signal, and firing a popup on a frustrated user makes it worse).
 *
 * Guards:
 * - Never auto-opens after session dismissal
 * - Never auto-opens more than once per browser session, even across fresh
 *   page loads (sessionStorage, not just an in-memory ref)
 * - Never auto-opens for returning visitors (shows button only)
 * - Never auto-opens while booking form or modal is active
 */
export function useHelperAutoOpen() {
  const { dismissed, isOpen, open, showButton, isReturningVisitor } =
    useHelperStore();

  const autoOpened = useRef(false);
  const ctaClicked = useRef(false);
  const reached60 = useRef(false);
  const arrivedAt = useRef(0);

  const alreadyAutoOpenedThisSession = useCallback(() => {
    return sessionStorage.getItem(AUTO_OPENED_KEY) === "1";
  }, []);

  const isFormActive = useCallback(() => {
    // Don't auto-open if user is interacting with a form or the booking page
    if (window.location.pathname.startsWith("/book")) return true;
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT")
    ) {
      return true;
    }
    return false;
  }, []);

  const tryAutoOpen = useCallback(
    (reason: string) => {
      if (dismissed || autoOpened.current || isReturningVisitor) return;
      if (Date.now() - arrivedAt.current < MIN_DWELL_MS) return;
      if (isFormActive()) return;
      if (sessionStorage.getItem("helper_dismissed") === "1") return;
      if (alreadyAutoOpenedThisSession()) return;

      autoOpened.current = true;
      sessionStorage.setItem(AUTO_OPENED_KEY, "1");
      open();
      helperAnalytics.opened("auto", reason);
    },
    [dismissed, isReturningVisitor, isFormActive, alreadyAutoOpenedThisSession, open]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed) return;
    if (sessionStorage.getItem("helper_dismissed") === "1") return;
    arrivedAt.current = Date.now();

    // Returning visitors: show button only, no auto-open
    if (isReturningVisitor) {
      showButton();
      return;
    }

    if (alreadyAutoOpenedThisSession()) return;

    const onScroll = () => {
      const y = window.scrollY;

      // Check scroll depth
      const doc = document.documentElement;
      const depth =
        (y + window.innerHeight) / Math.max(doc.scrollHeight, 1);

      if (depth >= 0.6) reached60.current = true;

      // Mobile: show button at 50% scroll
      if (isMobile() && depth >= 0.5) {
        showButton();
      }

      // Deep scroll without CTA click
      if (reached60.current && !ctaClicked.current) {
        tryAutoOpen("deep_scroll_no_cta");
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a[href="/book"], a[href="#enquire"], a[href="#contact"], [data-helper-cta]'
        )
      ) {
        ctaClicked.current = true;
      }
    };

    const onExitIntent = (e: MouseEvent) => {
      // Desktop only: cursor leaves viewport from top edge
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      tryAutoOpen("exit_intent");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    document.addEventListener("mouseout", onExitIntent);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseout", onExitIntent);
    };
  }, [
    dismissed,
    isReturningVisitor,
    isOpen,
    open,
    showButton,
    tryAutoOpen,
    alreadyAutoOpenedThisSession,
  ]);
}
