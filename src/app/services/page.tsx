import type { Metadata } from "next";
import { ServicesIndexClient } from "@/components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "Services | Somanath Studio",
  description:
    "Explore SaaS-focused services: MVP development, Next.js performance optimization, production readiness upgrades, and AI SaaS development.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesIndexClient />;
}
