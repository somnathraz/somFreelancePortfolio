import type { Metadata } from "next";
import { SaasMvpDevelopmentClient } from "@/components/services/SaasMvpDevelopmentClient";

export const metadata: Metadata = {
  title: "SaaS MVP Development for Founders | Somanath Studio",
  description:
    "Launch your SaaS MVP fast with clean architecture, strong UX, and production-minded engineering. I help founders build MVPs that are ready to grow.",
};

export default function SaaSMvpDevelopmentPage() {
  return <SaasMvpDevelopmentClient />;
}
