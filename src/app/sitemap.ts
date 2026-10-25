import { getAllPosts } from '@/lib/blog';
import { getAllTemplates } from '@/lib/templates';
import { MetadataRoute } from 'next';
import { contentLastModified } from '@/lib/content-dates';

const BASE_URL = 'https://somanathkhadanga.com';

/**
 * Sitemap focused on indexable commercial + blog + labs/template URLs.
 * Web Stories and redirect aliases are intentionally omitted so Google
 * spends crawl budget on /blog, /services, and /templates instead of duplicate formats.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const templates = getAllTemplates();

    const blogs = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const templateUrls = templates.map((t) => ({
        url: `${BASE_URL}/templates/${t.slug}`,
        lastModified: contentLastModified(t.frontmatter.date, t.frontmatter.updated),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Listing content changes when its underlying articles/templates change.
    const newest = (dates: string[]) => dates.sort().at(-1);
    const listingDates: Record<string, string | undefined> = {
        '/blog': newest(posts.map((post) => post.lastModified)),
        '/templates': newest(templateUrls.map((template) => template.lastModified)),
        '/labs': newest(templateUrls.map((template) => template.lastModified)),
    };

    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/labs',
        '/templates',
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
        // Omit unknown dates instead of claiming every page changed at build time.
        ...(listingDates[route] ? { lastModified: listingDates[route] } : {}),
        changeFrequency: 'weekly' as const,
        priority:
            route === '' || route.startsWith('/services')
                ? 1.0
                : route === '/labs' || route === '/templates'
                  ? 0.95
                  : 0.9,
    }));

    return [...routes, ...blogs, ...templateUrls];
}
