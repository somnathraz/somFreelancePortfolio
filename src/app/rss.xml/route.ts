import { getAllPosts } from '@/lib/blog';

const BLOG_URL = 'https://www.somanathkhadanga.com/blog';
const SITE_URL = 'https://www.somanathkhadanga.com';

export async function GET() {
    const posts = getAllPosts();

    const itemsXml = posts
        .map((post) => {
            const postUrl = `${BLOG_URL}/${post.slug}`;
            return `
        <item>
            <title><![CDATA[${post.frontmatter.title}]]></title>
            <link>${postUrl}</link>
            <guid isPermaLink="true">${postUrl}</guid>
            <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
            <description><![CDATA[${post.frontmatter.description}]]></description>
        </item>`;
        })
        .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Somanath Studio Engineering Blog</title>
        <link>${SITE_URL}</link>
        <description>Practical thoughts on software architecture, building for scale, and the business of engineering.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${itemsXml}
    </channel>
</rss>`;

    return new Response(rssXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
