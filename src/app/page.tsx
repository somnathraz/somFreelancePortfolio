import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Code2, Database, LayoutTemplate, Server, Box } from "lucide-react"
import Marquee from "@/components/magicui/marquee"
import { HomeDeferredContent } from "@/components/HomeDeferredContent"
import { getAllPosts } from "@/lib/blog"

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
  const latestPosts = getAllPosts().slice(0, 6)

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

      {/* Latest from the blog — server-rendered so crawlers discover posts in initial HTML */}
      <section id="latest-posts" className="relative z-10 bg-black py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                Latest from the blog
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Recent writing
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              View all posts <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                      <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                      {post.frontmatter.readTime && (
                        <>
                          <span aria-hidden>•</span>
                          <span>{post.frontmatter.readTime}</span>
                        </>
                      )}
                      {post.frontmatter.category && (
                        <>
                          <span aria-hidden>•</span>
                          <span className="text-zinc-400">{post.frontmatter.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {post.frontmatter.description}
                    </p>
                  </article>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all posts <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <HomeDeferredContent />
    </main>
  )
}
