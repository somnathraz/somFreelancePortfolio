import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/services/mvp-development";
const title = "MVP Development for Startups | Somanath Studio";
const description =
  "MVP development services for startups in the US, UK and India. Scope, build and launch a minimum viable product in weeks with a senior engineer, with a fixed estimate up front.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=MVP%20Development%20for%20Startups", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=MVP%20Development%20for%20Startups"],
  },
};

const faqs = [
  {
    question: "How much does MVP development cost?",
    answer:
      "It depends on scope. Focused MVP engagements start from ₹75,000. Authentication, payments, admin tools, integrations and AI features each change the budget, so you get a written scope and fixed estimate before any build starts.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "Many focused MVPs ship in a few weeks. The timeline depends on how many core workflows the first version needs and how settled the product decisions already are.",
  },
  {
    question: "What does the MVP development process look like?",
    answer:
      "Scope the one workflow that proves the idea, agree architecture and stack, build in weekly demo cycles, then launch with analytics and error tracking so you learn from real users straight away.",
  },
  {
    question: "Is this only for SaaS products?",
    answer:
      "No. We build MVPs for SaaS, marketplaces, booking systems, internal tools and AI products. SaaS-specific work such as billing and multi-tenancy is covered on the SaaS MVP development page.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. Much of the work is turning product goals into a scope, a plan and weekly progress you can follow without reading code.",
  },
  {
    question: "Will I own the code?",
    answer:
      "Yes. The repositories, accounts and infrastructure are yours, and handover includes enough documentation to continue with or without us.",
  },
];

export default function MvpDevelopmentPage() {
  const schema = [
    webPageJsonLd({ path, name: "MVP Development for Startups", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "MVP Development", path },
    ]),
    serviceJsonLd({
      path,
      name: "MVP Development Services for Startups",
      serviceType: "MVP development",
      description,
      keywords:
        "mvp development for startups, startup mvp development, mvp development services, mvp development cost, mvp development team, custom mvp development",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="MVP development for startups"
        title="MVP Development for Startups That Need to Ship and Learn"
        description="Scope the smallest product that proves your idea, build it properly, and launch in weeks. A senior engineer owns the build from first call to production."
        whoFor={[
          "Founders with a validated problem who need a first working product",
          "Non-technical founders who need a technical partner for the first version",
          "Startups that outgrew a no-code prototype",
          "Teams replacing a rushed MVP that keeps breaking",
        ]}
        offerings={[
          {
            title: "Scope and roadmap",
            body: "We cut the idea down to the workflow that proves value, then plan what comes after launch.",
          },
          {
            title: "Full MVP build",
            body: "Web app with authentication, core workflow, admin tools, email and payments where needed, on Next.js, Node.js and PostgreSQL.",
          },
          {
            title: "Launch-ready foundations",
            body: "Analytics, error tracking, backups and a deployment pipeline, so the MVP survives its first real users.",
          },
          {
            title: "After launch",
            body: "Iteration on user feedback, performance work and production hardening as the product grows.",
          },
        ]}
        process={[
          { title: "Discovery call", body: "Your idea, users and constraints; whether an MVP is the right next step." },
          { title: "Scope and estimate", body: "Written scope, milestones and fixed estimate." },
          { title: "Build sprints", body: "Weekly demos on a live preview URL." },
          { title: "Launch", body: "Production deploy, handover and a plan for the next version." },
        ]}
        proofs={[
          {
            title: "MVPs that reached real users",
            body: "A calendar booking system, a truck logistics and payments platform and an AI English learning app, documented in the case studies.",
          },
          {
            title: "Built to keep, not to throw away",
            body: "TypeScript, a clean data model and tests on the critical paths, so version two extends version one instead of replacing it.",
          },
        ]}
        sections={[
          {
            heading: "What makes startup MVP development succeed",
            paragraphs: [
              "An MVP fails when it tries to do too much or is built so loosely that nothing can be added later. We scope for a single, measurable outcome and build that part to production standard.",
              "Everything outside the core workflow is either manual at first, handled by an existing tool, or planned for after launch. That keeps the cost and timeline down without cutting the corners users notice.",
            ],
          },
          {
            heading: "MVP development cost and timeline",
            paragraphs: [
              "Cost is driven by the number of user roles, integrations, and whether payments or AI are part of the first version. A focused MVP with one core workflow can launch in a few weeks; products with several roles and integrations take longer.",
              "You get a fixed estimate before the build starts, so there are no open-ended invoices.",
            ],
          },
          {
            heading: "For founders in the US, UK and India",
            paragraphs: [
              "We work remotely from India with overlap for UK working hours and US East Coast mornings. Founders abroad get senior engineering at a lower cost than local agencies; Indian founders get product engineering experience from international projects.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/saas-mvp-development", label: "SaaS MVP development" },
          { href: "/services/react-development", label: "React development services" },
          { href: "/services/production-readiness-upgrade", label: "Production readiness upgrade" },
          { href: "/blog/saas-mvp-cost-2026", label: "What an MVP costs in 2026" },
          { href: "/blog/5-signs-your-mvp-is-not-production-ready", label: "5 signs your MVP is not production ready" },
          { href: "/tools/saas-mvp-cost-calculator", label: "MVP cost calculator" },
        ]}
        pricingNote="Focused MVPs start from ₹75,000 · Fixed estimate after scoping · You own the code"
        primaryCta={{ href: "/contact", label: "Discuss Your MVP" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
