"use client";

import { Suspense } from "react";
import { AnalyticsPageViews } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsPageViews />
      </Suspense>
      {children}
    </>
  );
}
