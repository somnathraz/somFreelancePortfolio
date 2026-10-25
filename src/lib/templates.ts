import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/templates');

export interface TemplateFrontmatter {
    title: string;
    metaTitle?: string;
    description: string;
    category: string;
    tags: string[];
    date: string;
    /** Last meaningful content update; omitted when unchanged since publication. */
    updated?: string;
    status: 'live' | 'coming-soon' | 'beta';
    stack: string[];
    demoUrl?: string;
    githubUrl?: string;
    shareImage?: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    features: string[];
}

export interface Template {
    slug: string;
    frontmatter: TemplateFrontmatter;
    content: string;
}

export function getTemplateSlugs(): string[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }
    return fs.readdirSync(contentDirectory).filter((name) => name.endsWith('.mdx'));
}

export function getTemplateBySlug(slug: string): Template {
    const requestedSlug = slug.replace(/\.mdx$/, '');
    const matchingSlug = getTemplateSlugs().find(
        (s) => s.replace(/\.mdx$/, '').toLowerCase() === requestedSlug.toLowerCase(),
    );
    const realSlug = (matchingSlug ?? `${requestedSlug}.mdx`).replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        frontmatter: data as TemplateFrontmatter,
        content,
    };
}

const STATUS_RANK: Record<TemplateFrontmatter["status"], number> = {
    live: 0,
    beta: 1,
    "coming-soon": 2,
};

export function getAllTemplates(): Template[] {
    const slugs = getTemplateSlugs();
    return slugs
        .map((slug) => getTemplateBySlug(slug))
        .sort((a, b) => {
            const byStatus =
                STATUS_RANK[a.frontmatter.status] -
                STATUS_RANK[b.frontmatter.status];
            if (byStatus !== 0) return byStatus;
            return a.frontmatter.date > b.frontmatter.date ? -1 : 1;
        });
}
