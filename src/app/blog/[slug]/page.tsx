import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import MdxContent, { mdxComponents } from '@/components/MdxContent';
import { ClientMobileNav } from '@/components/ClientMobileNav';
import { BlogCTA } from '@/components/BlogCTA';
import { AuthorBio } from '@/components/AuthorBio';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BlogTracker } from '@/components/ai-helper/BlogTracker';
import { siteLogoUrl, siteUrl } from '@/lib/site';

function getPostShareImage(post: ReturnType<typeof getPostBySlug>) {
    const shareImage = post.frontmatter.shareImage;

    if (shareImage) {
        if (shareImage.startsWith('http://') || shareImage.startsWith('https://')) {
            return shareImage;
        }

        return new URL(shareImage, siteUrl).toString();
    }

    return `${siteUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}`;
}

export function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const shareImage = getPostShareImage(post);
    const seoTitle = post.frontmatter.metaTitle
        ? post.frontmatter.metaTitle
        : `${post.frontmatter.title} — Somanath Studio`;
    const keywords = [
        post.frontmatter.primaryKeyword,
        post.frontmatter.category,
        ...(post.frontmatter.tags || []),
    ].filter((value): value is string => Boolean(value));

    return {
        title: seoTitle,
        description: post.frontmatter.description,
        authors: [{ name: 'Somanath Khadanga', url: `${siteUrl}/about` }],
        creator: 'Somanath Khadanga',
        keywords: keywords.length ? keywords : undefined,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: seoTitle,
            description: post.frontmatter.description,
            type: 'article',
            publishedTime: post.frontmatter.date,
            modifiedTime: post.lastModified,
            authors: ['Somanath Khadanga'],
            section: post.frontmatter.category,
            tags: post.frontmatter.tags,
            url: `${siteUrl}/blog/${post.slug}`,
            images: [
                {
                    url: shareImage,
                    width: 1200,
                    height: 630,
                    alt: post.frontmatter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: post.frontmatter.description,
            images: [shareImage],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (slug !== post.slug) {
        redirect(`/blog/${post.slug}`);
    }

    const formattedDate = format(new Date(post.frontmatter.date), 'MMMM d, yyyy');
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const shareImage = getPostShareImage(post);
    const wordCount = post.content
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/[#>*`\[\]()|_~-]/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length;
    const keywords = [
        post.frontmatter.primaryKeyword,
        post.frontmatter.category,
        ...(post.frontmatter.tags || []),
    ].filter((value): value is string => Boolean(value));

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.frontmatter.title,
        name: post.frontmatter.title,
        datePublished: post.frontmatter.date,
        dateModified: post.lastModified,
        description: post.frontmatter.description,
        articleSection: post.frontmatter.category,
        keywords: keywords.length ? keywords.join(', ') : undefined,
        wordCount,
        image: {
            '@type': 'ImageObject',
            url: shareImage,
            width: 1200,
            height: 630,
        },
        url: postUrl,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
        author: {
            '@type': 'Person',
            name: 'Somanath Khadanga',
            url: `${siteUrl}/about`,
            sameAs: [
                'https://www.linkedin.com/in/somnath-khadanga/',
                'https://github.com/somnathraz',
            ],
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Somanath Studio',
            url: siteUrl,
            logo: {
                '@type': 'ImageObject',
                url: siteLogoUrl,
            },
        },
        isPartOf: {
            '@type': 'Blog',
            '@id': `${siteUrl}/blog#blog`,
            name: 'Somanath Studio Blog',
            url: `${siteUrl}/blog`,
        },
        about: post.frontmatter.relatedService
            ? {
                  '@type': 'Service',
                  url: post.frontmatter.relatedService.startsWith('http')
                      ? post.frontmatter.relatedService
                      : `${siteUrl}${post.frontmatter.relatedService}`,
              }
            : undefined,
        inLanguage: 'en',
    };
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${siteUrl}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.frontmatter.title,
                item: postUrl,
            },
        ],
    };
    const faqJsonLd =
        post.frontmatter.faq && post.frontmatter.faq.length > 0
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: post.frontmatter.faq.map((item) => ({
                      '@type': 'Question',
                      name: item.question,
                      acceptedAnswer: {
                          '@type': 'Answer',
                          text: item.answer,
                      },
                  })),
              }
            : null;

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <Navbar />
            <BlogTracker slug={post.slug} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            ) : null}

            <article className="pt-32 pb-20 px-4 md:px-0">
                <div className="container mx-auto max-w-[700px]">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Writing
                    </Link>

                    <header className="mb-10">
                        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 mb-6">
                            <time className="text-zinc-400">{formattedDate}</time>
                            <span>•</span>
                            <span>{post.frontmatter.readTime}</span>
                            {post.frontmatter.tags && (
                                <>
                                    <span>•</span>
                                    <div className="flex gap-2">
                                        {post.frontmatter.tags.map((tag: string) => (
                                            <span key={tag} className="text-zinc-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight">
                            {post.frontmatter.title}
                        </h1>

                        {post.frontmatter.intro && (
                            <div className="border-l-2 border-blue-500 pl-4 py-1 mb-10">
                                <p className="text-lg text-zinc-300 italic">
                                    {post.frontmatter.intro}
                                </p>
                            </div>
                        )}
                    </header>

                    <MdxContent>
                        <MDXRemote source={post.content} components={mdxComponents} />
                    </MdxContent>

                    {/* End of Article CTA */}
                    <div className="mt-20 pt-12 border-t border-white/10">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 md:p-10">
                            <h3 className="text-xl font-bold text-white mb-3">
                                Working on a SaaS that&apos;s starting to feel fragile?
                            </h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Talk to an engineer about the parts that break first — without rewriting
                                what already works. We&apos;ll recommend focused support or a compact team
                                based on your scope.
                            </p>
                            <div className="mb-6 flex flex-wrap gap-2">
                                <Link href="/services/saas-mvp-development" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white">
                                    SaaS MVP Development
                                </Link>
                                <Link href="/services/nextjs-performance-optimization" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white">
                                    Next.js Performance Optimization
                                </Link>
                                <Link href="/services/production-readiness-upgrade" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white">
                                    Production Readiness Upgrade
                                </Link>
                            </div>
                            <BlogCTA />
                        </div>
                    </div>

                    <AuthorBio />
                </div>
            </article>

            <Footer />
            <ClientMobileNav />
        </main>
    );
}
