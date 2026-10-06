import { getAllPosts } from '@/lib/blog';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://somanathkhadanga.com';

/**
 * Sitemap focused on indexable commercial + blog URLs.
 * Web Stories and redirect aliases are intentionally omitted so Google
 * spends crawl budget on /blog and /services instead of duplicate formats.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const blogs = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/case-studies',
        '/case-studies/studio-booking-platform',
        '/case-studies/outspokn',
        '/case-studies/vgt',
        '/case-studies/paperchai-invoice',
        '/projects/paperchai',
        '/hire-saas-mvp-developer',
        '/agency-development-partner',
        '/saas-mvp-audit',
        '/services',
        '/services/saas-mvp-development',
        '/services/custom-software-development',
        '/services/nextjs-performance-optimization',
        '/services/production-readiness-upgrade',
        '/services/ai-saas-development',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' || route.startsWith('/services') ? 1.0 : 0.9,
    }));

    return [...routes, ...blogs];
}
