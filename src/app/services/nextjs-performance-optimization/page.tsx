import type { Metadata } from "next";
import { NextjsPerformanceClient } from "@/components/services/NextjsPerformanceClient";
import { siteLogoUrl } from "@/lib/site";
import { faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Next.js Performance Optimization Services | Somanath Studio",
    description:
        "Next.js performance optimization without a full rewrite. Core Web Vitals, App Router bottlenecks, and senior-led fixes with specialists when needed.",
    alternates: {
        canonical: "/services/nextjs-performance-optimization",
    },
    openGraph: {
        title: "Next.js Performance Optimization Services | Somanath Studio",
        description:
            "Fix slow Next.js pages and Core Web Vitals issues without rewriting everything.",
        url: "/services/nextjs-performance-optimization",
        type: "website",
        images: [
            {
                url: "/og?title=Next.js%20Performance%20Optimization",
                width: 1200,
                height: 630,
                alt: "Next.js Performance Optimization Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Performance Optimization Services | Somanath Studio",
        description:
            "Fix slow Next.js pages and Core Web Vitals issues without rewriting everything.",
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
            logo: siteLogoUrl,
        },
        areaServed: "Worldwide",
        url: "https://somanathkhadanga.com/services/nextjs-performance-optimization",
        inLanguage: "en",
        description:
            "Fix slow Next.js 16 pages, poor Core Web Vitals, and App Router bottlenecks. LCP, INP, and React Compiler evaluation included.",
        keywords: "Next.js performance optimization, Next.js 16, Core Web Vitals, LCP INP CLS, App Router performance, React Compiler, SaaS performance, slow Next.js app",
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

    const faqJsonLd = faqPageJsonLd([
        {
            question: "Do you only optimize Next.js apps?",
            answer:
                "Mostly, yes. This page is built for Next.js products, but the same performance mindset applies to React-based SaaS products too.",
        },
        {
            question: "Can you help if the app is already live?",
            answer:
                "Yes — this is especially useful for live products that have grown messy, slow, or harder to scale.",
        },
        {
            question: "Will this require a full rewrite?",
            answer:
                "Usually not. In many cases the biggest wins come from focused improvements, not starting over from scratch.",
        },
        {
            question: "Do you look at backend issues too?",
            answer:
                "Yes. If slow APIs, inefficient queries, or bad data-fetching patterns are contributing to the experience, I look at those too.",
        },
        {
            question: "Is this mainly for Lighthouse scores?",
            answer:
                "No. Better scores can be useful, but the main goal is a faster, smoother experience for real users. The score is a byproduct.",
        },
    ]);

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <NextjsPerformanceClient />
        </>
    );
}
