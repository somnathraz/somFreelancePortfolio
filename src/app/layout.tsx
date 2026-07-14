import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { SiteHelper } from "@/components/ai-helper";

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
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://somanathkhadanga.com/#organization",
      "name": "Somanath Studio",
      "url": "https://somanathkhadanga.com",
      "logo": "https://somanathkhadanga.com/icon.svg",
      "description": "SaaS development partner for founders, agencies, freelancers and consultants. Next.js, Node.js and AI SaaS. White-label and NDA-friendly.",
      "founder": {
        "@type": "Person",
        "name": "Somanath Khadanga"
      }
    },
    {
      "@type": "Person",
      "name": "Somanath Khadanga",
      "url": "https://somanathkhadanga.com",
      "jobTitle": "SaaS Development Partner"
    },
    {
      "@type": "WebSite",
      "name": "Somanath Studio",
      "url": "https://somanathkhadanga.com",
      "publisher": {
        "@id": "https://somanathkhadanga.com/#organization"
      },
      "inLanguage": "en"
    }
  ]
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
