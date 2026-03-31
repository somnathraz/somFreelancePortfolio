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
                        Selected work
                    </h2>
                    <p className="text-zinc-400 max-w-lg">
                        <span className="font-semibold text-white">
                            Two live projects — one real client app, one personal SaaS — plus a few personal builds exploring AI and performance.
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
                        <span className="text-3xl font-bold text-white">11 Days</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">SaaS Shipped</span>
                        <span className="text-[11px] text-zinc-400">PaperChai — idea to production</span>
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
                            2 <ArrowUp className="w-5 h-5 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Live Projects</span>
                        <span className="text-[11px] text-zinc-400">Real products, real users</span>
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
        category: "Solo SaaS build • Idea to production in 11 days",
        title: "PaperChai — Invoicing SaaS",
        src: "/images/Project-1.png",
        alt: "PaperChai — invoicing and payment tracking SaaS",
        content: <ProjectDetail
            image="/images/Project-1.png"
            title="PaperChai."
            description="Invoice and payment tracking SaaS for freelancers and small businesses. Built solo to solve a real problem — scattered invoices, no cash-flow visibility, manual follow-ups. Shipped in 11 days."
            stack={["Next.js App Router", "TypeScript", "PostgreSQL", "Tailwind CSS"]}
        >
            <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">The problem</h4>
                    <p>Freelancers don&apos;t just need invoices — they need clarity. Existing tools were too complex, too expensive, or not designed for early-stage work. I built PaperChai to solve this with a minimal, business-first interface.</p>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">What shipped</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Dashboard with key financial metrics</li>
                        <li>Client management system</li>
                        <li>Invoice creation and tracking</li>
                        <li>Payment status — paid / pending / overdue</li>
                        <li>SEO-ready structure, production routing</li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Timeline</h4>
                    <div className="space-y-1 text-sm font-mono">
                        <p><span className="text-neutral-900 dark:text-white">Day 1–2</span> — Requirement analysis, data modeling</p>
                        <p><span className="text-neutral-900 dark:text-white">Day 3–6</span> — Dashboard, client & invoice flows</p>
                        <p><span className="text-neutral-900 dark:text-white">Day 7–10</span> — Payment tracking, status logic, UI polish</p>
                        <p><span className="text-neutral-900 dark:text-white">Day 11</span> — SEO, deployment, QA</p>
                    </div>
                </section>

                <div className="pt-2">
                    <a href="/blog/paperchai-from-idea-to-running-saas" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Read the full case study →
                    </a>
                </div>
            </div>
        </ProjectDetail>,
    },
    {
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
