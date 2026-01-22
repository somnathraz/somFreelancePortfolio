import { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const blogUrls = posts.map((post) => ({
        url: `https://somanathstudio.com/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    return [
        {
            url: 'https://somanathstudio.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://somanathstudio.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://somanathstudio.com/book',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://somanathstudio.com/#work',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...blogUrls,
    ]
}
