import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "SaaS Development Services & Company | Somanath Studio";
const description =
    "SaaS development services for startups and product teams in the US, UK and India: MVP builds, AI features, performance work and production hardening, led by a senior engineer.";

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "SaaS development services",
        "SaaS development company",
        "SaaS application development services",
        "custom SaaS development",
        "SaaS product development company",
        "SaaS developer for hire",
        "SaaS development India",
    ],
    alternates: { canonical: "/services/saas-development" },
    openGraph: {
        title,
        description,
        url: "/services/saas-development",
        type: "website",
        images: [
            {
                url: "/og?title=SaaS%20Development%20Services",
                width: 1200,
                height: 630,
                alt: "SaaS development services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og?title=SaaS%20Development%20Services"],
    },
};

const stages = [
    {
        name: "Build the first version",
        href: "/services/saas-mvp-development",
        text: "Scope the core workflow, then ship auth, billing, admin tools and a deployable product in a few weeks.",
    },
    {
        name: "Add AI where it earns its place",
        href: "/services/ai-saas-development",
        text: "Practical AI features with evaluation, cost limits and fallbacks, not demos that fall over in production.",
    },
    {
        name: "Fix what is slow",
        href: "/services/nextjs-performance-optimization",
        text: "Core Web Vitals, caching and database bottlenecks in an existing Next.js product.",
    },
    {
        name: "Harden before real traffic",
        href: "/services/production-readiness-upgrade",
        text: "Security, observability, background jobs and rollback plans for MVPs that outgrew their first build.",
    },
    {
        name: "Build wider business software",
        href: "/services/custom-software-development",
        text: "Internal tools, booking systems and platforms that are not a classic SaaS template.",
    },
];

const faqs = [
    {
        question: "What do your SaaS development services cover?",
        answer:
            "Product scoping, architecture, full-stack build on Next.js and Node.js, billing and authentication, AI features, performance work and production hardening. You can hire one stage or the whole path.",
    },
    {
        question: "Do you work with clients in the US, UK and India?",
        answer:
            "Yes. Work is remote and scoped in writing before any build starts. Calls are scheduled around your timezone, and you own the repositories, accounts and infrastructure.",
    },
    {
        question: "Is this a SaaS development company or a single developer?",
        answer:
            "It is senior-led. You work directly with the engineer who builds, and additional specialists are added only when the scope needs them.",
    },
    {
        question: "How is pricing decided?",
        answer:
            "By scope. Auth, billing, admin tools and AI features change the budget, so a fixed scope and estimate come before work begins.",
    },
];

export default function SaasDevelopmentPage() {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "SaaS Development Services",
        serviceType: "SaaS development",
        provider: { "@id": "https://somanathkhadanga.com/#organization" },
        areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "India" },
        ],
        url: "https://somanathkhadanga.com/services/saas-development",
        description,
    };
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
    const crumbs = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "SaaS Development", path: "/services/saas-development" },
    ]);

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            {[serviceJsonLd, faqJsonLd, crumbs].map((data, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
            <Navbar />

            <section className="border-b border-white/5 px-4 pb-20 pt-28 text-center md:pt-32">
                <div className="mx-auto max-w-4xl space-y-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                        SaaS Development Services
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                        SaaS Development Services for Startups and Product Teams
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        From first MVP to a product that holds up under real users. Senior-led SaaS
                        application development for founders in the US, UK and India, with no agency
                        layers between you and the engineer.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black hover:bg-zinc-200"
                    >
                        Discuss Your SaaS Product
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </section>

            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Where you are in the product decides what you need
                    </h2>
                    <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                        {stages.map((stage) => (
                            <li key={stage.href} className="border-t border-white/10 pt-4">
                                <Link href={stage.href} className="font-semibold text-white hover:text-blue-400">
                                    {stage.name} →
                                </Link>
                                <p className="mt-2 text-sm text-zinc-400">{stage.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="border-b border-white/5 px-4 py-20">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Questions founders ask</h2>
                    <dl className="mt-8 space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question}>
                                <dt className="font-semibold text-white">{faq.question}</dt>
                                <dd className="mt-2 text-zinc-400">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-10 text-sm text-zinc-500">
                        Related reading:{" "}
                        <Link href="/blog/saas-mvp-cost-2026" className="text-blue-400 hover:text-blue-300">
                            what a SaaS MVP costs
                        </Link>
                        ,{" "}
                        <Link href="/blog/how-to-hire-saas-mvp-developer" className="text-blue-400 hover:text-blue-300">
                            how to hire a SaaS developer
                        </Link>{" "}
                        and{" "}
                        <Link href="/case-studies" className="text-blue-400 hover:text-blue-300">
                            case studies
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <Footer />
            <ClientMobileNav />
        </main>
    );
}
