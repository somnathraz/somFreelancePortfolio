import type { Metadata } from "next";
import { PaperChaiCaseStudy } from "@/components/projects/PaperChaiCaseStudy";

export const metadata: Metadata = {
  title: "PaperChai – AI Website and Booking Platform | Somanath Khadanga",
  description:
    "A founder-built SaaS platform that turns existing business information into AI-generated, booking-ready websites.",
  alternates: {
    canonical: "/projects/paperchai",
  },
  openGraph: {
    title: "PaperChai – AI Website and Booking Platform | Somanath Khadanga",
    description:
      "A founder-built SaaS platform that turns existing business information into AI-generated, booking-ready websites.",
    url: "/projects/paperchai",
    type: "website",
    images: [
      {
        url: "/og?title=PaperChai%20%E2%80%94%20Profile%20to%20Website",
        width: 1200,
        height: 630,
        alt: "PaperChai — AI website and booking platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperChai – AI Website and Booking Platform | Somanath Khadanga",
    description:
      "A founder-built SaaS platform that turns existing business information into AI-generated, booking-ready websites.",
    images: ["/og?title=PaperChai%20%E2%80%94%20Profile%20to%20Website"],
  },
};

export default function PaperChaiProjectPage() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PaperChai",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://paperchaiapp.com",
    description:
      "India-first profile-to-website builder that turns existing business information into booking-ready one-page websites.",
    author: {
      "@type": "Person",
      name: "Somanath Khadanga",
      url: "https://somanathkhadanga.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://somanathkhadanga.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://somanathkhadanga.com/case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "PaperChai",
        item: "https://somanathkhadanga.com/projects/paperchai",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PaperChaiCaseStudy />
    </>
  );
}
