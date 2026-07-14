"use client";

import React, { useEffect, useState } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { HelperLauncher } from "./HelperLauncher";
import { HelperPanel } from "./HelperPanel";
import { useHelperAutoOpen } from "./HelperAutoOpen";

export function SiteHelper() {
  const { initFromMemory, isOpen, buttonVisible, dismissed } = useHelperStore();
  const [mounted, setMounted] = useState(false);

  // Initialize store from localStorage on mount
  useEffect(() => {
    initFromMemory();
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [initFromMemory]);

  // Activate inactivity, scroll, and exit intent triggers
  useHelperAutoOpen();

  // Prevent server-side rendering and client-side hydration mismatch
  if (!mounted) return null;

  // Don't render container if helper is dismissed or button is not visible
  if (dismissed || (!buttonVisible && !isOpen)) return null;

  return (
    <div className="pointer-events-none fixed bottom-[7.5rem] right-4 z-[480] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* On desktop, HelperPanel renders inline. On mobile, it renders as a portal drawer */}
      <HelperPanel />
      <HelperLauncher />
    </div>
  );
}
