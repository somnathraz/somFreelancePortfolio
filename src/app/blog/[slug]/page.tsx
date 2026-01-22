import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import MdxContent, { mdxComponents } from '@/components/MdxContent';
import { MobileNav } from '@/components/MobileNav';
import { BlogCTA } from '@/components/BlogCTA';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return {
        title: `${post.frontmatter.title} — Somanath Studio`,
        description: post.frontmatter.description,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const formattedDate = format(new Date(post.frontmatter.date), 'MMMM d, yyyy');

    return (
        <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
            <Navbar />

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
                                Working on a SaaS that’s starting to feel slow or brittle?
                            </h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                I help founders refactor early decisions into scalable, production-ready systems — without full rewrites.
                            </p>
                            <BlogCTA />
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
            <MobileNav />
        </main>
    );
}
