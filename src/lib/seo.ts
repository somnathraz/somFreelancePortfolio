/**
 * Shared SEO helpers for metadata + JSON-LD.
 * Keep Labs keywords mid-tail — this is a new indexable surface on an
 * existing domain; avoid head terms we cannot realistically win yet.
 */

import { GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { siteLogoUrl } from "@/lib/site";

export const SITE_URL = "https://somanathkhadanga.com";
export const SITE_NAME = "Somanath Studio";
export const PERSON_NAME = "Somanath Khadanga";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog#blog`;
export const PERSON_IMAGE = `${SITE_URL}/images/somnath-about.jpg`;
export const PERSON_SAME_AS = [
    LINKEDIN_URL,
    GITHUB_URL,
    "https://www.instagram.com/codewithsom",
    "https://www.youtube.com/@progammingtech4141",
] as const;

export function absoluteUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical Person entity — reference via PERSON_ID elsewhere. */
export function personJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON_NAME,
        url: absoluteUrl("/about"),
        image: {
            "@type": "ImageObject",
            url: PERSON_IMAGE,
            width: 576,
            height: 576,
        },
        jobTitle: "SaaS Engineer and Studio Lead",
        description:
            "Founder of Somanath Studio. Builds SaaS MVPs, Next.js performance upgrades, and AI product features for founders and agencies.",
        sameAs: [...PERSON_SAME_AS],
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "BPUT, Odisha",
        },
        knowsAbout: [
            "Next.js",
            "React.js",
            "Node.js",
            "MongoDB",
            "TypeScript",
            "AI SaaS Development",
            "Healthcare technology",
            "Data visualisation",
        ],
        worksFor: {
            "@id": ORGANIZATION_ID,
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}

/** ProfilePage rich-result eligibility for person-focused pages. */
export function profilePageJsonLd({
    path,
    name,
    description,
}: {
    path: string;
    name: string;
    description: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        isPartOf: {
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: SITE_NAME,
            url: SITE_URL,
        },
        mainEntity: {
            "@id": PERSON_ID,
        },
        about: {
            "@id": PERSON_ID,
        },
        inLanguage: "en-US",
    };
}

export function blogPostingJsonLd({
    path,
    title,
    description,
    datePublished,
    dateModified,
    image,
    wordCount,
    keywords,
    category,
    relatedService,
}: {
    path: string;
    title: string;
    description: string;
    datePublished: string;
    dateModified: string;
    image: string;
    wordCount?: number;
    keywords?: string[];
    category?: string;
    relatedService?: string;
}) {
    const url = absoluteUrl(path);
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        name: title,
        description,
        datePublished,
        dateModified,
        ...(category ? { articleSection: category } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
        ...(typeof wordCount === "number" ? { wordCount } : {}),
        image: {
            "@type": "ImageObject",
            url: image,
            width: 1200,
            height: 630,
            caption: title,
            creator: {
                "@id": PERSON_ID,
            },
            creditText: PERSON_NAME,
            copyrightNotice: `© ${SITE_NAME}`,
        },
        url,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        author: {
            "@type": "Person",
            "@id": PERSON_ID,
            name: PERSON_NAME,
            url: absoluteUrl("/about"),
        },
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: siteLogoUrl,
                width: 512,
                height: 512,
            },
        },
        isPartOf: {
            "@type": "Blog",
            "@id": BLOG_ID,
            name: `${SITE_NAME} Blog`,
            url: absoluteUrl("/blog"),
            publisher: { "@id": ORGANIZATION_ID },
        },
        ...(relatedService
            ? {
                  about: {
                      "@type": "Service",
                      url: relatedService.startsWith("http")
                          ? relatedService
                          : absoluteUrl(relatedService),
                  },
              }
            : {}),
        isAccessibleForFree: true,
        inLanguage: "en-US",
    };
}

export function breadcrumbJsonLd(
    items: { name: string; path: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

/** FAQ rich results — only use when the same Q&A is visible on the page. */
export function faqPageJsonLd(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function serviceJsonLd({
    path,
    name,
    description,
    serviceType,
    keywords,
    areaServed,
}: {
    path: string;
    name: string;
    description: string;
    serviceType?: string;
    keywords?: string;
    /** Country names; omitted means worldwide. */
    areaServed?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        ...(serviceType ? { serviceType } : {}),
        description,
        url: absoluteUrl(path),
        provider: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        areaServed: areaServed
            ? areaServed.map((name) => ({ "@type": "Country", name }))
            : "Worldwide",
        inLanguage: "en",
        ...(keywords ? { keywords } : {}),
    };
}

export function webPageJsonLd({
    path,
    name,
    description,
    type = "WebPage",
}: {
    path: string;
    name: string;
    description: string;
    type?:
        | "WebPage"
        | "CollectionPage"
        | "ContactPage"
        | "AboutPage"
        | "ProfilePage";
}) {
    return {
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        isPartOf: {
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
        },
        inLanguage: "en-US",
    };
}

export function itemListJsonLd({
    path,
    name,
    description,
    items,
}: {
    path: string;
    name: string;
    description: string;
    items: { name: string; path: string; description?: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        description,
        url: absoluteUrl(path),
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            url: absoluteUrl(item.path),
            ...(item.description
                ? {
                      item: {
                          "@type": "CreativeWork",
                          name: item.name,
                          description: item.description,
                          url: absoluteUrl(item.path),
                      },
                  }
                : {}),
        })),
    };
}

export function creativeWorkJsonLd({
    path,
    name,
    description,
    datePublished,
    keywords,
    image,
}: {
    path: string;
    name: string;
    description: string;
    datePublished?: string;
    keywords?: string[];
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(path)}#work`,
        name,
        description,
        url: absoluteUrl(path),
        ...(datePublished ? { datePublished } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
        ...(image ? { image: absoluteUrl(image) } : {}),
        author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        inLanguage: "en-US",
    };
}

/** Case study page graph: WebPage + Breadcrumb + CreativeWork */
export function caseStudySchema({
    path,
    name,
    description,
    image,
    keywords,
}: {
    path: string;
    name: string;
    description: string;
    image?: string;
    keywords?: string[];
}) {
    return [
        webPageJsonLd({ path, name, description }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name, path },
        ]),
        creativeWorkJsonLd({
            path,
            name,
            description,
            image,
            keywords,
        }),
    ];
}

export function softwareSourceCodeJsonLd({
    path,
    name,
    description,
    codeRepository,
    programmingLanguage,
    keywords,
}: {
    path: string;
    name: string;
    description: string;
    codeRepository?: string;
    programmingLanguage?: string[];
    keywords?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name,
        description,
        url: absoluteUrl(path),
        ...(codeRepository ? { codeRepository } : {}),
        ...(programmingLanguage?.length
            ? { programmingLanguage }
            : { programmingLanguage: ["TypeScript", "JavaScript"] }),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
        author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        license: "https://opensource.org/licenses/MIT",
    };
}

/**
 * Labs keywords — mix of:
 * 1) Business-owner language (how normal people search)
 * 2) Mid-tail tech terms (developers / agencies)
 * Skip bare head terms (webgl, three.js) until Labs has more authority.
 */
export const LABS_KEYWORDS = [
    // Business owners / founders — plain-language intent
    "interactive website for business",
    "3d product showcase website",
    "animated landing page for startup",
    "immersive brand website",
    "modern website with animations",
    "product launch website with 3d",
    "creative agency website design",
    "wow factor website for brand",
    "custom interactive website for company",
    "hire developer for interactive website",
    "website that stands out from competitors",
    "cinematic website for business",
    // Mid-tail tech (still useful, attainable)
    "next.js webgl templates",
    "react three fiber examples",
    "free 3d next.js templates",
    "interactive web experiences",
    "three.js landing page template",
    "cinematic scroll animation next.js",
    "open source webgl experiments",
    // Commercial bridge
    "hire webgl developer",
    "custom interactive website development",
] as const;

export const TEMPLATES_KEYWORDS = [
    // Business-facing
    "free website template for business",
    "3d product website template",
    "animated agency portfolio template",
    "startup landing page template free",
    "interactive brand website template",
    // Tech mid-tail
    "free next.js template",
    "react three fiber template",
    "3d website template next.js",
    "webgl landing page template",
    "gsap scroll animation template",
    "animated nextjs template open source",
] as const;
