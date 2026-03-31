import type { Metadata } from "next";
import { NextjsPerformanceClient } from "@/components/services/NextjsPerformanceClient";

export const metadata: Metadata = {
    title: "Next.js Performance Optimization for SaaS | Somanath Studio",
    description:
        "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product. Practical optimization focused on real user experience — LCP, INP, CLS, and page speed.",
};

export default function NextjsPerformancePage() {
    return <NextjsPerformanceClient />;
}
