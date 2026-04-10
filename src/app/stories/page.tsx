import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Layers3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { webStories } from "@/lib/web-stories";

export const metadata: Metadata = {
  title: "Web Stories | Somanath Studio",
  description:
    "Short-form Web Stories on SaaS MVP planning, performance, and production readiness.",
  alternates: {
    canonical: "/stories",
  },
  openGraph: {
    title: "Web Stories | Somanath Studio",
    description:
      "Short-form Web Stories on SaaS MVP planning, performance, and production readiness.",
    url: "/stories",
    type: "website",
    images: [
      {
        url: "/og?title=Web%20Stories",
        width: 1200,
        height: 630,
        alt: "Somanath Studio Web Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Stories | Somanath Studio",
    description:
      "Short-form Web Stories on SaaS MVP planning, performance, and production readiness.",
    images: ["/og?title=Web%20Stories"],
  },
};

export default function StoriesPage() {
  const storiesJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Web Stories",
        url: "https://somanathkhadanga.com/stories",
        description:
          "Short-form Web Stories on SaaS MVP planning, performance, and production readiness.",
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
            name: "Web Stories",
            item: "https://somanathkhadanga.com/stories",
          },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: webStories.map((story, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://somanathkhadanga.com/stories/${story.slug}`,
          name: story.title,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storiesJsonLd) }}
      />
      <Navbar />

      <section className="relative overflow-hidden bg-black pt-28 text-center md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)]">
          <div className="h-[20rem] w-[20rem] rounded-full bg-cyan-500/15 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Stories
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tighter text-white md:text-6xl">
            Swipeable versions of the same
            <br className="hidden md:block" />
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              buyer-intent ideas in the blog.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 sm:text-xl">
            Same topics, same founder-focused positioning, just compressed into a vertical format
            for quick scanning and shareable discovery.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/stories/${webStories[0].slug}`}
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black hover:bg-zinc-200"
            >
              Open first story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={webStories[0].sourceBlogUrl}
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-md border border-white/10 px-6 text-base text-white hover:bg-white/5"
            >
              Read source article
            </Link>
          </div>

          <div className="mx-auto mt-10 w-full max-w-4xl border-y border-white/10 bg-white/[0.02] px-4 py-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
              <div className="text-center sm:border-r sm:border-white/10 sm:pr-4">
                <p className="text-2xl font-bold text-white">{webStories.length}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Stories live
                </p>
              </div>
              <div className="text-center sm:border-r sm:border-white/10 sm:px-4">
                <p className="text-2xl font-bold text-white">6 pages</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  First format
                </p>
              </div>
              <div className="text-center sm:pl-4">
                <p className="text-2xl font-bold text-white">Blog-linked</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Internal SEO support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      <section className="relative z-10 border-t border-white/5 bg-black/40 px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Current stories
            </span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="grid gap-8">
            {webStories.map((story) => (
              <article
                key={story.slug}
                className="overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                  <div
                    className="min-h-[24rem] bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.72)), url(${story.poster})`,
                    }}
                  />
                  <div className="flex flex-col justify-between p-8 md:p-10">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-300">
                        <Layers3 className="h-3.5 w-3.5" />
                        {story.pages.length} pages
                      </div>
                      <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white">
                        {story.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-zinc-400 leading-7">
                        {story.description}
                      </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <Link
                        href={`/stories/${story.slug}`}
                        className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 hover:bg-zinc-200"
                      >
                        Open story
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={story.sourceBlogUrl}
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        Read source article
                        <BookOpen className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
