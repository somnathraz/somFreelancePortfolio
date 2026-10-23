import { BookingPage } from "@/components/BookingPage";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Book a Call — Somanath Studio",
    description: "Book a free 20-minute strategy call with Somanath. Select a time that works for you.",
    alternates: {
        canonical: "/book",
    },
    openGraph: {
        title: "Book a Call — Somanath Studio",
        description: "Book a free 20-minute strategy call with Somanath. Select a time that works for you.",
        url: "/book",
        type: "website",
        images: [
            {
                url: "/og?title=Book%20a%20Call",
                width: 1200,
                height: 630,
                alt: "Book a call with Somanath Studio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book a Call — Somanath Studio",
        description: "Book a free 20-minute strategy call with Somanath. Select a time that works for you.",
        images: ["/og?title=Book%20a%20Call"],
    },
};

export default function BookPage() {
    const schema = [
        webPageJsonLd({
            path: "/book",
            name: "Book a Call",
            description:
                "Book a free 20-minute strategy call with Somanath. Select a time that works for you.",
        }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book a Call", path: "/book" },
        ]),
        serviceJsonLd({
            path: "/book",
            name: "Free strategy call",
            serviceType: "Consultation",
            description:
                "Free 20-minute strategy call to discuss SaaS MVP, performance, production readiness, or AI product work.",
        }),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <BookingPage />
        </>
    );
}
