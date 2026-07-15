import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutPageClient } from "@/components/AboutPageClient";

export const metadata: Metadata = {
    title: "About — Somnath Khadanga | Full-Stack SaaS Engineer",
    description:
        "4+ years building production SaaS systems. SDE4 at IQVIA after ABInBev. Previously Learnbay and Skillslash. Next.js, React, Node.js, MongoDB, and AI-powered applications.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Somnath Khadanga — Full-Stack SaaS Engineer",
        description:
            "4+ years building production SaaS systems. Currently SDE4 at IQVIA (after ABInBev). Next.js, React, Node.js, and AI-powered applications.",
        url: "/about",
        type: "profile",
        images: [
            {
                url: "/og?title=About%20Somnath%20Khadanga",
                width: 1200,
                height: 630,
                alt: "Somnath Khadanga — Full-Stack SaaS Engineer",
            },
        ],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Somnath Khadanga",
    jobTitle: "Software Development Engineer 4",
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
        name: "IQVIA",
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
