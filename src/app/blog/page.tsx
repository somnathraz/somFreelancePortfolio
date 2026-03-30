import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { Footer } from '@/components/Footer';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog — SaaS MVPs, Next.js, Performance & Hiring a Developer | Somanath Studio",
    description:
        "Practical articles for SaaS founders: MVP scope, Next.js choices, why products feel slow after launch, and what to prepare before hiring a product engineer.",
};

export default async function BlogIndex(props: {
    searchParams?: Promise<{ page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const POSTS_PER_PAGE = 3;

    const allPosts = getAllPosts();
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const posts = allPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <Navbar />

            <section className="pt-32 pb-20 px-4 md:px-0">
                <div className="container mx-auto max-w-2xl">
                    <header className="mb-16">
                        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                            Blog
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Insights for SaaS founders
                        </h1>
                        <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                            Buyer-intent and technical writing on shipping MVPs, improving performance,
                            and production-ready architecture — grounded in real client work on Next.js,
                            Node, and AI-powered SaaS.
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                            <Link href="/#process" className="text-blue-400 hover:text-blue-300 transition-colors">
                                How I work
                            </Link>
                            <span className="text-zinc-700 hidden sm:inline">•</span>
                            <Link href="/case-studies" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Case studies
                            </Link>
                            <span className="text-zinc-700 hidden sm:inline">•</span>
                            <Link href="/book" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Book intro call
                            </Link>
                        </div>
                    </header>

                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-zinc-800 flex-1" />
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="h-px bg-zinc-800 flex-1" />
                    </div>

                    <div className="flex flex-col gap-12">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group block"
                            >
                                <article className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-2">
                                        <time>{post.frontmatter.date}</time>
                                        <span>•</span>
                                        <span>{post.frontmatter.readTime}</span>
                                        <div className="hidden sm:flex gap-2 ml-2">
                                            {post.frontmatter.tags?.map((tag: string) => (
                                                <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                                        {post.frontmatter.title}
                                    </h2>

                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                                        {post.frontmatter.description}
                                    </p>

                                    <div className="pt-2 text-sm text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                        Read article <span className="text-zinc-500">→</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-20 pt-8 border-t border-zinc-800">
                        {currentPage > 1 ? (
                            <Link
                                href={`/blog?page=${currentPage - 1}`}
                                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                ← Previous
                            </Link>
                        ) : (
                            <div />
                        )}

                        {currentPage < totalPages && (
                            <Link
                                href={`/blog?page=${currentPage + 1}`}
                                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                Next →
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
            <MobileNav />
        </main>
    );
}
