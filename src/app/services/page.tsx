import type { Metadata } from "next";
import { ServicesIndexClient } from "@/components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "Services | Somanath Studio",
  description:
    "Explore SaaS-focused services: MVP development, Next.js performance optimization, production readiness upgrades, and AI SaaS development.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Somanath Studio",
    description:
      "Explore SaaS-focused services: MVP development, Next.js performance optimization, production readiness upgrades, and AI SaaS development.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/og?title=Services",
        width: 1200,
        height: 630,
        alt: "Somanath Studio services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Somanath Studio",
    description:
      "Explore SaaS-focused services: MVP development, Next.js performance optimization, production readiness upgrades, and AI SaaS development.",
    images: ["/og?title=Services"],
  },
};

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Services",
        url: "https://somanathkhadanga.com/services",
        description:
          "Explore SaaS-focused services: MVP development, Next.js performance optimization, production readiness upgrades, and AI SaaS development.",
      },
      {
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
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesIndexClient />
    </>
  );
}
