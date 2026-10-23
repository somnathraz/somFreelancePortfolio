import Link from "next/link";
import { SelectedWork } from "@/components/SelectedWork";
import { CurrentlyWorkingOn } from "@/components/CurrentlyWorkingOn";
import { ProfessionalExperience } from "@/components/ProfessionalExperience";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

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
    const schema = [
        webPageJsonLd({
            path: "/case-studies",
            name: "Case Studies",
            description:
                "Examples of SaaS MVP builds, performance optimization, and production-grade improvements.",
            type: "CollectionPage",
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
        ]),
        itemListJsonLd({
            path: "/case-studies",
            name: "Case studies",
            description:
                "Selected SaaS MVP, performance, and production-readiness case studies.",
            items: [
                {
                    name: "VGT — Video generation platform",
                    path: "/case-studies/vgt",
                    description: "SaaS MVP and production delivery for video generation workflows.",
                },
                {
                    name: "Outspokn — AI learning product",
                    path: "/case-studies/outspokn",
                    description: "AI SaaS engineering and product delivery.",
                },
                {
                    name: "Studio booking platform",
                    path: "/case-studies/studio-booking-platform",
                    description: "Booking and operations SaaS for studio businesses.",
                },
                {
                    name: "PaperChai Invoice",
                    path: "/case-studies/paperchai-invoice",
                    description: "Invoice and billing product work for PaperChai.",
                },
                {
                    name: "PaperChai",
                    path: "/case-studies/paperchai",
                    description: "AI website and booking SaaS — live product.",
                },
            ],
        }),
    ];

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <JsonLd data={schema} />
            <Navbar />

            <section className="relative z-10 border-b border-white/5 bg-black pt-28 pb-12 md:pt-32 md:pb-16">
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                        Case studies
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-6">
                        Live products. Real client work. No fluff.
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        Open them yourself:{" "}
                        <a
                            href="https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline underline-offset-4"
                        >
                            Outspokn on Google Play
                        </a>
                        ,{" "}
                        <a
                            href="https://vgt-silk.vercel.app/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline underline-offset-4"
                        >
                            VGT live demo
                        </a>
                        ,{" "}
                        <a
                            href="https://app.paperchaiapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline underline-offset-4"
                        >
                            PaperChai Invoice
                        </a>
                        — plus more case studies below.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="bg-white text-black hover:bg-zinc-200">
                            <Link href="/contact">Talk to an Engineer</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white">
                            <Link href="/projects/paperchai">PaperChai case study</Link>
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                        <Link
                            href="/case-studies/outspokn"
                            className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                            Outspokn — AI English learning
                        </Link>
                        <Link
                            href="/case-studies/vgt"
                            className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                            VGT — Truck logistics &amp; payments
                        </Link>
                        <Link
                            href="/case-studies/paperchai-invoice"
                            className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                            PaperChai Invoice
                        </Link>
                        <Link
                            href="/case-studies/studio-booking-platform"
                            className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                            Calendar booking
                        </Link>
                        <Link
                            href="#professional-experience"
                            className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                            Professional experience
                        </Link>
                        <Link
                            href="#adaptive-agent-ui"
                            className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-violet-300 transition-colors hover:border-violet-400/50 hover:text-violet-200"
                        >
                            Building: Adaptive Agent UI
                        </Link>
                        <Link
                            href="#ai-booking-inventory"
                            className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-violet-300 transition-colors hover:border-violet-400/50 hover:text-violet-200"
                        >
                            Building: AI Booking &amp; Inventory
                        </Link>
                    </div>
                </div>
            </section>

            <CurrentlyWorkingOn />

            <SelectedWork hideIntro />

            <ProfessionalExperience />

            <Footer />
            <MobileNav />
        </main>
    );
}
