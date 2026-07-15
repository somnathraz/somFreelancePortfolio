"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ProjectDetail } from "@/components/showcase/ProjectDetail";
import { useHelperStore } from "@/features/visitor-guide/helper-store";

type SelectedWorkProps = {
    /** When true, omits the section title and intro (e.g. case-studies page provides its own hero). */
    hideIntro?: boolean;
};

export function SelectedWork({ hideIntro = false }: SelectedWorkProps) {
    const [mounted, setMounted] = useState(false);
    const selectedJourneyId = useHelperStore((state) => state.selectedJourneyId);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getSortedData = () => {
        if (!mounted || !selectedJourneyId) return data;

        let priorityIds: string[] = [];
        if (selectedJourneyId === "build-saas") {
            priorityIds = ["paperchai", "paperchai-invoice", "vgt", "outspokn"];
        } else if (selectedJourneyId === "add-ai") {
            priorityIds = ["outspokn", "paperchai-invoice", "ai-code-review", "ai-tools-directory"];
        } else if (selectedJourneyId === "improve-product") {
            priorityIds = ["vgt", "studio-booking", "localboynaniseafoods", "image-wall"];
        } else if (selectedJourneyId === "evaluate-experience") {
            priorityIds = ["paperchai", "paperchai-invoice", "outspokn", "vgt", "studio-booking"];
        } else if (selectedJourneyId === "explore") {
            priorityIds = ["paperchai", "paperchai-invoice", "outspokn", "vgt", "studio-booking"];
        }

        return [...data].sort((a, b) => {
            const indexA = priorityIds.indexOf(a.projectId);
            const indexB = priorityIds.indexOf(b.projectId);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
        });
    };

    const sortedData = getSortedData();
    const cards = sortedData.map((card, index) => (
        <Card key={card.src ?? `${card.title}-${index}`} card={card} index={index} />
    ));

    return (
        <div className="relative w-full py-8 md:py-24 px-4 overflow-hidden bg-black">
            {!hideIntro && (
                <div className="flex flex-col items-center gap-4 text-center z-10 mb-6 md:mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Selected work
                    </h2>
                    <p className="text-zinc-400 max-w-lg">
                        <span className="font-semibold text-white">
                            Live products you can open today — Google Play, demos and production
                            apps — plus a few personal experiments.
                        </span>
                        <br />
                        Click any card for the full breakdown.
                    </p>
                </div>
            )}

            <Carousel items={cards} />

            {/* Stats Strip */}
            <div className="w-full max-w-7xl mx-auto mt-20 border-y border-white/5 py-8">
                <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-10">
                    By the numbers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white">Live</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Founder SaaS</span>
                        <span className="text-[11px] text-zinc-400">PaperChai — profile to website</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            120 min <ArrowDown className="w-5 h-5 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Delivery SLA</span>
                        <span className="text-[11px] text-zinc-400">LocalSeafood — shore to door</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white">3 Cities</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Live Coverage</span>
                        <span className="text-[11px] text-zinc-400">Bangalore, Hyderabad, Chennai</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            5+ <ArrowUp className="w-5 h-5 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Live products</span>
                        <span className="text-[11px] text-zinc-400">Play Store · demos · production apps</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-zinc-300">
                    Want to see the most relevant examples for your product?{" "}
                    <a href="/book" className="text-white underline underline-offset-4 hover:text-zinc-300">
                        Book a call
                    </a>
                    .
                </p>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-0"></div>
        </div>
    );
}

const data = [
    {
        projectId: "paperchai-invoice",
        category: "Live · Chat-to-invoice · WhatsApp / Slack",
        title: "PaperChai Invoice — Money Autopilot",
        src: "/images/project-8.png",
        alt: "PaperChai Invoice — create invoices from chat and track payments",
        content: (
            <ProjectDetail
                image="/images/project-8.png"
                imageAspect="phone"
                title="PaperChai Invoice."
                description="Message the bot on WhatsApp, Slack or chat — it creates the invoice, queues it, tracks payment, sends reminders and keeps projects organised."
                stack={["WhatsApp", "Slack", "Invoice queue", "Payment tracking", "Reminders"]}
            >
                <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                    <section>
                        <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                            What it does
                        </h4>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Create invoices from WhatsApp, Slack or a normal message</li>
                            <li>Queue invoices and track payment status</li>
                            <li>Smart reminders — and project billing in one place</li>
                        </ul>
                    </section>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="/case-studies/paperchai-invoice"
                            className="inline-flex items-center gap-2 font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                            Read the full case study →
                        </a>
                        <a
                            href="https://app.paperchaiapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-medium text-neutral-600 hover:underline dark:text-neutral-300"
                        >
                            Open live app → app.paperchaiapp.com
                        </a>
                    </div>
                </div>
            </ProjectDetail>
        ),
    },
    {
        projectId: "studio-booking",
        category: "Client · Calendar booking SaaS",
        title: "Calendar Booking System",
        src: "/images/project-11.png",
        alt: "Calendar booking system — scheduling dashboard",
        content: (
            <ProjectDetail
                image="/images/project-11.png"
                images={[
                    {
                        src: "/images/project-11.png",
                        alt: "Calendar booking — scheduling dashboard",
                    },
                    {
                        src: "/images/project-11-part-1.png",
                        alt: "Calendar booking — admin and booking views",
                    },
                ]}
                title="Calendar booking system."
                description="Real-time slot availability, Stripe checkout and admin dashboard — fewer scheduling errors and clearer payment tracking for studios."
                stack={["Next.js", "Node.js", "TypeScript", "MongoDB", "Stripe"]}
            >
                <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                    <section>
                        <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                            What it does
                        </h4>
                        <p>
                            Replaces WhatsApp + spreadsheet scheduling with one booking surface —
                            availability, payments and day-to-day admin.
                        </p>
                    </section>
                    <div className="pt-2">
                        <a
                            href="/case-studies/studio-booking-platform"
                            className="inline-flex items-center gap-2 font-medium text-sky-600 hover:underline dark:text-sky-400"
                        >
                            Read the full case study →
                        </a>
                    </div>
                </div>
            </ProjectDetail>
        ),
    },
    {
        projectId: "outspokn",
        category: "Live on Google Play · AI learning · React Native",
        title: "Outspokn — AI English Learning",
        src: "/images/outspokn-1.webp",
        alt: "Outspokn — AI English learning mobile app",
        content: (
            <ProjectDetail
                image="/images/outspokn-1.webp"
                imageAspect="phone"
                images={[
                    {
                        src: "/images/outspokn-1.webp",
                        alt: "Outspokn — home and lesson flow",
                    },
                    {
                        src: "/images/outspokn2.webp",
                        alt: "Outspokn — practice and speaking",
                    },
                    {
                        src: "/images/outspokn3.webp",
                        alt: "Outspokn — learning tracks and courses",
                    },
                ]}
                title="Outspokn."
                description="AI English learning app with React Native and Django. Open LLMs, tuned RAG retrieval and courses tailored to each student’s learning tracks."
                stack={["React Native", "Python", "Django", "Open LLMs", "RAG"]}
            >
                <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                    <section>
                        <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                            What it does
                        </h4>
                        <p>
                            Adaptive English practice powered by open models and retrieval over course
                            content — so lessons follow the student’s learning track instead of a
                            static syllabus.
                        </p>
                    </section>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="/case-studies/outspokn"
                            className="inline-flex items-center gap-2 font-medium text-violet-600 hover:underline dark:text-violet-400"
                        >
                            Read the full case study →
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.outspokn&hl=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-medium text-neutral-600 hover:underline dark:text-neutral-300"
                        >
                            Get on Google Play →
                        </a>
                    </div>
                </div>
            </ProjectDetail>
        ),
    },
    {
        projectId: "vgt",
        category: "Live demo · Logistics · Payments & tracking",
        title: "VGT — Truck Logistics Ops",
        src: "/images/project-10.png",
        alt: "VGT — truck logistics and payment management",
        content: (
            <ProjectDetail
                image="/images/vgt-1.png"
                imageAspect="phone"
                images={[
                    {
                        src: "/images/vgt-1.png",
                        alt: "VGT — ticketing and operations",
                    },
                    {
                        src: "/images/vgt-2.png",
                        alt: "VGT — payments, challan and tracking",
                    },
                ]}
                title="VGT."
                description="Ticketing, challans and payment management for delivery fleets — truck tracking, drivers and money inflow/outflow in one ops product."
                stack={["Ticketing", "Challans", "Payments", "Truck tracking", "Driver cash flow"]}
            >
                <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                    <section>
                        <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                            What it does
                        </h4>
                        <p>
                            Field and finance share one system for tickets, challans, truck status and
                            payment movement — instead of WhatsApp reconciliations.
                        </p>
                    </section>
                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
                        <NextImage
                            src="/images/project-10.png"
                            alt="VGT Transport Management System — desktop"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 640px"
                        />
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="/case-studies/vgt"
                            className="inline-flex items-center gap-2 font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                            Read the full case study →
                        </a>
                        <a
                            href="https://vgt-silk.vercel.app/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-medium text-neutral-600 hover:underline dark:text-neutral-300"
                        >
                            Open live demo →
                        </a>
                    </div>
                </div>
            </ProjectDetail>
        ),
    },
    {
        projectId: "localboynaniseafoods",
        category: "Full-stack • Live production app — real business, real orders",
        title: "LocalBoyNani Seafoods",
        src: "/images/project-7.png",
        alt: "LocalBoyNani Seafoods — premium seafood delivery platform",
        content: <ProjectDetail
            image="/images/project-7.png"
            title="LocalBoyNani Seafoods."
            description="Full-stack e-commerce platform for a live seafood delivery business. Chemical-free fish sourced from coastal fishermen, delivered in 120 minutes across Bangalore, Hyderabad & Chennai."
            stack={["Next.js", "Tailwind CSS", "Cloudflare R2", "Node.js", "Secure Payments"]}
        >
            <div className="mt-8 space-y-8 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">What it is</h4>
                    <p>
                        A production e-commerce platform for a real business — not a demo. The site takes live orders, manages inventory, tracks deliveries, and handles B2B bulk enquiries. Built and maintained solo.
                    </p>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">What I built</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Category browsing, product management, cart & checkout flow</li>
                        <li>Admin dashboard — inventory, real-time order visibility, status management</li>
                        <li>Secure payment processing integration</li>
                        <li>120-min delivery promise UX with order tracking</li>
                        <li>B2B bulk ordering with custom quote flow</li>
                        <li>Cloudflare R2 CDN for fast image delivery</li>
                        <li>JSON-LD structured data for SEO</li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Result</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Live and taking orders</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Multi-city coverage</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Secure payment handling</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Mobile-first, SEO-indexed</li>
                    </ul>
                </section>

                <div className="pt-4">
                    <a href="https://localboynaniseafoods.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                        Visit live platform → localboynaniseafoods.com
                    </a>
                </div>
            </div>
        </ProjectDetail>,
    },
    {
        projectId: "paperchai",
        category: "Founder Project · SaaS · AI — India-first",
        title: "PaperChai — Profile to Website",
        src: "/images/Project-1.png",
        alt: "PaperChai — Google profile to booking-ready website",
        content: <ProjectDetail
            image="/images/Project-1.png"
            title="PaperChai."
            description="India-first profile-to-website builder. Turns Google Business profiles, visiting cards, documents and social sources into booking-ready one-page websites — with WhatsApp, scheduling, and review-before-publish."
            stack={["Next.js", "TypeScript", "PostgreSQL", "AI APIs", "Razorpay"]}
        >
            <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">The problem</h4>
                    <p>Small businesses are online, but their information is scattered across Google Maps, Instagram and WhatsApp. Website builders still start from a blank page. PaperChai starts from what they already have.</p>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">What it does</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Import from Google Business / Maps (primary launch source)</li>
                        <li>AI-assisted content and multi-template one-page sites</li>
                        <li>Review-before-publish, edit and republish on the same URL</li>
                        <li>WhatsApp, email booking, calendar embeds and native scheduling</li>
                        <li>Wildcard subdomains and owner custom domains</li>
                    </ul>
                </section>

                <div className="pt-2 flex flex-wrap gap-4">
                    <a href="/projects/paperchai" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:underline">
                        Read the full case study →
                    </a>
                    <a href="https://paperchaiapp.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300 font-medium hover:underline">
                        Visit PaperChai →
                    </a>
                </div>
            </div>
        </ProjectDetail>,
    },
    {
        projectId: "ai-tools-directory",
        category: "Personal project • Frontend engineering, search UX",
        title: "AI tools directory",
        src: "/images/project-2.png",
        alt: "AI tools directory — catalog and discovery UX",
        content: <ProjectDetail
            image="/images/project-2.png"
            title="AI tools directory."
            description="Personal project — a fast, searchable directory for discovering AI tools. Built to explore search UX patterns and high-performance frontend rendering for large catalogs."
            stack={["React", "Framer Motion", "Algolia", "Vercel Edge"]}
        />,
    },
    {
        projectId: "ai-code-review",
        category: "Personal project • AI-assisted developer tooling",
        title: "AI code review assistant",
        src: "/images/project-3.png",
        alt: "AI code review assistant — developer workflow tooling",
        content: <ProjectDetail
            image="/images/project-3.png"
            title="AI code review assistant."
            description="Personal project — an AI-powered tool that integrates with GitHub to surface code review suggestions automatically. Built to explore LLM-in-the-loop developer workflows."
            stack={["Python", "GitHub Actions", "OpenAI API", "Redis"]}
        />,
    },
    {
        projectId: "image-wall",
        category: "Personal project • Rendering performance, large-scale galleries",
        title: "High-throughput image wall",
        src: "/images/project-4.png",
        alt: "High-throughput image wall — large-volume gallery performance",
        content: <ProjectDetail
            image="/images/project-4.png"
            title="High-throughput image wall."
            description="Personal project — a high-performance gallery built to handle thousands of images without degrading UX. Explores virtualization, WebGL rendering, and CDN-backed delivery."
            stack={["React Virtualized", "WebGL", "Next.js", "CDN Optimization"]}
        />,
    },
];
