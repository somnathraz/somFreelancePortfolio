import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ProjectDetail } from "@/components/showcase/ProjectDetail";

export function SelectedWork() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="relative w-full py-8 md:py-24 px-4 overflow-hidden bg-black">
            <div className="flex flex-col items-center gap-4 text-center z-10 mb-6 md:mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                    Selected Work
                </h2>
                <p className="text-zinc-400 max-w-lg">
                    <span className="font-semibold text-white">A curated selection from 30+ client projects delivered over 4 years.</span>
                    <br />
                    Most work is under NDA. Full case studies shared on call.
                </p>
            </div>

            <Carousel items={cards} />

            {/* Case Study Strip */}
            <div className="w-full max-w-7xl mx-auto mt-20 border-y border-white/5 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            60% <ArrowDown className="w-6 h-6 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Latency Reduced</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white">21 Days</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">MVP Shipped</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            15m <span className="text-zinc-600">→</span> 3m
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Build Time Optimized</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <span className="text-3xl font-bold text-white flex items-center gap-2">
                            15% <ArrowUp className="w-6 h-6 text-emerald-500" />
                        </span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Conversion Rate</span>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-0"></div>
        </div>
    );
}

const data = [
    {
        category: "E-Commerce Engine • Scalability",
        title: "Local Boy Nani Seafoods",
        src: "/images/project-7.png",
        alt: "Local Boy Nani Seafoods - E-Commerce Platform Interface",
        content: <ProjectDetail
            image="/images/project-7.png"
            title="Local Boy Nani Seafoods."
            description="A complete digital commerce system streamlining online seafood delivery operations. Features real-time order tracking, admin operational control, and a frictionless shopping experience."
            stack={["Next.js", "Tailwind CSS", "Secure Payments", "Admin Interface"]}
        >
            <div className="mt-8 space-y-8 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Executive Summary</h4>
                    <p>
                        The challenge wasn’t just building a storefront. It was designing a performance-driven, operationally efficient e-commerce platform capable of supporting real-world logistics and order management.
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
        category: "Client: Fintech Automation • Role: AI Engineer",
        title: "Smart Invoice Agent",
        src: "/images/Project-1.png",
        alt: "Smart Invoice Agent - AI-Powered Billing System Interface",
        content: <ProjectDetail
            image="/images/Project-1.png"
            title="Smart Invoice Agent."
            description="An AI-powered billing system integrated with Slack and Notion. Automates invoice generation and client follow-ups using Gemini 1.5, reducing administrative time by 80%."
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
        category: "Client: Tech Media • Role: Frontend Lead",
        title: "AI Tools Directory",
        src: "/images/project-2.png",
        alt: "AI Tools Directory - High-Performance Showcase Platform",
        content: <ProjectDetail
            image="/images/project-2.png"
            title="AI Tools Directory."
            description="A high-performance showcase platform aggregating 500+ AI tools. Features real-time search, dynamic filtering, and interactive demos powered by Edge Functions."
            stack={["React", "Framer Motion", "Algolia", "Vercel Edge"]}
        />,
    },
    {
        category: "Client: DevTools Startup • Role: Full Stack",
        title: "AI Code Reviewer",
        src: "/images/project-3.png",
        alt: "AI Code Reviewer - Intelligent CI/CD Integration Dashboard",
        content: <ProjectDetail
            image="/images/project-3.png"
            title="AI Code Reviewer."
            description="Intelligent CI/CD integration that reviews Pull Requests automatically. Analyzes logic, security, and style issues before human review, accelerating merge cycles."
            stack={["Python", "GitHub Actions", "OpenAI API", "Redis"]}
        />,
    },
    {
        category: "Client: Digital Asset Platform • Role: Performance",
        title: "High-Throughput Image Wall",
        src: "/images/project-4.png",
        alt: "Infinite Image Wall - High-Performance Web Gallery rendering 10k+ images",
        content: <ProjectDetail
            image="/images/project-4.png"
            title="Infinite Image Wall."
            description="A high-performance gallery capable of rendering 10k+ images. Optimized with virtualization, aggressive caching, and WebGL for sub-60fps scrolling on all devices."
            stack={["React Virtualized", "WebGL", "Next.js", "CDN Optimization"]}
        />,
    },
    {
        category: "Client Projects (NDA)",
        title: "30+ More Projects",
        bgClass: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700", // Vibrant gradient
        content: <ProjectDetail
            image="" // No image needed handled by component logic if empty or check ProjectDetail implementation
            title="30+ Client Projects."
            description="From early-stage startups to enterprise systems. Expertise in SaaS, AI integrations, performance optimization, and DevOps pipelines."
            stack={["SaaS", "AI", "Performance", "DevOps"]}
        />,
    },
];
