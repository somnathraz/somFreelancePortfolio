import type { Metadata } from "next";
import { getAllTemplates } from "@/lib/templates";
import { LabsHero } from "@/components/labs/LabsHero";
import { FeaturedWork } from "@/components/labs/FeaturedWork";
import { LabsCta } from "@/components/labs/LabsCta";
import { LabsSmokeTrail } from "@/components/labs/LabsSmokeTrail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
    LABS_KEYWORDS,
    breadcrumbJsonLd,
    itemListJsonLd,
    webPageJsonLd,
} from "@/lib/seo";

const TITLE =
    "Labs — Interactive Websites, 3D Product Showcases & Free Templates | Somanath Studio";
const DESCRIPTION =
    "See interactive websites and 3D product showcases for brands and startups — plus free Next.js WebGL templates. Built for business owners who want a site that stands out, with open-source demos from Somanath Studio.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/labs" },
    keywords: [...LABS_KEYWORDS],
    openGraph: {
        title:
            "Labs — Interactive Websites & 3D Product Showcases for Business",
        description: DESCRIPTION,
        url: "/labs",
        siteName: "Somanath Studio",
        type: "website",
        images: [
            {
                url: "/og?title=Labs%20%E2%80%94%20Interactive%20Websites%20for%20Business",
                width: 1200,
                height: 630,
                alt: "Somanath Studio Labs — interactive websites for business",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title:
            "Labs — Interactive Websites & 3D Product Showcases for Business",
        description: DESCRIPTION,
        images: [
            "/og?title=Labs%20%E2%80%94%20Interactive%20Websites%20for%20Business",
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function LabsPage() {
    const templates = getAllTemplates();

    const schema = [
        webPageJsonLd({
            path: "/labs",
            name: "Labs — Interactive Web Experiences",
            description: DESCRIPTION,
            type: "CollectionPage",
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
        ]),
        itemListJsonLd({
            path: "/labs",
            name: "Featured Labs experiments",
            description:
                "Open-source Next.js WebGL and interactive web experiments from Somanath Studio.",
            items: templates.map((t) => ({
                name: t.frontmatter.title,
                path: `/templates/${t.slug}`,
                description: t.frontmatter.description,
            })),
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/20">
                <Navbar />
                <LabsSmokeTrail />
                <LabsHero />
                <FeaturedWork templates={templates} />
                <LabsCta />
                <Footer />
            </main>
        </>
    );
}
