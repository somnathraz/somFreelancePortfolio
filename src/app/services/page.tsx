import type { Metadata } from "next";
import { ServicesIndexClient } from "@/components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "SaaS Engineering Services for Founders and Agencies",
  description:
    "Senior-led SaaS engineering services: MVP development, custom software, Next.js performance, production readiness, and AI SaaS — with specialists added as needed.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "SaaS Engineering Services for Founders and Agencies",
    description:
      "Senior-led SaaS engineering services with flexible delivery capacity for founders and agencies.",
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
    title: "SaaS Engineering Services for Founders and Agencies",
    description:
      "Senior-led SaaS engineering services with flexible delivery capacity for founders and agencies.",
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
          "SaaS engineering for founders: production-ready MVP builds, Next.js 16 optimization, vibe-coded MVP audits, and AI feature development.",
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
