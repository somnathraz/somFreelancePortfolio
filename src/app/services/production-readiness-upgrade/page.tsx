import type { Metadata } from "next";
import { ProductionReadinessClient } from "@/components/services/ProductionReadinessClient";

export const metadata: Metadata = {
  title: "Production Readiness Upgrade for SaaS MVPs | Somanath Studio",
  description:
    "Turn your MVP into a production-ready SaaS product with stronger architecture, better stability, cleaner delivery flow, and practical security improvements.",
  alternates: {
    canonical: "/services/production-readiness-upgrade",
  },
  openGraph: {
    title: "Production Readiness Upgrade for SaaS MVPs | Somanath Studio",
    description:
      "Turn your MVP into a production-ready SaaS product with stronger architecture, better stability, and cleaner delivery flow.",
    url: "/services/production-readiness-upgrade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Readiness Upgrade for SaaS MVPs | Somanath Studio",
    description:
      "Turn your MVP into a production-ready SaaS product with stronger architecture, better stability, and cleaner delivery flow.",
  },
};

export default function ProductionReadinessPage() {
  return <ProductionReadinessClient />;
}
