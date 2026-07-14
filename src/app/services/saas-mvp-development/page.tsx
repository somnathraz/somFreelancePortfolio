import type { Metadata } from "next";
import { SaasMvpDevelopmentClient } from "@/components/services/SaasMvpDevelopmentClient";

export const metadata: Metadata = {
  title: "SaaS MVP Development Services for Startups | Somanath Studio",
  description:
    "Hire a senior SaaS developer to build your startup MVP using Next.js, Node.js and practical AI integrations. Custom SaaS development from product scoping to launch.",
  keywords: [
    "SaaS MVP development",
    "SaaS MVP Development Services",
    "startup MVP development",
    "custom SaaS development",
    "custom SaaS product development",
    "SaaS app development",
    "MVP software development",
    "hire SaaS developer",
    "senior SaaS developer",
    "Next.js SaaS MVP",
    "Node.js SaaS development",
    "AI SaaS development",
  ],
  alternates: {
    canonical: "/services/saas-mvp-development",
  },
  openGraph: {
    title: "SaaS MVP Development Services for Startups | Somanath Studio",
    description:
      "Hire a senior SaaS developer to build your startup MVP using Next.js, Node.js and practical AI integrations. Custom SaaS development from product scoping to launch.",
    url: "/services/saas-mvp-development",
    type: "website",
    images: [
      {
        url: "/og?title=SaaS%20MVP%20Development%20Services",
        width: 1200,
        height: 630,
        alt: "SaaS MVP Development Services for Startups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS MVP Development Services for Startups | Somanath Studio",
    description:
      "Hire a senior SaaS developer to build your startup MVP using Next.js, Node.js and practical AI integrations. Custom SaaS development from product scoping to launch.",
    images: ["/og?title=SaaS%20MVP%20Development%20Services"],
  },
};

const faqMainEntity = [
  {
    "@type": "Question",
    name: "How much does an MVP cost?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "It depends on scope. Typical SaaS MVP engagements start from ₹75,000 for a focused first version. Auth, billing, admin tools and AI features change the budget. We pin scope before any build starts.",
    },
  },
  {
    "@type": "Question",
    name: "How long does development take?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Many focused MVPs ship in a few weeks. Timeline depends on the core workflow and how decided the product already is.",
    },
  },
  {
    "@type": "Question",
    name: "Can you work with a non-technical founder?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. A large part of the work is translating product goals into scope, architecture and weekly progress you can understand without writing code.",
    },
  },
  {
    "@type": "Question",
    name: "Will I own the source code?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. You own the codebase, accounts and infrastructure. Handover includes repositories, deployment access and enough documentation to continue without me if needed.",
    },
  },
  {
    "@type": "Question",
    name: "Can you improve an existing MVP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. I can harden fragile MVPs, improve performance, clean architecture, add features, or prepare an existing product for real users and growth.",
    },
  },
  {
    "@type": "Question",
    name: "What happens after launch?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "You get handover and documentation. I can continue with fixes, performance work, production-readiness upgrades and feature development as needed.",
    },
  },
];

export default function SaaSMvpDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SaaS MVP Development",
    serviceType: "SaaS MVP Development",
    provider: {
      "@type": "Person",
      name: "Somanath Khadanga",
      url: "https://somanathkhadanga.com/about",
      jobTitle: "Senior full-stack and SaaS engineer",
      worksFor: {
        "@type": "Organization",
        "@id": "https://somanathkhadanga.com/#organization",
        name: "Somanath Studio",
        url: "https://somanathkhadanga.com",
      },
    },
    areaServed: "Worldwide",
    url: "https://somanathkhadanga.com/services/saas-mvp-development",
    inLanguage: "en",
    description:
      "Hire a senior SaaS developer to build your startup MVP using Next.js, Node.js and practical AI integrations. Custom SaaS development from product scoping to launch.",
    keywords:
      "SaaS MVP development, SaaS MVP Development Services, startup MVP development, custom SaaS development, custom SaaS product development, SaaS app development, MVP software development, hire SaaS developer, senior SaaS developer, Next.js SaaS MVP, Node.js SaaS development",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqMainEntity,
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
        name: "SaaS MVP Development",
        item: "https://somanathkhadanga.com/services/saas-mvp-development",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SaasMvpDevelopmentClient />
    </>
  );
}
