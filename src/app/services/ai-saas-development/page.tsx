import type { Metadata } from "next";
import { AiSaasDevelopmentClient } from "@/components/services/AiSaasDevelopmentClient";

export const metadata: Metadata = {
  title: "AI SaaS Development for Founders | Somanath Studio",
  description:
    "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation. Product-focused AI development for founders and startup teams.",
  alternates: {
    canonical: "/services/ai-saas-development",
  },
  openGraph: {
    title: "AI SaaS Development for Founders | Somanath Studio",
    description:
      "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation.",
    url: "/services/ai-saas-development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaS Development for Founders | Somanath Studio",
    description:
      "Build practical AI-powered SaaS features like chat, copilots, search, summarization, and automation.",
  },
};

export default function AiSaasDevelopmentPage() {
  return <AiSaasDevelopmentClient />;
}
