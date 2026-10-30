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
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { BlogTracker } from '@/components/ai-helper/BlogTracker';
import { siteUrl } from '@/lib/site';
import { blogPostingJsonLd, breadcrumbJsonLd as crumbsJsonLd } from '@/lib/seo';

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

const SERVICE_LABELS: Record<string, string> = {
    '/services/saas-mvp-development': 'SaaS MVP Development',
    '/services/mvp-development': 'MVP Development for Startups',
    '/services/react-development': 'React JS Development',
    '/services/saas-development': 'SaaS Development Services',
    '/services/custom-software-development': 'Custom Software Development',
    '/services/nextjs-performance-optimization': 'Next.js Performance Optimization',
    '/services/production-readiness-upgrade': 'Production Readiness Upgrade',
    '/services/ai-saas-development': 'AI SaaS Development',
    '/white-label-web-development': 'White Label Web Development',
    '/hire-saas-mvp-developer': 'Hire a SaaS MVP Developer',
    '/saas-mvp-audit': 'SaaS MVP Audit',
};

const DEFAULT_SERVICE_LINKS = [
    '/services/saas-mvp-development',
    '/services/nextjs-performance-optimization',
    '/services/production-readiness-upgrade',
].map((href) => ({ href, label: SERVICE_LABELS[href] }));

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
    const seoTitle = post.frontmatter.metaTitle || post.frontmatter.title;
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

    const relatedPosts = getRelatedPosts(post.slug, 4);
    const ownService = post.frontmatter.relatedService;
    const serviceLinks = [
        ...(ownService && SERVICE_LABELS[ownService] ? [{ href: ownService, label: SERVICE_LABELS[ownService] }] : []),
        ...DEFAULT_SERVICE_LINKS.filter((service) => service.href !== ownService),
    ].slice(0, 3);
    const formattedDate = format(new Date(post.frontmatter.date), 'MMMM d, yyyy');
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

    const articleJsonLd = blogPostingJsonLd({
        path: `/blog/${post.slug}`,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        datePublished: post.frontmatter.date,
        dateModified: post.lastModified,
        image: shareImage,
        wordCount,
        keywords: keywords.length ? keywords : undefined,
        category: post.frontmatter.category,
        relatedService: post.frontmatter.relatedService,
    });
    const breadcrumbJsonLd = crumbsJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.frontmatter.title, path: `/blog/${post.slug}` },
    ]);
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
                        <MDXRemote
                            source={post.content}
                            components={mdxComponents}
                            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                        />
                    </MdxContent>

                    {relatedPosts.length > 0 && (
                        <nav aria-label="Related articles" className="mt-16 pt-10 border-t border-white/10">
                            <h2 className="text-lg font-bold text-white mb-4">Keep reading</h2>
                            <ul className="space-y-3">
                                {relatedPosts.map((related) => (
                                    <li key={related.slug}>
                                        <Link
                                            href={`/blog/${related.slug}`}
                                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                        >
                                            {related.frontmatter.title}
                                        </Link>
                                        <p className="text-sm text-zinc-500 mt-0.5">{related.frontmatter.description}</p>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/blog" className="inline-block mt-5 text-sm text-zinc-400 hover:text-white transition-colors">
                                Browse all articles →
                            </Link>
                        </nav>
                    )}

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
                                {serviceLinks.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white"
                                    >
                                        {service.label}
                                    </Link>
                                ))}
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
