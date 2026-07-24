import type { Metadata } from "next";
import { AiSaasDevelopmentClient } from "@/components/services/AiSaasDevelopmentClient";
import { siteLogoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI SaaS Development Services for Startups | Somanath Studio",
  description:
    "AI SaaS development services for startups: agents, RAG, copilots, and production-ready AI features led by experienced engineers.",
  alternates: {
    canonical: "/services/ai-saas-development",
  },
  openGraph: {
    title: "AI SaaS Development Services for Startups | Somanath Studio",
    description:
      "Practical AI SaaS features: agents, copilots, and semantic search — built for production use, not demos.",
    url: "/services/ai-saas-development",
    type: "website",
    images: [
      {
        url: "/og?title=AI%20SaaS%20Development",
        width: 1200,
        height: 630,
        alt: "AI SaaS Development Services for Startups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaS Development Services for Startups | Somanath Studio",
    description:
      "Practical AI SaaS features: agents, copilots, and semantic search — built for production use, not demos.",
    images: ["/og?title=AI%20SaaS%20Development"],
  },
};

export default function AiSaasDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI SaaS Development",
    serviceType: "AI SaaS Development",
    provider: {
      "@type": "Organization",
      "@id": "https://somanathkhadanga.com/#organization",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      logo: siteLogoUrl,
    },
    areaServed: "Worldwide",
    url: "https://somanathkhadanga.com/services/ai-saas-development",
    inLanguage: "en",
    description:
      "Practical AI SaaS features for founders: MCP servers, AI agents, copilots, and semantic search. Built to work in production, not just demos.",
    keywords: "AI SaaS development, MCP server development, AI agents, AI copilot, semantic search, RAG, AI features for SaaS, AI product for founders, build AI SaaS 2026",
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
        name: "AI SaaS Development",
        item: "https://somanathkhadanga.com/services/ai-saas-development",
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
      <AiSaasDevelopmentClient />
    </>
  );
}
