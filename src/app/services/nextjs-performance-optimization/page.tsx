import type { Metadata } from "next";
import { NextjsPerformanceClient } from "@/components/services/NextjsPerformanceClient";

export const metadata: Metadata = {
    title: "Next.js Performance Optimization for SaaS | Somanath Studio",
    description:
        "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product. Practical optimization focused on real user experience — LCP, INP, CLS, and page speed.",
    alternates: {
        canonical: "/services/nextjs-performance-optimization",
    },
    openGraph: {
        title: "Next.js Performance Optimization for SaaS | Somanath Studio",
        description:
            "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product.",
        url: "/services/nextjs-performance-optimization",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Performance Optimization for SaaS | Somanath Studio",
        description:
            "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product.",
    },
};

export default function NextjsPerformancePage() {
    return <NextjsPerformanceClient />;
}
