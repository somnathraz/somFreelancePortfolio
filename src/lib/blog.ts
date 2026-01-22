import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        [key: string]: any;
    };
    content: string;
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

    return {
        slug: realSlug,
        frontmatter: data as Post['frontmatter'],
        content,
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
