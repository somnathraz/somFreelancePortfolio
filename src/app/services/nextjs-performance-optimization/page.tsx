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
        images: [
            {
                url: "/og?title=Next.js%20Performance%20Optimization",
                width: 1200,
                height: 630,
                alt: "Next.js Performance Optimization for SaaS",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Performance Optimization for SaaS | Somanath Studio",
        description:
            "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product.",
        images: ["/og?title=Next.js%20Performance%20Optimization"],
    },
};

export default function NextjsPerformancePage() {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Next.js Performance Optimization",
        serviceType: "Next.js Performance Optimization",
        provider: {
            "@type": "Organization",
            "@id": "https://somanathkhadanga.com/#organization",
            name: "Somanath Studio",
            url: "https://somanathkhadanga.com",
            logo: "https://somanathkhadanga.com/icon.svg",
        },
        areaServed: "Worldwide",
        url: "https://somanathkhadanga.com/services/nextjs-performance-optimization",
        inLanguage: "en",
        description:
            "Fix slow pages, poor Core Web Vitals, and frontend/backend bottlenecks in your Next.js SaaS product.",
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://somanathkhadanga.com/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://somanathkhadanga.com/services",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Next.js Performance Optimization",
                item: "https://somanathkhadanga.com/services/nextjs-performance-optimization",
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <NextjsPerformanceClient />
        </>
    );
}
