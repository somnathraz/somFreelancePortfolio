import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrapsHome } from "@/components/labs/traps/TrapsHome";
import { getStandaloneLinks } from "@/lib/library-nav";
import { getAllTracks } from "@/lib/systems";
import { JsonLd } from "@/components/JsonLd";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "Interview Traps: Learn System Design by Watching It Break | Somanath Studio Labs";
const DESCRIPTION =
    "System design tracks that teach the design, break it with the bugs interviewers ask about, then have you build it. Start with the URL shortener.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/labs/traps" },
    openGraph: {
        title: "Interview Traps: replay the bug, then the fix",
        description: DESCRIPTION,
        url: "/labs/traps",
        siteName: "Somanath Studio",
        type: "website",
        images: [{ url: "/og?title=Interview%20Traps%3A%20replay%20the%20bug", width: 1200, height: 630, alt: "Interview Traps" }],
    },
};

export default function TrapsIndexPage() {
    const standalone = getStandaloneLinks();
    const schema = [
        webPageJsonLd({ path: "/labs/traps", name: "Interview Traps", description: DESCRIPTION, type: "CollectionPage" }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
        ]),
        itemListJsonLd({
            path: "/labs/traps",
            name: "Interview traps",
            description: DESCRIPTION,
            items: [
                ...getAllTracks().map((track) => ({ name: track.title, path: `/labs/systems/${track.id}`, description: track.tagline })),
                ...standalone.map((link) => ({ name: link.title, path: link.href, description: link.description })),
            ],
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <TrapsHome standalone={standalone} repoUrl={TRAPS_REPO_URL} />
                <Footer />
            </main>
        </>
    );
}
