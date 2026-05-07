import Link from "next/link";
import { SelectedWork } from "@/components/SelectedWork";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies — SaaS MVP, Performance & Production Readiness | Somanath Studio",
    description:
        "Examples of SaaS MVP builds, performance optimization, and production-grade improvements. Most client work is under NDA; book a call for the most relevant examples.",
    alternates: {
        canonical: "/case-studies",
    },
    openGraph: {
        title: "Case Studies — SaaS MVP, Performance & Production Readiness | Somanath Studio",
        description:
            "Examples of SaaS MVP builds, performance optimization, and production-grade improvements. Most client work is under NDA; book a call for the most relevant examples.",
        url: "/case-studies",
        type: "website",
        images: [
            {
                url: "/og?title=Case%20Studies",
                width: 1200,
                height: 630,
                alt: "Somanath Studio case studies",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Case Studies — SaaS MVP, Performance & Production Readiness | Somanath Studio",
        description:
            "Examples of SaaS MVP builds, performance optimization, and production-grade improvements. Most client work is under NDA; book a call for the most relevant examples.",
        images: ["/og?title=Case%20Studies"],
    },
};

export default function CaseStudiesPage() {
    const caseStudiesJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                name: "Case Studies",
                url: "https://somanathkhadanga.com/case-studies",
                description:
                    "Examples of SaaS MVP builds, performance optimization, and production-grade improvements.",
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://somanathkhadanga.com/",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Case Studies",
                        item: "https://somanathkhadanga.com/case-studies",
                    },
                ],
            },
        ],
    };

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
            />
            <Navbar />

            <section className="relative z-10 border-b border-white/5 bg-black pt-28 pb-12 md:pt-32 md:pb-16">
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                        Case studies
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-6">
                        Two live products. A few experiments. No fluff.
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        I&apos;m early in my freelance journey and I&apos;m not going to pad this page with
                        fictional case studies. Here&apos;s what&apos;s actually shipped and what I&apos;m working on.
                        For the most relevant examples to your project, the call is faster than a portfolio.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="bg-white text-black hover:bg-zinc-200">
                            <Link href="/book">Book a 20-minute strategy call</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white">
                            <Link href="/blog">Read the blog</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <SelectedWork hideIntro />

            <Footer />
            <MobileNav />
        </main>
    );
}
