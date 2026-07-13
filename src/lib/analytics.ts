"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function withGtag(run: (gtag: NonNullable<Window["gtag"]>) => void) {
  if (!GA_ID || typeof window === "undefined") return;

  if (window.gtag) {
    run(window.gtag);
    return;
  }

  // Inline GA boot may still be pending afterInteractive — retry briefly.
  let attempts = 0;
  const id = window.setInterval(() => {
    attempts += 1;
    if (window.gtag) {
      window.clearInterval(id);
      run(window.gtag);
      return;
    }
    if (attempts >= 40) window.clearInterval(id);
  }, 50);
}

export function trackPageView(url: string) {
  withGtag((gtag) => {
    gtag("config", GA_ID, { page_path: url });
  });
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  withGtag((gtag) => {
    gtag("event", action, params);
  });
}

/** Fires on App Router client navigations */
export function AnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
