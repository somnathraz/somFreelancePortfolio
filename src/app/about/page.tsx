import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutPageClient } from "@/components/AboutPageClient";

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

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Somanath Khadanga",
    jobTitle: "SaaS Engineer and Studio Lead",
    url: "https://somanathkhadanga.com",
    image: "https://somanathkhadanga.com/images/somnath-about.jpg",
    sameAs: [
        "https://www.linkedin.com/in/somnath-khadanga/",
        "https://github.com/somnathraz",
        "https://www.instagram.com/codewithsom",
        "https://www.youtube.com/@progammingtech4141",
    ],
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "BPUT, Odisha",
    },
    knowsAbout: [
        "Next.js", "React.js", "Node.js", "MongoDB", "TypeScript", "AI SaaS Development",
        "Healthcare technology", "Data visualisation",
    ],
    worksFor: {
        "@type": "Organization",
        name: "Somanath Studio",
    },
};

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="bg-black min-h-screen">
                <AboutPageClient />
            </main>
            <Footer />
        </>
    );
}
