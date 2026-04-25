import { BookingPage } from "@/components/BookingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Call — Somanath Studio",
    description: "Book a 60-minute call to scope your SaaS project. Bring the messy version — the call works better that way.",
    alternates: {
        canonical: "/book",
    },
    openGraph: {
        title: "Book a Call — Somanath Studio",
        description: "Book a 60-minute call to scope your SaaS project. Bring the messy version — the call works better that way.",
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
        description: "Book a 60-minute call to scope your SaaS project. Bring the messy version — the call works better that way.",
        images: ["/og?title=Book%20a%20Call"],
    },
};

export default function BookPage() {
    const bookingJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                name: "Book a Call",
                url: "https://somanathkhadanga.com/book",
                description: "Book a 60-minute call to scope your SaaS project. Bring the messy version — the call works better that way.",
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://somanathkhadanga.com/",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Book a Call",
                        item: "https://somanathkhadanga.com/book",
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingJsonLd) }}
            />
            <BookingPage />
        </>
    );
}
