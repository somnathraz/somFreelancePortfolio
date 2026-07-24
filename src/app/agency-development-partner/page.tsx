import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";

export const metadata: Metadata = {
  title: "White-Label Software Development Partner for Agencies",
  description:
    "Add SaaS, AI, and custom application delivery to your agency without building a permanent internal engineering department. Senior-led, NDA-ready, no poaching.",
  alternates: { canonical: "/agency-development-partner" },
  openGraph: {
    title: "White-Label Software Development Partner for Agencies",
    description:
      "Your client relationship. Our senior-led engineering team. White-label SaaS and custom product delivery.",
    url: "/agency-development-partner",
    type: "website",
    images: [{ url: "/og?title=Agency%20Development%20Partner", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "White-Label Software Development Partner for Agencies",
    description:
      "Your client relationship. Our senior-led engineering team. White-label SaaS and custom product delivery.",
    images: ["/og?title=Agency%20Development%20Partner"],
  },
};

export default function AgencyDevelopmentPartnerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "White-Label Software Development Partner for Agencies",
            provider: { "@type": "Organization", name: "Somanath Studio" },
            url: "https://somanathkhadanga.com/agency-development-partner",
            description:
              "White-label SaaS and custom application delivery for agencies with a senior-led flexible team.",
          }),
        }}
      />
      <GrowthLandingPage
        eyebrow="White-label software development partner"
        title="Your Client Relationship. Our Senior-Led Engineering Team."
        description="Add SaaS, AI, and custom application delivery to your agency without building a permanent internal engineering department."
        whoFor={[
          "Web-design and marketing agencies that need senior product engineering",
          "UI/UX studios shipping beyond brochure sites",
          "Webflow / WordPress teams expanding into SaaS",
          "Freelancers and brokers who need a reliable build partner",
        ]}
        offerings={[
          {
            title: "White-label delivery",
            body: "We ship under your process and branding when agreed — clean repos, docs and demos you can present.",
          },
          {
            title: "Flexible team composition",
            body: "Start with a technical lead. Add frontend, backend, AI, design, or QA capacity for overflow work.",
          },
          {
            title: "NDA and no poaching",
            body: "No direct client contact without your permission. Referral partnerships welcome.",
          },
          {
            title: "Weekly progress updates",
            body: "Async-friendly status you can forward to stakeholders without translation layers.",
          },
        ]}
        process={[
          { title: "Intro", body: "Fit check + NDA if needed." },
          { title: "Scope", body: "Estimate, stack, and delivery team setup." },
          { title: "Build", body: "Sprints with weekly demos for you." },
          { title: "Handover", body: "Code, deploy access and documentation." },
        ]}
        proofs={[
          {
            title: "Production SaaS skills",
            body: "Next.js, Node.js, PostgreSQL, auth, payments and practical AI — not template sites.",
          },
          {
            title: "Partner-friendly capacity",
            body: "Remote international clients. IST timezone. White-label overflow without agency layers.",
          },
        ]}
        pricingNote="Partner / referral terms by agreement · NDA supported"
        primaryCta={{ href: "/contact", label: "Talk to an Engineer" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
