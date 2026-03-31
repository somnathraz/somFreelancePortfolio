import type { Metadata } from "next";
import { ProductionReadinessClient } from "@/components/services/ProductionReadinessClient";

export const metadata: Metadata = {
  title: "Production Readiness Upgrade for SaaS MVPs | Somanath Studio",
  description:
    "Turn your MVP into a production-ready SaaS product with stronger architecture, better stability, cleaner delivery flow, and practical security improvements.",
};

export default function ProductionReadinessPage() {
  return <ProductionReadinessClient />;
}
