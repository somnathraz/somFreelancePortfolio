import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { SiteHelper } from "@/components/ai-helper";
import { siteLogoUrl } from "@/lib/site";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE_E164 } from "@/lib/contact";
import { PERSON_IMAGE, PERSON_SAME_AS } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somanathkhadanga.com"),
  title: "Somanath Studio — SaaS Development Partner for Founders & Agencies",
  description:
    "SaaS development partner for founders, agencies, freelancers and consultants. Next.js, Node.js, AI SaaS. White-label, NDA-friendly, remote international.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "saas development partner",
    "hire saas mvp developer",
    "agency white label development",
    "next.js node.js ai saas",
    "freelance saas engineer",
  ],
  openGraph: {
    title: "SaaS Development Partner — Somanath Studio",
    description:
      "For founders, agencies, freelancers and consultants. Next.js, Node.js, AI. White-label and NDA-friendly.",
    type: "website",
    locale: "en_US",
    url: "https://somanathkhadanga.com",
    siteName: "Somanath Studio",
    images: [
      {
        url: "/og?title=Somanath%20Studio",
        width: 1200,
        height: 630,
        alt: "Somanath Studio — SaaS development partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Development Partner — Somanath Studio",
    description:
      "For founders, agencies, freelancers and consultants. Next.js, Node.js, AI. White-label and NDA-friendly.",
    images: ["/og?title=Somanath%20Studio"],
  },
  icons: {
    // No app/icon.png — that file convention ignored media and forced dark.
    // Browsers pick by prefers-color-scheme; SVG also switches via CSS.
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-dark-32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light-32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: [
      {
        url: "/apple-touch-dark.png",
        type: "image/png",
        sizes: "180x180",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/apple-touch-light.png",
        type: "image/png",
        sizes: "180x180",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://somanathkhadanga.com/#organization",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      logo: {
        "@type": "ImageObject",
        url: siteLogoUrl,
        width: 512,
        height: 512,
      },
      image: siteLogoUrl,
      description:
        "SaaS development partner for founders, agencies, freelancers and consultants. Next.js, Node.js and AI SaaS. White-label and NDA-friendly.",
      email: CONTACT_EMAIL,
      telephone: PHONE_E164,
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      founder: {
        "@type": "Person",
        "@id": "https://somanathkhadanga.com/#person",
        name: "Somanath Khadanga",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: PHONE_E164,
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://somanathkhadanga.com/#person",
      name: "Somanath Khadanga",
      url: "https://somanathkhadanga.com/about",
      image: PERSON_IMAGE,
      jobTitle: "SaaS Engineer and Studio Lead",
      worksFor: {
        "@id": "https://somanathkhadanga.com/#organization",
      },
      sameAs: [...PERSON_SAME_AS],
    },
    {
      "@type": "WebSite",
      "@id": "https://somanathkhadanga.com/#website",
      name: "Somanath Studio",
      url: "https://somanathkhadanga.com",
      publisher: {
        "@id": "https://somanathkhadanga.com/#organization",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <AnalyticsProvider>
          {children}
          <SiteHelper />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
