"use client";

import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";
import { cn } from "@/lib/utils";
import { Bot, X, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── nudge content map ─── */
type NudgeContent = { message: string; cta: string };

const SECTION_NUDGES: Record<string, NudgeContent> = {
  hero: {
    message:
      "Hi! I\u2019m Archon \u2014 Som\u2019s AI assistant. I can help you find the right service for your project.",
    cta: "Let\u2019s explore",
  },
  services: {
    message:
      "Looking at services? I can recommend the best fit based on your goals.",
    cta: "Guide me",
  },
  "explore-services": {
    message:
      "Looking at services? I can recommend the best fit based on your goals.",
    cta: "Guide me",
  },
  work: {
    message:
      "Want to see relevant case studies? I can filter projects by your use case.",
    cta: "Show me",
  },
  testimonials: {
    message:
      "Ready to discuss your project? I can check Som\u2019s availability.",
    cta: "Check slots",
  },
  process: {
    message:
      "Ready to discuss your project? I can check Som\u2019s availability.",
    cta: "Check slots",
  },
  contact: {
    message:
      "I can help you prepare a quick brief before booking \u2014 it makes the call more productive.",
    cta: "Start brief",
  },
  enquire: {
    message:
      "I can help you prepare a quick brief before booking \u2014 it makes the call more productive.",
    cta: "Start brief",
  },
};

const DEFAULT_NUDGE: NudgeContent = {
  message:
    "I\u2019m Archon, an AI guide built by Somanath. I can help you build your MVP, improve your app, or find the right service.",
  cta: "Talk to me",
};

const MAX_NUDGES = 3;
const NUDGE_SESSION_KEY = "archon_nudge_count";

/* ─── helpers ─── */
function getNudgeCount(): number {
  if (typeof sessionStorage === "undefined") return 0;
  return parseInt(sessionStorage.getItem(NUDGE_SESSION_KEY) || "0", 10);
}
function incrementNudgeCount() {
  if (typeof sessionStorage === "undefined") return;
  const count = getNudgeCount() + 1;
  sessionStorage.setItem(NUDGE_SESSION_KEY, String(count));
}

function detectSection(): string | null {
  if (typeof document === "undefined") return null;
  const sections = [
    "hero",
    "services",
    "explore-services",
    "work",
    "testimonials",
    "process",
    "contact",
    "enquire",
    "who-i-work-with",
    "tech-stack",
    "latest-posts",
  ];

  // Use scroll position to detect which section the viewport is in
  const scrollY = window.scrollY;
  const viewportH = window.innerHeight;
  const midpoint = scrollY + viewportH * 0.45;

  let closest: string | null = null;
  let closestDist = Infinity;

  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const elTop = rect.top + scrollY;
    const elMid = elTop + rect.height / 2;
    const dist = Math.abs(midpoint - elMid);
    if (dist < closestDist) {
      closestDist = dist;
      closest = id;
    }
  }

  return closest;
}

/* ─── component ─── */
export function HelperLauncher() {
  const { buttonVisible, isOpen, dismissed, open } = useHelperStore();
  const hasTrackedView = useRef(false);

  // Nudge state
  const [nudge, setNudge] = useState<NudgeContent | null>(null);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const lastSection = useRef<string | null>(null);
  const sectionTimer = useRef<number | null>(null);
  const introTimerFired = useRef(false);

  useEffect(() => {
    if (buttonVisible && !hasTrackedView.current) {
      hasTrackedView.current = true;
      helperAnalytics.launcherViewed();
    }
  }, [buttonVisible]);

  /* ── show nudge (guarded) ── */
  const showNudge = useCallback(
    (content: NudgeContent) => {
      if (isOpen || dismissed) return;
      if (getNudgeCount() >= MAX_NUDGES) return;
      setNudge(content);
      setNudgeVisible(true);
    },
    [isOpen, dismissed]
  );

  /* ── close nudge ── */
  const closeNudge = useCallback(() => {
    setNudgeVisible(false);
    incrementNudgeCount();
    setTimeout(() => setNudge(null), 300); // wait for fade-out
  }, []);

  /* ── intro nudge (8s after mount) ── */
  useEffect(() => {
    if (!buttonVisible || dismissed || isOpen || introTimerFired.current) return;
    const timer = window.setTimeout(() => {
      introTimerFired.current = true;
      const section = detectSection();
      const content = section ? SECTION_NUDGES[section] || DEFAULT_NUDGE : DEFAULT_NUDGE;
      showNudge(content);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [buttonVisible, dismissed, isOpen, showNudge]);

  /* ── section tracking (scroll-based, throttled) ── */
  useEffect(() => {
    if (!buttonVisible || dismissed) return;

    const handleScroll = () => {
      const section = detectSection();
      if (!section || section === lastSection.current) return;
      lastSection.current = section;

      // If nudge is currently showing, don't re-nudge
      if (nudgeVisible) return;
      if (getNudgeCount() >= MAX_NUDGES) return;

      // Clear any existing section timer
      if (sectionTimer.current) window.clearTimeout(sectionTimer.current);

      sectionTimer.current = window.setTimeout(() => {
        if (isOpen) return;
        const content = SECTION_NUDGES[section] || DEFAULT_NUDGE;
        showNudge(content);
      }, 5000);
    };

    // Throttle scroll
    let ticking = false;
    const throttled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", throttled, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttled);
      if (sectionTimer.current) window.clearTimeout(sectionTimer.current);
    };
  }, [buttonVisible, dismissed, isOpen, nudgeVisible, showNudge]);

  /* ── exit intent nudge (desktop) ── */
  useEffect(() => {
    if (!buttonVisible || dismissed) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      if (isOpen || nudgeVisible) return;
      if (getNudgeCount() >= MAX_NUDGES) return;
      showNudge(DEFAULT_NUDGE);
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [buttonVisible, dismissed, isOpen, nudgeVisible, showNudge]);

  /* ── hide nudge when panel opens ── */
  useEffect(() => {
    if (isOpen && nudgeVisible) {
      setNudgeVisible(false);
      setTimeout(() => setNudge(null), 200);
    }
  }, [isOpen, nudgeVisible]);

  if (!buttonVisible || dismissed || isOpen) return null;

  const handleClick = () => {
    open();
    helperAnalytics.opened("manual");
  };

  const handleNudgeCTA = () => {
    closeNudge();
    open();
    helperAnalytics.opened("manual");
  };

  return (
    <>
      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes archon-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes archon-pulse-ring {
              0% { transform: scale(1); opacity: 0.45; }
              70% { transform: scale(1.6); opacity: 0; }
              100% { transform: scale(1.6); opacity: 0; }
            }
            @keyframes archon-nudge-in {
              0% { opacity: 0; transform: translateY(8px) scale(0.97); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes archon-nudge-out {
              0% { opacity: 1; transform: translateY(0) scale(1); }
              100% { opacity: 0; transform: translateY(8px) scale(0.97); }
            }
          `,
        }}
      />

      <div className="relative pointer-events-auto">
        {/* ── Nudge Tooltip ── */}
        {nudge && (
          <div
            className={cn(
              "absolute right-0 w-[260px] rounded-xl border border-white/10 bg-zinc-900/95 p-3.5 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md",
              nudgeVisible
                ? "[animation:archon-nudge-in_0.35s_ease-out_forwards]"
                : "[animation:archon-nudge-out_0.25s_ease-in_forwards]"
            )}
            style={{ bottom: "calc(100% + 14px)" }}
          >
            {/* Tail arrow */}
            <div className="absolute -bottom-[6px] right-5 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-zinc-900/95" />

            {/* Close button */}
            <button
              type="button"
              onClick={closeNudge}
              className="absolute right-2 top-2 rounded-md p-0.5 text-zinc-600 transition-colors hover:bg-white/5 hover:text-zinc-300"
              aria-label="Close nudge"
            >
              <X className="h-3 w-3" />
            </button>

            {/* Content */}
            <p className="pr-5 text-[12px] leading-relaxed text-zinc-300">
              {nudge.message}
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={handleNudgeCTA}
              className="mt-2.5 inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-black transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
            >
              {nudge.cta}
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* ── Avatar Bubble ── */}
        <button
          type="button"
          onClick={handleClick}
          className="group relative flex h-[48px] w-[48px] items-center justify-center rounded-full shadow-[0_8px_32px_-8px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.5)] active:scale-[0.95] md:h-[56px] md:w-[56px]"
          style={{ animation: "archon-float 3s ease-in-out infinite" }}
          aria-label="Open Archon AI assistant"
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-emerald-400/30"
            style={{ animation: "archon-pulse-ring 2.5s ease-out infinite" }}
          />

          {/* Gradient background */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400" />

          {/* Icon */}
          <Bot className="relative z-10 h-5 w-5 text-white md:h-6 md:w-6" />

          {/* Online indicator dot */}
          <span className="absolute bottom-0.5 right-0.5 z-10 h-[9px] w-[9px] rounded-full border-[1.5px] border-zinc-950 bg-green-400 md:h-[10px] md:w-[10px]" />
        </button>
      </div>
    </>
  );
}
