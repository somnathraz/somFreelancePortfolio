import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/services/nextjs-development";
const title = "Next.js Development Services | Somanath Studio";
const description =
  "Next.js development services for startups and agencies in the US, UK and India: new Next.js apps, migrations to the App Router, and SaaS products built by a senior Next.js developer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=Next.js%20Development%20Services", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=Next.js%20Development%20Services"],
  },
};

const faqs = [
  {
    question: "What do your Next.js development services cover?",
    answer:
      "New Next.js applications and SaaS products, marketing sites that need real engineering, migrations from the Pages Router or plain React, and ongoing feature work on existing Next.js codebases.",
  },
  {
    question: "Why build on Next.js?",
    answer:
      "It combines React with server rendering, routing, caching and image handling, which gives fast first loads and good SEO without assembling those pieces yourself. It also deploys cleanly to Vercel or your own infrastructure.",
  },
  {
    question: "Can you migrate our app to the App Router?",
    answer:
      "Yes. We migrate route by route so the app keeps working during the move, and review caching and data fetching along the way, since that is where most App Router migrations go wrong.",
  },
  {
    question: "Our Next.js app is slow. Is that this service?",
    answer:
      "Performance work on an existing app is covered by the Next.js performance optimization service, which starts with a measured audit of Core Web Vitals and server timings.",
  },
  {
    question: "Do you work with agencies as a Next.js partner?",
    answer:
      "Yes, including white label delivery under your agency's brand with an NDA and no client poaching.",
  },
];

export default function NextjsDevelopmentPage() {
  const schema = [
    webPageJsonLd({ path, name: "Next.js Development Services", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Next.js Development", path },
    ]),
    serviceJsonLd({
      path,
      name: "Next.js Development Services",
      serviceType: "Next.js development",
      description,
      keywords:
        "next js development services, nextjs development company, nextjs agency, next.js development, hire next.js developer",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="Next.js development services"
        title="Next.js Development Services for Startups and Agencies"
        description="New Next.js apps, App Router migrations and SaaS products, built by a senior Next.js engineer with clear rendering and caching rules from day one."
        whoFor={[
          "Startups choosing Next.js for a new product",
          "Teams moving from the Pages Router or plain React to the App Router",
          "Agencies that need a Next.js development partner",
          "Companies whose Next.js codebase has grown hard to change",
        ]}
        offerings={[
          {
            title: "New Next.js applications",
            body: "App Router, TypeScript, server components and a typed data layer, deployed with preview environments from day one.",
          },
          {
            title: "Next.js SaaS products",
            body: "Authentication, subscriptions, multi-tenant data and admin tools on Next.js, Node.js and PostgreSQL.",
          },
          {
            title: "Migrations",
            body: "Pages Router to App Router, Create React App or Vite to Next.js, done route by route without a freeze.",
          },
          {
            title: "Ongoing development",
            body: "Feature work, upgrades to new Next.js and React releases, and code reviews for your team.",
          },
        ]}
        process={[
          { title: "Scope", body: "Call, written scope and fixed estimate." },
          { title: "Architecture", body: "Rendering, caching and data strategy agreed up front." },
          { title: "Build", body: "Weekly demos on Vercel preview URLs." },
          { title: "Handover", body: "Docs, deploy access and an upgrade plan." },
        ]}
        proofs={[
          {
            title: "This site is built on Next.js",
            body: "App Router, static generation and server components, plus the Next.js calendar booking system in the case studies.",
          },
          {
            title: "Close to the framework",
            body: "Regular write-ups on Next.js releases, caching changes and security fixes on the blog.",
          },
        ]}
        sections={[
          {
            heading: "Hiring a Next.js development company",
            paragraphs: [
              "Next.js gives a lot of choices: static or dynamic rendering, server or client components, where to cache. Most problems in Next.js codebases come from making those choices page by page instead of once. We set the rules at the start and document them, so the app stays predictable as it grows.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/nextjs-performance-optimization", label: "Next.js performance optimization" },
          { href: "/services/react-development", label: "React development services" },
          { href: "/services/web-app-development", label: "Web app development" },
          { href: "/white-label-web-development", label: "White label web development" },
          { href: "/blog/nextjs-16-app-router-caching-changes-saas", label: "Next.js 16 caching changes" },
          { href: "/blog/why-your-nextjs-app-feels-slow-after-launch", label: "Why Next.js apps feel slow after launch" },
        ]}
        pricingNote="Fixed estimate after scoping · NDA available · You own the code"
        primaryCta={{ href: "/contact", label: "Discuss Your Next.js Project" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
