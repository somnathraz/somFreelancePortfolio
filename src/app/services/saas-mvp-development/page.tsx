import type { Metadata } from "next";
import { SaasMvpDevelopmentClient } from "@/components/services/SaasMvpDevelopmentClient";

export const metadata: Metadata = {
  title: "SaaS MVP Development for Founders | Somanath Studio",
  description:
    "Build and launch your SaaS MVP with an experienced full-stack engineer. Next.js, Node.js, PostgreSQL and practical AI — from scope to production launch.",
  alternates: {
    canonical: "/services/saas-mvp-development",
  },
  openGraph: {
    title: "SaaS MVP Development for Founders | Somanath Studio",
    description:
      "Build and launch your SaaS MVP with an experienced full-stack engineer. Next.js, Node.js, PostgreSQL and practical AI integrations.",
    url: "/services/saas-mvp-development",
    type: "website",
    images: [
      {
        url: "/og?title=SaaS%20MVP%20Development",
        width: 1200,
        height: 630,
        alt: "SaaS MVP Development for Founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS MVP Development for Founders | Somanath Studio",
    description:
      "Build and launch your SaaS MVP with an experienced full-stack engineer. Next.js, Node.js, PostgreSQL and practical AI integrations.",
    images: ["/og?title=SaaS%20MVP%20Development"],
  },
};

const faqMainEntity = [
  {
    "@type": "Question",
    name: "How much does an MVP cost?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "It depends on scope. Typical SaaS MVP engagements start from ₹75,000 for a focused first version. Auth, billing, admin tools, AI features, and multi-role workflows change the budget. We pin a clear scope before any build starts.",
    },
  },
  {
    "@type": "Question",
    name: "How long does development take?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Many focused MVPs ship in a few weeks. Timeline depends on the core workflow, integrations, and how decided the product already is. The goal is the smallest version that is useful and launchable — not overbuilding version one.",
    },
  },
  {
    "@type": "Question",
    name: "Do you work with non-technical founders?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. A large part of the work is translating product goals into scope, architecture, and weekly progress you can understand without writing code.",
    },
  },
  {
    "@type": "Question",
    name: "Will I own the source code?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. You own the codebase, accounts, and infrastructure used for the project. Handover includes repositories, deployment access, and enough documentation to continue without me if needed.",
    },
  },
  {
    "@type": "Question",
    name: "Can you improve an existing product?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. I can harden fragile MVPs, improve performance, clean architecture, add features, or prepare an existing product for real users and growth.",
    },
  },
  {
    "@type": "Question",
    name: "Do you handle deployment?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Deployment, environment setup, and launch support are part of the engagement — not an afterthought left to the founder.",
    },
  },
  {
    "@type": "Question",
    name: "How will project communication work?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "You work directly with me. Updates happen over WhatsApp or email plus short check-ins as needed. No account manager layer, no handoff to juniors mid-project.",
    },
  },
  {
    "@type": "Question",
    name: "Do you provide post-launch support?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. After launch I can continue with bug fixes, performance work, production-readiness upgrades, feature development, and technical guidance.",
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
      "Build and launch your SaaS MVP with an experienced full-stack engineer. Next.js, Node.js, PostgreSQL and practical AI — from scope to production launch.",
    keywords:
      "SaaS MVP development, hire MVP developer, startup MVP development, SaaS development company India, software development for startups, technical partner, senior engineer for founders",
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
