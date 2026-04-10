import { getAllPosts } from '@/lib/blog';
import { webStories } from '@/lib/web-stories';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://somanathkhadanga.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const blogs = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const stories = webStories.map((story) => ({
        url: `${BASE_URL}/stories/${story.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const routes = [
        '',
        '/blog',
        '/book',
        '/case-studies',
        '/stories',
        '/services',
        '/services/saas-mvp-development',
        '/services/nextjs-performance-optimization',
        '/services/production-readiness-upgrade',
        '/services/ai-saas-development',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    return [...routes, ...blogs, ...stories];
}
