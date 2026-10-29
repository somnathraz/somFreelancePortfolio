import { getAllPosts } from '@/lib/blog';
import { getAllTemplates } from '@/lib/templates';
import { getAllTraps } from '@/lib/traps';
import { getAllDesigns } from '@/lib/trap-designs';
import { LEVELS } from '@/lib/trap-game/levels';
import { getAllTracks } from '@/lib/systems';
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
    const traps = getAllTraps();

    // Individual posts/templates are published content — they don't change
    // weekly once live, only when revised. Listing pages change far more often.
    const blogs = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const templateUrls = templates.map((t) => ({
        url: `${BASE_URL}/templates/${t.slug}`,
        lastModified: contentLastModified(t.frontmatter.date, t.frontmatter.updated),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const trapUrls = [
        ...traps.map((trap) => ({ slug: trap.slug, lastModified: trap.generatedAt.slice(0, 10) })),
        ...getAllDesigns().map((design) => ({ slug: design.slug, lastModified: design.updated })),
        // game levels have no recorded date; omit it rather than claim they changed at build time
        ...LEVELS.map((level) => ({ slug: `play/${level.id}`, lastModified: undefined })),
    ].map(({ slug, lastModified }) => ({
        url: `${BASE_URL}/labs/traps/${slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Listing content changes when its underlying articles/templates change.
    const newest = (dates: string[]) => dates.sort().at(-1);
    const listingDates: Record<string, string | undefined> = {
        '/blog': newest(posts.map((post) => post.lastModified)),
        '/templates': newest(templateUrls.map((template) => template.lastModified)),
        '/labs': newest(templateUrls.map((template) => template.lastModified)),
        '/labs/traps': newest(trapUrls.map((trap) => trap.lastModified).filter((date): date is string => !!date)),
    };

    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/labs',
        '/labs/traps',
        '/labs/traps/play',
        ...getAllTracks().map((track) => `/labs/systems/${track.id}`),
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
        '/tools',
        '/tools/saas-mvp-cost-calculator',
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
        // Listings surface new content often; static commercial/about pages don't.
        changeFrequency:
            route === '' || route === '/blog' || route === '/labs' || route === '/templates'
                ? ('weekly' as const)
                : ('monthly' as const),
        // Labs/Templates are demoted below commercial pages — this is a SaaS
        // dev studio first, a labs showcase second.
        priority:
            route === '' || route.startsWith('/services')
                ? 1.0
                : route === '/labs' || route === '/templates'
                  ? 0.6
                  : 0.9,
    }));

    return [...routes, ...blogs, ...templateUrls, ...trapUrls];
}
