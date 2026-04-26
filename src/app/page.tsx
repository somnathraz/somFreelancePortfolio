import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Code2, Database, LayoutTemplate, Server, Box } from "lucide-react"
import Marquee from "@/components/magicui/marquee"
import { HomeDeferredContent } from "@/components/HomeDeferredContent"
import { getAllPosts } from "@/lib/blog"
import { LatestPostTiltCard } from "@/components/LatestPostTiltCard"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Somanath Studio | SaaS MVP Development and Performance Engineering",
  description:
    "I help SaaS founders build MVPs fast, optimize slow Next.js products, and upgrade production readiness with senior engineering support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Somanath Studio | SaaS MVP Development and Performance Engineering",
    description:
      "Build your SaaS MVP fast, improve performance, and ship production-ready products with a senior technical partner.",
    url: "/",
    siteName: "Somanath Studio",
    type: "website",
    images: [
      {
        url: "/og?title=Somanath%20Studio",
        width: 1200,
        height: 630,
        alt: "Somanath Studio | SaaS MVP Development and Performance Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somanath Studio | SaaS MVP Development and Performance Engineering",
    description:
      "Build your SaaS MVP fast, improve performance, and ship production-ready products with a senior technical partner.",
    images: ["/og?title=Somanath%20Studio"],
  },
}

export default function Home() {
  // 5 posts so the featured-first layout (2-col card + 4 small) fills exactly
  // 2 rows × 3 cols on lg with no empty cells.
  const latestPosts = getAllPosts().slice(0, 5)

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Somanath Studio",
        url: "https://somanathkhadanga.com",
        description:
          "SaaS MVP development, performance optimization, production-readiness upgrades, and AI SaaS engineering for founders.",
        isPartOf: {
          "@type": "WebSite",
          url: "https://somanathkhadanga.com",
          name: "Somanath Studio",
        },
      },
      {
        "@type": "Organization",
        name: "Somanath Studio",
        url: "https://somanathkhadanga.com",
        sameAs: ["https://somanathkhadanga.com"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "SaaS engineering services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SaaS MVP Development",
                url: "https://somanathkhadanga.com/services/saas-mvp-development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Next.js Performance Optimization",
                url: "https://somanathkhadanga.com/services/nextjs-performance-optimization",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Production Readiness Upgrade",
                url: "https://somanathkhadanga.com/services/production-readiness-upgrade",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI SaaS Development",
                url: "https://somanathkhadanga.com/services/ai-saas-development",
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Navbar />
      <Hero />

      {/* Trusted By Marquee */}
      <section className="relative z-10 mt-32 border-b border-white/5 bg-black/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4 mb-8 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/50">
            Trusted stack for shipping modern SaaS products fast
          </span>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Code2 className="h-8 w-8" /> React</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Server className="h-8 w-8" /> Node.js</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Database className="h-8 w-8" /> MongoDB</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Box className="h-8 w-8" /> Docker</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><LayoutTemplate className="h-8 w-8" /> AWS</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Code2 className="h-8 w-8" /> Next.js</div>
          <div className="mx-8 flex items-center gap-2 text-xl font-bold text-zinc-500 transition-colors hover:text-white"><Server className="h-8 w-8" /> TypeScript</div>
        </Marquee>
      </section>

      <section className="relative z-10 border-y border-white/5 bg-black/40 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-zinc-500">Explore Services</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/services/saas-mvp-development" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">SaaS MVP Development</Link>
            <Link href="/services/nextjs-performance-optimization" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">Next.js Performance Optimization</Link>
            <Link href="/services/production-readiness-upgrade" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">Production Readiness Upgrade</Link>
            <Link href="/services/ai-saas-development" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">AI SaaS Development</Link>
            <Link href="/stories" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">Web Stories</Link>
            <Link href="/blog" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">Read Blog</Link>
          </div>
        </div>
      </section>

      {/* Latest from the blog — links are server-rendered (client component still
          SSRs) so crawlers see all 6 post URLs in the initial HTML. */}
      <section id="latest-posts" className="relative z-10 overflow-hidden bg-black py-24 md:py-32">
        {/* Soft radial spotlight to match the rest of the site's premium dark aesthetic */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[24rem] w-[24rem] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.015] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
                — From the blog
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Notes from shipping SaaS
              </h2>
              <p className="mt-4 text-zinc-400">
                Practical writing on Next.js, performance, AI features, and the production work
                most posts don&apos;t cover.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              View all posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, idx) => (
              <LatestPostTiltCard
                key={post.slug}
                index={idx}
                featured={idx === 0}
                post={{
                  slug: post.slug,
                  title: post.frontmatter.title,
                  description: post.frontmatter.description,
                  date: post.frontmatter.date,
                  readTime: post.frontmatter.readTime,
                  category: post.frontmatter.category,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <HomeDeferredContent />
    </main>
  )
}
