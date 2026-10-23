import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hire a SaaS MVP Developer or Product Team | Somanath Studio",
  description:
    "Hire a SaaS MVP developer—or scale to a complete product team. Senior-led delivery with specialists added when your scope requires more capacity.",
  alternates: { canonical: "/hire-saas-mvp-developer" },
  openGraph: {
    title: "Hire a SaaS MVP Developer or Product Team | Somanath Studio",
    description:
      "Hire a focused senior engineer or a compact product team for SaaS MVP delivery.",
    url: "/hire-saas-mvp-developer",
    type: "website",
    images: [{ url: "/og?title=Hire%20SaaS%20MVP%20Developer", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire a SaaS MVP Developer or Product Team | Somanath Studio",
    description:
      "Hire a focused senior engineer or a compact product team for SaaS MVP delivery.",
    images: ["/og?title=Hire%20SaaS%20MVP%20Developer"],
  },
};

export default function HireSaasMvpDeveloperPage() {
  const schema = [
    webPageJsonLd({
      path: "/hire-saas-mvp-developer",
      name: "Hire a SaaS MVP Developer",
      description:
        "Hire a SaaS MVP developer or scale to a senior-led product team.",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Hire SaaS MVP Developer", path: "/hire-saas-mvp-developer" },
    ]),
    serviceJsonLd({
      path: "/hire-saas-mvp-developer",
      name: "Hire SaaS MVP Developer",
      serviceType: "SaaS MVP Development",
      description:
        "Hire a SaaS MVP developer or scale to a senior-led product team for founders and agencies.",
      keywords:
        "hire saas mvp developer, hire next.js developer, saas product team, white-label mvp development",
    }),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="Hire SaaS MVP developer"
        title="Hire a SaaS MVP Developer—or Scale to a Complete Product Team"
        description="Start with one experienced technical lead. Add frontend, backend, design, QA, AI, or cloud specialists only when your product requires them."
        whoFor={[
          "Founders who need a technical lead, not a ticket-taker",
          "Teams that may need one engineer today and a compact team next month",
          "Consultants packaging custom software for clients",
          "Agencies needing white-label MVP capacity",
        ]}
        offerings={[
          {
            title: "Focused senior engineer",
            body: "One engineer for audits, architecture, features, and tightly scoped MVP builds.",
          },
          {
            title: "Compact product team",
            body: "Technical lead plus the specialists required for a full MVP or product module.",
          },
          {
            title: "Next.js · Node.js · AI",
            body: "Modern full-stack delivery with practical AI features when they change the product.",
          },
          {
            title: "White-label & referrals",
            body: "Work under your brand when agreed. Clean handover. No client poaching.",
          },
        ]}
        process={[
          { title: "Call", body: "Requirements, risks, and recommended engagement." },
          { title: "Plan", body: "Milestones, stack, and team setup — before coding." },
          { title: "Build", body: "Weekly demos with direct engineer communication." },
          { title: "Launch", body: "Deploy, docs, and ownership of the codebase." },
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
        primaryCta={{ href: "/contact", label: "Talk to an Engineer" }}
        secondaryCta={{ href: "/services/saas-mvp-development", label: "See full MVP service" }}
      />
    </>
  );
}
