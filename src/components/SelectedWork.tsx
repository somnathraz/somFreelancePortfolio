import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ProjectDetail } from "@/components/showcase/ProjectDetail";

type SelectedWorkProps = {
    /** When true, omits the section title and intro (e.g. case-studies page provides its own hero). */
    hideIntro?: boolean;
};

export function SelectedWork({ hideIntro = false }: SelectedWorkProps) {
    const cards = data.map((card, index) => (
        <Card key={card.src ?? `${card.title}-${index}`} card={card} index={index} />
    ));

    return (
        <div className="relative w-full py-8 md:py-24 px-4 overflow-hidden bg-black">
            {!hideIntro && (
                <div className="flex flex-col items-center gap-4 text-center z-10 mb-6 md:mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Selected client work
                    </h2>
                    <p className="text-zinc-400 max-w-lg">
                        <span className="font-semibold text-white">
                            A few examples of the work I do most: SaaS MVP builds, performance fixes, and production-grade product improvements.
                        </span>
                        <br />
                        Most client work is under NDA, so I share deeper details during calls.
                    </p>
                </div>
            )}

            <Carousel items={cards} />

            {/* Case Study Strip */}
            <div className="w-full max-w-7xl mx-auto mt-20 border-y border-white/5 py-8">
                <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-10">
                    Results that moved the needle
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            60% <ArrowDown className="w-6 h-6 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Latency Reduced</span>
                        <span className="text-[11px] text-zinc-400">on backend-heavy product flows</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white">21 Days</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">MVP Launch</span>
                        <span className="text-[11px] text-zinc-400">for an early-stage startup</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            15m <span className="text-zinc-600">→</span> 3m
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Build Time</span>
                        <span className="text-[11px] text-zinc-400">via CI/CD optimization</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            15% <ArrowUp className="w-6 h-6 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Conversion Lift</span>
                        <span className="text-[11px] text-zinc-400">from checkout and UX improvements</span>
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
        category: "Full-stack engineer • Scalability, checkout, growth-ready architecture",
        title: "Seafood e-commerce platform",
        src: "/images/project-7.png",
        alt: "Seafood e-commerce platform — storefront and commerce flow",
        content: <ProjectDetail
            image="/images/project-7.png"
            title="Seafood e-commerce platform."
            description="Built a scalable storefront and backend flow for a growing commerce business, with performance-focused UX and smoother purchase flow."
            stack={["Next.js", "Tailwind CSS", "Secure Payments", "Admin Interface"]}
        >
            <div className="mt-8 space-y-8 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Executive Summary</h4>
                    <p>
                        Focus: scalability, checkout experience, and growth-ready architecture — a performance-driven commerce flow built for real operations and repeat purchases.
                    </p>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Strategic Objectives</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Deliver frictionless shopping experience</li>
                        <li>Integrate secure payment processing</li>
                        <li>Build real-time order tracking capability</li>
                        <li>Provide admin-level operational control</li>
                        <li>Maintain mobile-first performance under load</li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Engineering Approach</h4>
                    <div className="space-y-4">
                        <div>
                            <strong className="block text-neutral-900 dark:text-neutral-200">1️⃣ Complete Commerce Workflow</strong>
                            <p>Implemented category-based browsing, dynamic product management, cart/checkout flow, and order lifecycle tracking.</p>
                        </div>
                        <div>
                            <strong className="block text-neutral-900 dark:text-neutral-200">2️⃣ Admin & Operations Control</strong>
                            <p>Developed a backend dashboard for inventory adjustments, real-time order visibility, and status management.</p>
                        </div>
                        <div>
                            <strong className="block text-neutral-900 dark:text-neutral-200">3️⃣ Performance Optimization</strong>
                            <p>Leveraged Next.js for optimized rendering and SEO-friendly page structure to ensure fast load performance across devices.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Outcomes</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Production-ready commerce platform</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Structured backend control</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Secure transaction handling</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Mobile-first user experience</li>
                    </ul>
                </section>

                <div className="pt-4">
                    <a href="https://localboynaniseafoods.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Visit Live Platform →
                    </a>
                </div>
            </div>
        </ProjectDetail>,
    },
    {
        category: "AI engineer • Workflow automation, internal tools, ops efficiency",
        title: "Invoice automation workflow",
        src: "/images/Project-1.png",
        alt: "Invoice automation workflow for fintech operations",
        content: <ProjectDetail
            image="/images/Project-1.png"
            title="Invoice automation workflow."
            description="Designed an AI-assisted billing workflow for a fintech operations team to reduce manual effort and speed up invoice handling."
            stack={["Gemini 1.5", "Next.js", "Slack API", "Stripe Connect"]}
        >
            <div className="mt-6">
                <a href="/blog/paperchai-from-idea-to-running-saas" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline text-lg">
                    Read the deep dive blog case study →
                </a>
            </div>
        </ProjectDetail>,
    },
    {
        category: "Frontend lead • Fast rendering, discoverability, polished UX",
        title: "AI tools directory platform",
        src: "/images/project-2.png",
        alt: "AI tools directory — fast catalog and discovery UX",
        content: <ProjectDetail
            image="/images/project-2.png"
            title="AI tools directory platform."
            description="Built a fast frontend experience for a media-style product designed to showcase and organize a large catalog of AI tools."
            stack={["React", "Framer Motion", "Algolia", "Vercel Edge"]}
        />,
    },
    {
        category: "Full-stack engineer • DevTools UX, AI-assisted workflows, product delivery",
        title: "AI code review assistant",
        src: "/images/project-3.png",
        alt: "AI code review assistant — developer workflow tooling",
        content: <ProjectDetail
            image="/images/project-3.png"
            title="AI code review assistant."
            description="Worked on an AI-powered developer tool that helps teams review code faster and improve engineering workflow."
            stack={["Python", "GitHub Actions", "OpenAI API", "Redis"]}
        />,
    },
    {
        category: "Performance engineer • Rendering performance, large datasets, frontend scalability",
        title: "High-throughput image wall",
        src: "/images/project-4.png",
        alt: "High-throughput image wall — large-volume gallery performance",
        content: <ProjectDetail
            image="/images/project-4.png"
            title="High-throughput image wall."
            description="Engineered a high-performance gallery experience capable of handling large image volumes without degrading usability."
            stack={["React Virtualized", "WebGL", "Next.js", "CDN Optimization"]}
        />,
    },
    {
        category: "Private work • SaaS, automation, internal tools, performance",
        title: "30+ additional projects under NDA",
        bgClass: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700", // Vibrant gradient
        content: <ProjectDetail
            image="" // No image needed handled by component logic if empty or check ProjectDetail implementation
            title="30+ additional projects under NDA."
            description="Private work across SaaS, automation, internal tools, and performance-focused product delivery for founders and growing teams."
            stack={["SaaS", "AI", "Performance", "DevOps"]}
        />,
    },
];
