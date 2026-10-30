import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/hire-dedicated-developers";
const title = "Hire Dedicated Developers | Somanath Studio";
const description =
  "Hire dedicated developers for your startup or agency in the US, UK and India: senior full stack, React and Next.js engineers who work as part of your team, monthly or per project.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=Hire%20Dedicated%20Developers", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=Hire%20Dedicated%20Developers"],
  },
};

const faqs = [
  {
    question: "What does it mean to hire a dedicated developer?",
    answer:
      "A developer works on your product only, for an agreed block of time, inside your tools and process: your repository, your task board, your standups. You get the focus of an in-house hire without recruitment, payroll or notice periods.",
  },
  {
    question: "What kind of developers can I hire?",
    answer:
      "Senior full stack developers working in TypeScript, React, Next.js, Node.js and PostgreSQL, with experience in authentication, payments, background jobs and AI integrations. Frontend, backend, design or QA specialists can be added when the work needs them.",
  },
  {
    question: "How is a dedicated developer different from a freelancer?",
    answer:
      "A freelancer usually splits time across clients and works task by task. A dedicated developer is reserved for your product, joins your rituals and builds context over months, which matters for anything beyond a small fix.",
  },
  {
    question: "Can I hire a dedicated developer from India for a US or UK team?",
    answer:
      "Yes. Work happens from India (IST) with daily overlap for UK working hours and US East Coast mornings. Communication is written-first, so progress never depends on a single meeting.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Either a monthly engagement for ongoing work or a fixed estimate for a defined project. Both are agreed in writing before work starts.",
  },
  {
    question: "Who owns the code?",
    answer: "You do, from the first commit. Work happens in your repositories and accounts.",
  },
];

export default function HireDedicatedDevelopersPage() {
  const schema = [
    webPageJsonLd({ path, name: "Hire Dedicated Developers", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Hire Dedicated Developers", path },
    ]),
    serviceJsonLd({
      path,
      name: "Dedicated Developers for Hire",
      serviceType: "Dedicated software developers",
      description,
      keywords:
        "hire dedicated developers, hire dedicated developer, dedicated developers for hire, hire full stack developer, hire dedicated web developers",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="Hire dedicated developers"
        title="Hire Dedicated Developers Who Work as Part of Your Team"
        description="Senior full stack, React and Next.js developers reserved for your product. Start in days, scale up or down monthly, and keep full ownership of the code."
        whoFor={[
          "Startups that need senior engineering without a long hiring process",
          "Product teams with more roadmap than developers",
          "Agencies that need dedicated web developers for a client account",
          "Founders replacing an unreliable freelancer or outsourced team",
        ]}
        offerings={[
          {
            title: "Dedicated full stack developer",
            body: "One senior engineer across frontend, backend and database: React, Next.js, Node.js, PostgreSQL.",
          },
          {
            title: "Dedicated React and Next.js developer",
            body: "Front-end and product UI work, performance fixes and component libraries inside your codebase.",
          },
          {
            title: "Small dedicated team",
            body: "A senior lead plus frontend, backend, design or QA help for larger roadmaps.",
          },
          {
            title: "Your process, your tools",
            body: "Work happens in your repository, task board and chat, with daily async updates and weekly demos.",
          },
        ]}
        process={[
          { title: "Call", body: "Roadmap, stack, hours needed and timezone overlap." },
          { title: "Proposal", body: "Engagement type, monthly or fixed price, start date in writing." },
          { title: "Onboarding", body: "Access to your repo and tools; first pull request in the first week." },
          { title: "Ongoing", body: "Monthly review of scope and capacity; scale up or down as needed." },
        ]}
        proofs={[
          {
            title: "Products shipped end to end",
            body: "A calendar booking system, a truck logistics and payments platform, an AI English learning app and a chat-to-invoice tool, documented in the case studies.",
          },
          {
            title: "Senior from day one",
            body: "No junior hand-offs: the developer you talk to is the one writing the code.",
          },
        ]}
        sections={[
          {
            heading: "Hire dedicated developers without the hiring process",
            paragraphs: [
              "Recruiting a senior developer takes months and a permanent salary. A dedicated developer engagement gets the same focus in days, with the option to scale down when the roadmap slows.",
              "Because the same developer stays on your product, context builds up: decisions, edge cases and the reasons behind the code are not lost between tasks.",
            ],
          },
          {
            heading: "Dedicated developers for startups",
            paragraphs: [
              "Early-stage startups usually need one strong generalist rather than a team. A dedicated full stack developer can own the product end to end, from database design to deployment, and bring in specialists only when a feature needs them.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/react-development", label: "React development services" },
          { href: "/services/mvp-development", label: "MVP development for startups" },
          { href: "/white-label-web-development", label: "White label web development" },
          { href: "/hire-saas-mvp-developer", label: "Hire a SaaS MVP developer" },
          { href: "/blog/how-to-hire-saas-mvp-developer", label: "How to hire a SaaS developer" },
          { href: "/blog/freelancer-vs-agency-saas-development", label: "Freelancer vs agency" },
        ]}
        pricingNote="Monthly engagements or fixed project estimates · NDA available · You own the code"
        primaryCta={{ href: "/contact", label: "Hire a Dedicated Developer" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
