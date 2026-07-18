import type { Metadata } from "next";
import { ProductionReadinessClient } from "@/components/services/ProductionReadinessClient";
import { siteLogoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Production Readiness Upgrade for SaaS | Somanath Studio",
  description:
    "Turn a fragile MVP — including vibe-coded and AI-built products — into production-ready SaaS with stronger architecture, real security, and stable delivery.",
  alternates: {
    canonical: "/services/production-readiness-upgrade",
  },
  openGraph: {
    title: "Production Readiness Upgrade for SaaS | Somanath Studio",
    description:
      "Turn a fragile MVP — including vibe-coded and AI-built products — into production-ready SaaS with real security and stable delivery.",
    url: "/services/production-readiness-upgrade",
    type: "website",
    images: [
      {
        url: "/og?title=Production%20Readiness%20Upgrade",
        width: 1200,
        height: 630,
        alt: "Production Readiness Upgrade for SaaS MVPs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Readiness Upgrade for SaaS | Somanath Studio",
    description:
      "Turn a fragile MVP — including vibe-coded and AI-built products — into production-ready SaaS with real security and stable delivery.",
    images: ["/og?title=Production%20Readiness%20Upgrade"],
  },
};

export default function ProductionReadinessPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Production Readiness Upgrade",
    serviceType: "Production Readiness Upgrade",
    provider: {
      "@type": "Organization",
      "@id": "https://somanathkhadanga.com/#organization",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      logo: siteLogoUrl,
    },
    areaServed: "Worldwide",
    url: "https://somanathkhadanga.com/services/production-readiness-upgrade",
    inLanguage: "en",
    description:
      "Turn a fragile MVP — including vibe-coded and AI-built products — into production-ready SaaS with stronger architecture, real security, and stable delivery.",
    keywords: "production readiness upgrade, SaaS production ready, vibe-coded MVP audit, AI-built MVP review, Cursor MVP security, MVP technical debt, fragile MVP fix, SaaS security audit",
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
        name: "Production Readiness Upgrade",
        item: "https://somanathkhadanga.com/services/production-readiness-upgrade",
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
      <ProductionReadinessClient />
    </>
  );
}
