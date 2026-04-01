import type { Metadata } from "next";
import { SaasMvpDevelopmentClient } from "@/components/services/SaasMvpDevelopmentClient";

export const metadata: Metadata = {
  title: "SaaS MVP Development for Founders | Somanath Studio",
  description:
    "Launch your SaaS MVP fast with clean architecture, strong UX, and production-minded engineering. I help founders build MVPs that are ready to grow.",
  alternates: {
    canonical: "/services/saas-mvp-development",
  },
  openGraph: {
    title: "SaaS MVP Development for Founders | Somanath Studio",
    description:
      "Launch your SaaS MVP fast with clean architecture, strong UX, and production-minded engineering.",
    url: "/services/saas-mvp-development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS MVP Development for Founders | Somanath Studio",
    description:
      "Launch your SaaS MVP fast with clean architecture, strong UX, and production-minded engineering.",
  },
};

export default function SaaSMvpDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SaaS MVP Development",
    serviceType: "SaaS MVP Development",
    provider: {
      "@type": "Organization",
      name: "Somanath Studio",
      url: "https://www.somanathkhadanga.com",
    },
    areaServed: "Worldwide",
    url: "https://www.somanathkhadanga.com/services/saas-mvp-development",
    description:
      "Launch your SaaS MVP fast with clean architecture, strong UX, and production-minded engineering.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can you build an MVP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timeline depends on scope, but the focus is shipping the smallest version that solves a real user problem instead of overbuilding version one.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help with product planning too?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. I help shape scope, decide what belongs in the MVP, and avoid technical choices that create expensive rework.",
        },
      },
      {
        "@type": "Question",
        name: "Do you only work with SaaS founders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mostly, yes. This service is designed for SaaS founders and startup teams building or validating product ideas.",
        },
      },
      {
        "@type": "Question",
        name: "Can you improve the product after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. I can continue with performance improvements, production-readiness upgrades, feature development, and technical guidance after the MVP is live.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SaasMvpDevelopmentClient />
    </>
  );
}
