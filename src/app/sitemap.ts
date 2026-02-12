import { getAllPosts } from '@/lib/blog';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.somanathkhadanga.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const blogs = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const routes = [
        '',
        '/blog',
        '/work',
        '/about',
        '/case-studies',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }));

    return [...routes, ...blogs];
}
