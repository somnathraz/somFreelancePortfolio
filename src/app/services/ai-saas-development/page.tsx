import type { Metadata } from "next";
import { AiSaasDevelopmentClient } from "@/components/services/AiSaasDevelopmentClient";

export const metadata: Metadata = {
  title: "AI SaaS Development for Founders | Somanath Studio",
  description:
    "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation. Product-focused AI development for founders and startup teams.",
  alternates: {
    canonical: "/services/ai-saas-development",
  },
  openGraph: {
    title: "AI SaaS Development for Founders | Somanath Studio",
    description:
      "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation.",
    url: "/services/ai-saas-development",
    type: "website",
    images: [
      {
        url: "/og?title=AI%20SaaS%20Development",
        width: 1200,
        height: 630,
        alt: "AI SaaS Development for Founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaS Development for Founders | Somanath Studio",
    description:
      "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation.",
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
      logo: "https://somanathkhadanga.com/icon.svg",
    },
    areaServed: "Worldwide",
    url: "https://somanathkhadanga.com/services/ai-saas-development",
    inLanguage: "en",
    description:
      "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation. Product-focused AI development for founders and startup teams.",
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
