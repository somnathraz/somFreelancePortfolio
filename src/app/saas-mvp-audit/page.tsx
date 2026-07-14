import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";

export const metadata: Metadata = {
  title: "SaaS MVP Audit | Production Readiness Review",
  description:
    "SaaS MVP audit for founders shipping AI-generated or rushed products. Auth, APIs, env, deps, deploy and AI trust boundaries — before real users.",
  alternates: { canonical: "/saas-mvp-audit" },
  openGraph: {
    title: "SaaS MVP Audit | Somanath Studio",
    description:
      "Technical audit before launch — authentication, APIs, dependencies, deployment and AI-specific risks.",
    url: "/saas-mvp-audit",
    type: "website",
    images: [{ url: "/og?title=SaaS%20MVP%20Audit", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS MVP Audit | Somanath Studio",
    description:
      "Technical audit before launch — authentication, APIs, dependencies, deployment and AI-specific risks.",
    images: ["/og?title=SaaS%20MVP%20Audit"],
  },
};

export default function SaasMvpAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "SaaS MVP Audit",
            provider: { "@type": "Person", name: "Somanath Khadanga" },
            url: "https://somanathkhadanga.com/saas-mvp-audit",
            description:
              "SaaS MVP and production-readiness audit covering auth, APIs, env, dependencies, deploy and AI trust boundaries.",
          }),
        }}
      />
      <GrowthLandingPage
        eyebrow="SaaS MVP audit"
        title="Find what will break before your users do."
        description="A focused technical audit for vibe-coded, AI-generated or rushed SaaS MVPs — authentication, APIs, secrets, rate limits, dependency risk, deployment and AI trust boundaries."
        whoFor={[
          "Founders about to put real users on an AI-built MVP",
          "Teams inheriting unfinished freelance or agency work",
          "Agencies needing a third-party technical review for a client",
          "Products that feel fragile after every deploy",
        ]}
        offerings={[
          {
            title: "Security & access",
            body: "Auth, sessions, roles, API exposure and secret handling.",
          },
          {
            title: "Stability & architecture",
            body: "Codebase hotspots, data model risk, error paths and failure modes.",
          },
          {
            title: "Dependencies & AI agents",
            body: "Supply-chain hygiene plus AI tool / agent trust boundaries where relevant.",
          },
          {
            title: "Prioritized fix list",
            body: "What to fix before launch vs what can wait — clear enough for a founder to act.",
          },
        ]}
        process={[
          { title: "Intake", body: "Repo access, env overview, goals." },
          { title: "Review", body: "Structured checklist + deep spots." },
          { title: "Report", body: "Findings ranked by launch risk." },
          { title: "Next", body: "Optional fix sprint or partner build." },
        ]}
        proofs={[
          {
            title: "Built for production realities",
            body: "Same engineer who builds MVPs and upgrades fragile products — not a generic checklist farm.",
          },
        ]}
        pricingNote="Scoped per codebase · often the first step before a production-readiness upgrade"
        primaryCta={{ href: "/book", label: "Book an audit call" }}
        secondaryCta={{
          href: "/services/production-readiness-upgrade",
          label: "Production readiness service",
        }}
      />
    </>
  );
}
