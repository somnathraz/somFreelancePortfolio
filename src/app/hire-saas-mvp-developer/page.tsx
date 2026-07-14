import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";

export const metadata: Metadata = {
  title: "Hire a SaaS MVP Developer | Somanath Studio",
  description:
    "Hire a SaaS MVP developer for founders, freelancers and consultants. Next.js, Node.js, AI features, white-label-friendly and NDA-ready. Remote international.",
  alternates: { canonical: "/hire-saas-mvp-developer" },
  openGraph: {
    title: "Hire a SaaS MVP Developer | Somanath Studio",
    description:
      "SaaS MVP development partner — Next.js, Node.js, AI. White-label and referral-friendly.",
    url: "/hire-saas-mvp-developer",
    type: "website",
    images: [{ url: "/og?title=Hire%20SaaS%20MVP%20Developer", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire a SaaS MVP Developer | Somanath Studio",
    description:
      "SaaS MVP development partner — Next.js, Node.js, AI. White-label and referral-friendly.",
    images: ["/og?title=Hire%20SaaS%20MVP%20Developer"],
  },
};

export default function HireSaasMvpDeveloperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Hire SaaS MVP Developer",
            provider: { "@type": "Person", name: "Somanath Khadanga" },
            url: "https://somanathkhadanga.com/hire-saas-mvp-developer",
            description:
              "Hire a SaaS MVP developer for founders, freelancers and consultants. Next.js, Node.js and AI SaaS.",
          }),
        }}
      />
      <GrowthLandingPage
        eyebrow="Hire SaaS MVP developer"
        title="SaaS development partner for founders, freelancers and consultants."
        description="I help you ship a production-ready SaaS MVP — product scope, Next.js/Node engineering, AI features and launch support. White-label and NDA-friendly."
        whoFor={[
          "Founders who need a technical partner, not a ticket-taker",
          "Freelancers who want senior engineering backup",
          "Consultants packaging custom software for clients",
          "Teams with an unfinished or fragile MVP",
        ]}
        offerings={[
          {
            title: "Scoped MVP builds",
            body: "Auth, core workflow, admin, billing hooks and deploy — the smallest product that can win users.",
          },
          {
            title: "Next.js · Node.js · AI",
            body: "Modern full-stack delivery with practical AI features when they change the product, not demos.",
          },
          {
            title: "White-label & referrals",
            body: "Work under your brand when agreed. Clean handover. No client poaching.",
          },
          {
            title: "Remote · international",
            body: "IST-based with async-friendly updates for US, EU, Middle East and India clients.",
          },
        ]}
        process={[
          { title: "Call", body: "20-minute fit and scope conversation." },
          { title: "Plan", body: "Milestones, stack and estimate — before coding." },
          { title: "Build", body: "Weekly demos, transparent progress." },
          { title: "Launch", body: "Deploy, docs, ownership of the codebase." },
        ]}
        proofs={[
          {
            title: "PaperChai",
            body: "Founder-built AI website + booking SaaS — live product, not a prototype deck.",
          },
          {
            title: "Commerce & logistics",
            body: "Live order systems and ops dashboards running in production.",
          },
        ]}
        pricingNote="Typical focused SaaS MVP work starts from ₹75,000 · NDA available"
        primaryCta={{ href: "/book", label: "Book a strategy call" }}
        secondaryCta={{ href: "/services/saas-mvp-development", label: "See full MVP service" }}
      />
    </>
  );
}
