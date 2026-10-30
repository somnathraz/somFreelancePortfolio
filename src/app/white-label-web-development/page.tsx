import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/white-label-web-development";
const title = "White Label Web Development for Agencies | Somanath Studio";
const description =
  "White label web development services for agencies in the US, UK and India. Senior-led Next.js, React and SaaS builds shipped under your brand, NDA-ready, no client poaching.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=White%20Label%20Web%20Development", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=White%20Label%20Web%20Development"],
  },
};

const faqs = [
  {
    question: "What is white label web development?",
    answer:
      "Your agency sells and manages the project; we design the architecture, write the code and ship it under your name. Your client sees your agency, your process and your branding. We stay behind the scenes unless you ask us to join a call.",
  },
  {
    question: "Do you talk to our clients directly?",
    answer:
      "Only with your permission. By default all communication goes through you, and we never approach your clients for direct work. That commitment is part of the NDA we sign before scoping.",
  },
  {
    question: "What kind of white label website development do you take on?",
    answer:
      "Custom web applications, SaaS products, client portals, dashboards, booking systems and marketing sites that need real engineering: Next.js, React, Node.js, PostgreSQL, authentication, payments and AI features. We are not a fit for simple theme installs.",
  },
  {
    question: "How is pricing handled for agencies?",
    answer:
      "Each project is scoped and estimated in writing before work starts, so you can add your margin and quote your client with confidence. Ongoing overflow capacity and referral terms are agreed per partnership.",
  },
  {
    question: "Which timezones do you cover?",
    answer:
      "We work from India (IST) and overlap with UK mornings and US East Coast mornings. Weekly demos and async updates are written so you can forward them to your client as-is.",
  },
  {
    question: "Who owns the code?",
    answer:
      "Your agency or your client, as you decide. Handover includes the repositories, deployment access and documentation, with nothing locked to our accounts.",
  },
];

export default function WhiteLabelWebDevelopmentPage() {
  const schema = [
    webPageJsonLd({ path, name: "White Label Web Development", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "White Label Web Development", path },
    ]),
    serviceJsonLd({
      path,
      name: "White Label Web Development Services",
      serviceType: "White label web development",
      description,
      keywords:
        "white label web development, white label web development services, white label website development, white label web developer, white label web development agency",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="White label web development"
        title="White Label Web Development for Agencies"
        description="Sell web apps, SaaS builds and custom sites under your brand. A senior engineer builds them behind your agency, with no client poaching and no hiring overhead."
        whoFor={[
          "Web design and marketing agencies that win projects bigger than their dev team",
          "UI/UX studios that need designs built as production React or Next.js apps",
          "Webflow and WordPress agencies moving into custom web apps and SaaS",
          "Freelancers and consultants who need a reliable build partner for overflow",
        ]}
        offerings={[
          {
            title: "White label website development",
            body: "Marketing sites and web apps built in Next.js and React, delivered with clean repositories, documentation and demo links you can present as your own.",
          },
          {
            title: "Custom web apps and SaaS",
            body: "Client portals, dashboards, booking systems and SaaS products with authentication, payments, PostgreSQL and background jobs.",
          },
          {
            title: "Overflow capacity",
            body: "Start with one senior engineer for a project, then add frontend, backend, AI or QA help when your pipeline grows.",
          },
          {
            title: "NDA and no poaching",
            body: "NDA before scoping. No direct client contact without your permission, and never a pitch for direct work.",
          },
        ]}
        process={[
          { title: "Intro and NDA", body: "A short fit call, then an NDA before you share client details." },
          { title: "Scope and estimate", body: "Written scope, stack and fixed estimate you can mark up and quote." },
          { title: "Build", body: "Weekly demos and async updates written for you to forward." },
          { title: "Handover", body: "Code, deploy access and documentation under your or your client's accounts." },
        ]}
        proofs={[
          {
            title: "Production engineering, not templates",
            body: "Next.js, React, Node.js, PostgreSQL, auth, payments and practical AI features shipped to real users.",
          },
          {
            title: "Shipped products",
            body: "A calendar booking system, a truck logistics and payments platform, an AI English learning app and a chat-to-invoice tool; the case studies show what was built and how.",
          },
        ]}
        sections={[
          {
            heading: "Why agencies use a white label web developer",
            paragraphs: [
              "Hiring a senior developer full time is expensive when project volume goes up and down. A white label web development partner lets you say yes to larger web app and SaaS briefs without carrying payroll between projects.",
              "The work is delivered under your agency's name. You keep the client relationship, the margin and the account; we handle architecture, code, deployment and technical documentation.",
            ],
          },
          {
            heading: "What a white label project looks like",
            paragraphs: [
              "You share the brief and designs. We return a written scope with milestones, stack choice and a fixed estimate within a few working days. Once approved, you get a weekly demo link and a short progress note you can forward to your client.",
              "At the end you receive the repository, deployment access and handover notes. If your client needs ongoing work, we can stay on as your maintenance partner under the same white label terms.",
            ],
          },
          {
            heading: "Agencies in the US, UK and India",
            paragraphs: [
              "We work remotely from India, which gives overlap with UK working hours and US East Coast mornings. UK and US agencies get senior engineering at a lower cost than local hiring; Indian agencies get a partner for projects that need deeper product engineering than a typical web team.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/react-development", label: "React development services" },
          { href: "/services/custom-software-development", label: "Custom software development" },
          { href: "/services/saas-development", label: "SaaS development services" },
          { href: "/blog/outsource-saas-development-agency-guide", label: "Outsourcing SaaS development: agency guide" },
          { href: "/blog/freelancer-vs-agency-saas-development", label: "Freelancer vs agency" },
        ]}
        pricingNote="Fixed estimates per project · Partner and referral terms by agreement · NDA supported"
        primaryCta={{ href: "/contact", label: "Talk About a Partnership" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
