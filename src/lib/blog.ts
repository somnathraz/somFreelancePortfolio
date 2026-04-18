import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface PostFrontmatter {
    title: string;
    date: string;
    description: string;
    /** Optional SEO-focused title for <title> tag. Falls back to `title` when absent. Used to keep on-page H1 expressive while keeping the SERP title under 60 chars. */
    metaTitle?: string;
    readTime?: string;
    category?: string;
    tags?: string[];
    intro?: string;
    shareImage?: string;
    /** Optional explicit last-updated date (ISO). Otherwise inferred from file mtime. */
    updated?: string;
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
    return fs.readdirSync(contentDirectory);
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stat = fs.statSync(fullPath);
    const publishedMs = new Date(data.date as string).getTime();
    const mtimeMs = stat.mtime.getTime();
    const updatedMs = data.updated ? new Date(data.updated as string).getTime() : 0;
    const lastModifiedMs = Math.max(publishedMs, mtimeMs, updatedMs);
    const lastModified = new Date(lastModifiedMs).toISOString();

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
