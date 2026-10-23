import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutPageClient } from "@/components/AboutPageClient";
import { JsonLd } from "@/components/JsonLd";
import {
    breadcrumbJsonLd,
    personJsonLd,
    profilePageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
    title: "Somanath Khadanga — SaaS Engineer and Studio Lead",
    description:
        "Somanath leads a flexible software engineering studio. Clients work directly with experienced engineers, with specialists added according to product requirements.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "Somanath Khadanga — SaaS Engineer and Studio Lead",
        description:
            "Founder-led engineering studio with a flexible senior team for SaaS products.",
        url: "/about",
        type: "profile",
        images: [
            {
                url: "/og?title=About%20Somanath%20Khadanga",
                width: 1200,
                height: 630,
                alt: "Somanath Khadanga — SaaS Engineer and Studio Lead",
            },
        ],
    },
};

export default function AboutPage() {
    const schema = [
        profilePageJsonLd({
            path: "/about",
            name: "About Somanath Khadanga",
            description:
                "Somanath leads a flexible software engineering studio. Clients work directly with experienced engineers.",
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
        ]),
        personJsonLd(),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <Navbar />
            <main className="bg-black min-h-screen">
                <AboutPageClient />
            </main>
            <Footer />
        </>
    );
}
