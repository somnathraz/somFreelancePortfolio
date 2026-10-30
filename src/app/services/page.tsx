import type { Metadata } from "next";
import { ServicesIndexClient } from "@/components/services/ServicesIndexClient";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

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

const serviceItems = [
  {
    name: "SaaS Development Services",
    path: "/services/saas-development",
    description:
      "End-to-end SaaS development from first MVP to a product that holds up in production.",
  },
  {
    name: "SaaS MVP Development",
    path: "/services/saas-mvp-development",
    description:
      "Build your first usable SaaS product fast with production-minded foundations.",
  },
  {
    name: "MVP Development for Startups",
    path: "/services/mvp-development",
    description: "Scope, build and launch a minimum viable product in weeks.",
  },
  {
    name: "React JS Development",
    path: "/services/react-development",
    description: "Custom React and Next.js web apps, dashboards and SaaS front ends.",
  },
  {
    name: "Next.js Development",
    path: "/services/nextjs-development",
    description: "New Next.js apps, App Router migrations and Next.js SaaS products.",
  },
  {
    name: "Web App Development",
    path: "/services/web-app-development",
    description: "Portals, dashboards, booking systems and custom web applications.",
  },
  {
    name: "Hire Dedicated Developers",
    path: "/hire-dedicated-developers",
    description: "Senior full stack, React and Next.js developers reserved for your product.",
  },
  {
    name: "White Label Web Development",
    path: "/white-label-web-development",
    description: "Web apps and SaaS builds for agencies, delivered under your brand.",
  },
  {
    name: "Custom Software Development",
    path: "/services/custom-software-development",
    description:
      "Internal tools, booking systems, logistics platforms, and business software.",
  },
  {
    name: "Next.js Performance Optimization",
    path: "/services/nextjs-performance-optimization",
    description:
      "Fix slow pages, Core Web Vitals issues, and frontend/backend bottlenecks.",
  },
  {
    name: "Production Readiness Upgrade",
    path: "/services/production-readiness-upgrade",
    description: "Audit and harden fragile MVPs before they crack under growth.",
  },
  {
    name: "AI SaaS Development",
    path: "/services/ai-saas-development",
    description:
      "Add practical AI features that improve real product workflows and outcomes.",
  },
] as const;

const faqs = [
  {
    question: "Do I work with one engineer or a team?",
    answer:
      "Every engagement is senior-led. Focused work stays with one engineer. MVPs and larger platforms add specialists only when the scope needs them.",
  },
  {
    question: "Is this an agency with account managers?",
    answer:
      "No. You work directly with the engineers building the product. No sales-to-development handoff.",
  },
  {
    question: "Can agencies white-label the work?",
    answer:
      "Yes. See the agency development partner page for white-label delivery, NDAs, and no-poaching terms.",
  },
] as const;

export default function ServicesPage() {
  const schema = [
    webPageJsonLd({
      path: "/services",
      name: "Services",
      description:
        "SaaS engineering for founders: production-ready MVP builds, Next.js optimization, vibe-coded MVP audits, and AI feature development.",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    itemListJsonLd({
      path: "/services",
      name: "SaaS engineering services",
      description:
        "Senior-led SaaS engineering services for founders and agencies.",
      items: serviceItems.map((s) => ({
        name: s.name,
        path: s.path,
        description: s.description,
      })),
    }),
    faqPageJsonLd([...faqs]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <ServicesIndexClient />
    </>
  );
}
