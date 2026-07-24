import type { Metadata } from "next";
import { ProductionReadinessClient } from "@/components/services/ProductionReadinessClient";
import { siteLogoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "SaaS Production Readiness Audit & Upgrade | Somanath Studio",
  description:
    "SaaS production readiness audit and remediation for fragile MVPs — architecture risks, security, performance, deployment, and monitoring.",
  alternates: {
    canonical: "/services/production-readiness-upgrade",
  },
  openGraph: {
    title: "SaaS Production Readiness Audit & Upgrade | Somanath Studio",
    description:
      "Find and fix what could break before your SaaS scales — audit first, then remediate.",
    url: "/services/production-readiness-upgrade",
    type: "website",
    images: [
      {
        url: "/og?title=Production%20Readiness%20Audit",
        width: 1200,
        height: 630,
        alt: "SaaS Production Readiness Audit & Upgrade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Production Readiness Audit & Upgrade | Somanath Studio",
    description:
      "Find and fix what could break before your SaaS scales — audit first, then remediate.",
    images: ["/og?title=Production%20Readiness%20Audit"],
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
