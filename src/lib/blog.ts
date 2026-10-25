import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { contentLastModified } from './content-dates';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface PostFrontmatter {
    title: string;
    date: string;
    description: string;
    /** Optional SEO-focused title for <title> tag. Falls back to `title` when absent. Used to keep on-page H1 expressive while keeping the SERP title under 60 chars. */
    metaTitle?: string;
    /** Primary search phrase this post targets (used in schema keywords + writing checklist). */
    primaryKeyword?: string;
    readTime?: string;
    category?: string;
    tags?: string[];
    intro?: string;
    shareImage?: string;
    /** Date of the last meaningful content update. Defaults to the publication date. */
    updated?: string;
    /** Related commercial URL for internal linking / schema about. */
    relatedService?: string;
    /**
     * Optional FAQ pairs rendered into FAQPage JSON-LD when present.
     * Keep answers factual and present on the page.
     */
    faq?: Array<{ question: string; answer: string }>;
}

export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string;
    /** ISO timestamp for SEO (sitemap lastmod, article modifiedTime, JSON-LD). */
    lastModified: string;
}

export function getPostSlugs() {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }
    return fs.readdirSync(contentDirectory).filter((name) => name.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post {
    const requestedSlug = slug.replace(/\.mdx$/, '');
    const matchingSlug = getPostSlugs().find(
        (postSlug) => postSlug.replace(/\.mdx$/, '').toLowerCase() === requestedSlug.toLowerCase(),
    );
    const realSlug = (matchingSlug ?? `${requestedSlug}.mdx`).replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const lastModified = contentLastModified(data.date as string, data.updated as string | undefined);

    return {
        slug: realSlug,
        frontmatter: data as Post['frontmatter'],
        content,
        lastModified,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.endsWith('.mdx'))
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
    return posts;
}
