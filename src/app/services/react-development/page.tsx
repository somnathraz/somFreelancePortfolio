import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/services/react-development";
const title = "React JS Development Services | Somanath Studio";
const description =
  "React JS development services for startups and product teams in the US, UK and India: custom React web apps, dashboards and SaaS front ends built by a senior engineer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=React%20JS%20Development%20Services", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=React%20JS%20Development%20Services"],
  },
};

const faqs = [
  {
    question: "What do your React development services include?",
    answer:
      "Custom React and Next.js web applications, SaaS front ends, admin dashboards, client portals, component libraries, and migration or clean-up of existing React codebases. Backend work in Node.js and PostgreSQL is available when the front end needs it.",
  },
  {
    question: "React or Next.js: which should we use?",
    answer:
      "Most new products are built with Next.js, which is React plus routing, server rendering and deployment conventions. Plain React (with Vite) still fits embedded widgets, internal tools behind a login, and apps that already have a separate backend. We recommend one in writing during scoping.",
  },
  {
    question: "Can you take over an existing React codebase?",
    answer:
      "Yes. We start with a short code review covering structure, state management, performance and test coverage, then propose fixes in order of risk before adding new features.",
  },
  {
    question: "Do you work with clients in the US, UK and India?",
    answer:
      "Yes. Work is remote from India (IST), with overlap for UK working hours and US East Coast mornings. Scope, estimates and weekly updates are written so nothing depends on being in the same timezone.",
  },
  {
    question: "How is a React project priced?",
    answer:
      "By scope. After a short call we send a written scope with milestones and a fixed estimate, so you know the cost before any work begins.",
  },
];

export default function ReactDevelopmentPage() {
  const schema = [
    webPageJsonLd({ path, name: "React JS Development Services", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "React Development", path },
    ]),
    serviceJsonLd({
      path,
      name: "React JS Development Services",
      serviceType: "React development",
      description,
      keywords:
        "react js development services, react development services, reactjs development services, custom react js development services, react development company",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="React JS development services"
        title="React JS Development Services for Startups and Product Teams"
        description="Custom React web apps, dashboards and SaaS front ends that stay fast and maintainable after launch. Built by a senior engineer, not passed down an agency chain."
        whoFor={[
          "Startups building a React or Next.js product from scratch",
          "SaaS teams that need a senior React developer for a feature or rebuild",
          "Companies with a slow or messy React codebase that needs cleaning up",
          "Agencies that need white label React development capacity",
        ]}
        offerings={[
          {
            title: "Custom React web applications",
            body: "Product UIs, dashboards and portals with routing, forms, data fetching, authentication and role-based access.",
          },
          {
            title: "React and Next.js SaaS front ends",
            body: "Server-rendered Next.js apps with billing, onboarding and settings flows, wired to your API or a Node.js backend.",
          },
          {
            title: "Codebase rescue and performance",
            body: "Review and refactor of state management, bundle size, re-renders and Core Web Vitals in existing React apps.",
          },
          {
            title: "Component libraries",
            body: "Reusable, typed components with Tailwind or your design system, documented so your team can extend them.",
          },
        ]}
        process={[
          { title: "Scope", body: "Call, written scope, stack recommendation and fixed estimate." },
          { title: "Architecture", body: "Routing, data layer, state and component plan agreed up front." },
          { title: "Build", body: "Weekly demos on a preview URL; code in your repository from day one." },
          { title: "Handover", body: "Documentation, deploy access and an optional support period." },
        ]}
        proofs={[
          {
            title: "Shipped React products",
            body: "Including a Next.js calendar booking system and a React Native AI English learning app; the case studies show the details.",
          },
          {
            title: "TypeScript by default",
            body: "Typed components, typed API clients and linting, so the code stays safe to change after handover.",
          },
        ]}
        sections={[
          {
            heading: "Custom React JS development, start to finish",
            paragraphs: [
              "Most React projects go wrong in the same places: state that is shared too widely, data fetching scattered across components, and no plan for loading and error states. We settle those decisions before writing screens, so features stay quick to add later.",
              "For new products we usually build on Next.js with TypeScript, Tailwind and a typed data layer. For existing apps we work inside your conventions and improve them gradually rather than rewriting.",
            ],
          },
          {
            heading: "When to hire a React development company vs a freelancer",
            paragraphs: [
              "A freelancer is often enough for a contained feature. A product that needs architecture, backend work and long-term maintenance needs someone who owns the whole system. We work as a senior-led team: you deal with the engineer who builds, and specialists join only when the scope needs them.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/nextjs-performance-optimization", label: "Next.js performance optimization" },
          { href: "/services/mvp-development", label: "MVP development for startups" },
          { href: "/services/saas-development", label: "SaaS development services" },
          { href: "/white-label-web-development", label: "White label web development" },
          { href: "/blog/react-19-3-saas-upgrade-guide", label: "React 19.3 upgrade guide" },
          { href: "/blog/react-compiler-nextjs-16-production", label: "React Compiler in production" },
        ]}
        pricingNote="Fixed estimate after scoping · NDA available · You own the code"
        primaryCta={{ href: "/contact", label: "Discuss Your React Project" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
