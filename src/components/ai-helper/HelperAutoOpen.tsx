"use client";

import { useCallback, useEffect, useRef } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Hook that manages auto-open triggers for the page helper.
 *
 * Triggers:
 * - Inactivity timer (18s desktop / 25s mobile)
 * - 60% scroll depth without CTA click
 * - Exit intent (desktop only, cursor leaves viewport top)
 *
 * Guards:
 * - Never auto-opens after session dismissal
 * - Never auto-opens twice
 * - Never auto-opens for returning visitors (shows button only)
 * - Never auto-opens while booking form or modal is active
 */
export function useHelperAutoOpen() {
  const { dismissed, isOpen, open, showButton, isReturningVisitor } =
    useHelperStore();

  const autoOpened = useRef(false);
  const ctaClicked = useRef(false);
  const reached60 = useRef(false);
  const idleTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<"up" | "down" | null>(null);
  const directionChanges = useRef(0);

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
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
      if (isFormActive()) return;
      if (sessionStorage.getItem("helper_dismissed") === "1") return;

      autoOpened.current = true;
      open();
      helperAnalytics.opened("auto", reason);
    },
    [dismissed, isReturningVisitor, isFormActive, open]
  );

  const resetIdle = useCallback(() => {
    clearIdle();
    if (dismissed || autoOpened.current) return;
    if (sessionStorage.getItem("helper_dismissed") === "1") return;

    const delay = isMobile() ? 25000 : 18000;
    idleTimer.current = window.setTimeout(() => {
      tryAutoOpen("inactivity");
    }, delay);
  }, [clearIdle, dismissed, tryAutoOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed) return;
    if (sessionStorage.getItem("helper_dismissed") === "1") return;

    // Returning visitors: show button only, no auto-open
    if (isReturningVisitor) {
      showButton();
      return;
    }

    // Start inactivity timer
    resetIdle();

    const onActivity = () => {
      if (!isReturningVisitor) resetIdle();
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
      onActivity();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dir: "up" | "down" = y > lastScrollY.current ? "down" : "up";

      // Detect scroll thrashing (4+ direction changes)
      if (lastDirection.current && dir !== lastDirection.current) {
        directionChanges.current += 1;
        if (directionChanges.current >= 4) {
          tryAutoOpen("scroll_thrash");
        }
      }
      lastDirection.current = dir;
      lastScrollY.current = y;

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

      onActivity();
    };

    const onExitIntent = (e: MouseEvent) => {
      // Desktop only: cursor leaves viewport from top edge
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
  }, [
    clearIdle,
    dismissed,
    isReturningVisitor,
    isOpen,
    open,
    resetIdle,
    showButton,
    tryAutoOpen,
  ]);
}
