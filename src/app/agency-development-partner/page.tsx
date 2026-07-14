import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";

export const metadata: Metadata = {
  title: "Agency Development Partner | White-Label SaaS Engineering",
  description:
    "Agency development partner for white-label SaaS and custom product builds. You manage the client. I handle the engineering. NDA-friendly, referral-ready, remote.",
  alternates: { canonical: "/agency-development-partner" },
  openGraph: {
    title: "Agency Development Partner | Somanath Studio",
    description:
      "You manage the client. I handle the engineering — white-label Next.js, Node.js and AI SaaS delivery.",
    url: "/agency-development-partner",
    type: "website",
    images: [{ url: "/og?title=Agency%20Development%20Partner", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Development Partner | Somanath Studio",
    description:
      "You manage the client. I handle the engineering — white-label Next.js, Node.js and AI SaaS delivery.",
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
            name: "Agency Development Partner",
            provider: { "@type": "Organization", name: "Somanath Studio" },
            url: "https://somanathkhadanga.com/agency-development-partner",
            description:
              "White-label SaaS engineering partner for agencies. You manage the client. I handle the engineering.",
          }),
        }}
      />
      <GrowthLandingPage
        eyebrow="For agencies & partners"
        title="You manage the client. I handle the engineering."
        description="White-label SaaS and custom product delivery for agencies, freelancers and consultants. NDA-friendly. No client contact without permission. Fixed-scope or sprint work."
        whoFor={[
          "Web-design and marketing agencies that need senior product engineering",
          "UI/UX studios shipping beyond brochure sites",
          "Webflow / WordPress teams expanding into SaaS",
          "Freelancers and brokers who need a reliable build partner",
        ]}
        offerings={[
          {
            title: "White-label delivery",
            body: "I ship under your process and branding when agreed — clean repos, docs and demos you can present.",
          },
          {
            title: "No poaching",
            body: "No direct client contact without your permission. Referral partnerships welcome.",
          },
          {
            title: "Fixed scope or sprints",
            body: "Clear milestones for MVP builds, rescue work, AI features or performance upgrades.",
          },
          {
            title: "Weekly progress updates",
            body: "Async-friendly status you can forward to stakeholders without translation layers.",
          },
        ]}
        process={[
          { title: "Intro", body: "Fit check + NDA if needed." },
          { title: "Scope", body: "Estimate, stack and delivery model." },
          { title: "Build", body: "Sprints with weekly demos for you." },
          { title: "Handover", body: "Code, deploy access and documentation." },
        ]}
        proofs={[
          {
            title: "Production SaaS skills",
            body: "Next.js, Node.js, PostgreSQL, auth, payments and practical AI — not template sites.",
          },
          {
            title: "Partner-friendly",
            body: "Remote international clients. IST timezone. Clear communication.",
          },
        ]}
        pricingNote="Partner / referral terms by agreement · NDA supported"
        primaryCta={{ href: "/book", label: "Book a partner intro call" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
