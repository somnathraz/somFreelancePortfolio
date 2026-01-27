import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://www.somanathkhadanga.com"),
  title: "Somanath Studio — High-Performance SaaS Engineering & Development",
  description: "Senior freelance engineer specializing in building and scaling production SaaS systems, performance optimization, and AI-powered applications. 4+ years of industry experience.",
  keywords: ["saas development", "high performance web applications", "freelance saas engineer", "scalable software architecture", "ai powered applications", "next.js node.js mongodb"],
  openGraph: {
    title: "High-Performance SaaS Engineering — Somanath Studio",
    description: "Technical partner for founders building production-grade SaaS systems. Performance-focused, scalable, and built to last.",
    type: "website",
    locale: "en_US",
    url: "https://www.somanathkhadanga.com",
    siteName: "Somanath Studio",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or user provides one
        width: 1200,
        height: 630,
        alt: "Somanath Studio — High-Performance SaaS Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Performance SaaS Engineering — Somanath Studio",
    description: "Senior freelance engineer helping founders build fast, scalable SaaS products.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Somanath Studio",
  "url": "https://www.somanathkhadanga.com",
  "description": "High-performance SaaS engineering studio specializing in scalable, production-grade software.",
  "founder": {
    "@type": "Person",
    "name": "Somanath"
  }
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
        {children}
      </body>
    </html>
  );
}
