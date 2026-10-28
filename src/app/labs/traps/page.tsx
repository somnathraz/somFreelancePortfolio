import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrapCatalogue } from "@/components/labs/traps/TrapCatalogue";
import { buildTrapCatalogue } from "@/lib/trap-catalogue";
import { JsonLd } from "@/components/JsonLd";
import { TRAPS_REPO_URL, getAllTraps } from "@/lib/traps";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

const TITLE = "Interview Traps: Backend Bugs You Can Replay Step by Step | Somanath Studio Labs";
const DESCRIPTION =
    "Race conditions, cache stampedes, pagination and idempotency bugs, replayed from real recorded runs. See the code, the database state and the exact moment it breaks.";

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
    const traps = getAllTraps();
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
            items: traps.map((t) => ({ name: t.title, path: `/labs/traps/${t.slug}`, description: t.question })),
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <Navbar />
                <TrapCatalogue topics={buildTrapCatalogue(traps)} repoUrl={TRAPS_REPO_URL} />
                <Footer />
            </main>
        </>
    );
}
