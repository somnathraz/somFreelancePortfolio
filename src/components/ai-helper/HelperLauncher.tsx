"use client";

import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function HelperLauncher() {
  const { buttonVisible, isOpen, dismissed, open, close } = useHelperStore();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (buttonVisible && !hasTrackedView.current) {
      hasTrackedView.current = true;
      helperAnalytics.launcherViewed();
    }
  }, [buttonVisible]);

  if (!buttonVisible || dismissed) return null;

  const handleClick = () => {
    if (isOpen) {
      close();
    } else {
      open();
      helperAnalytics.opened("manual");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 active:scale-[0.97]",
        isOpen
          ? "border-emerald-400/30 bg-zinc-900/95"
          : "border-white/15 bg-zinc-950/95 hover:border-emerald-400/20 hover:bg-zinc-900/95"
      )}
      aria-label={isOpen ? "Close helper" : "Open helper"}
      aria-expanded={isOpen}
    >
      <Sparkles
        className={cn(
          "h-4 w-4 transition-colors duration-300",
          isOpen ? "text-emerald-400" : "text-emerald-300"
        )}
      />
      <span className="hidden sm:inline">Find the right service</span>
      <span className="sm:hidden">Help</span>
    </button>
  );
}
