import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const args = process.argv.slice(2);
const allowShortBrief = args.includes('--allow-short-brief');
const fileArg = args.find((arg) => !arg.startsWith('--'));

if (!fileArg) {
    console.error('Usage: npm run validate:blog -- content/blog/<slug>.mdx [--allow-short-brief]');
    process.exit(1);
}

const projectRoot = process.cwd();
const filePath = path.resolve(projectRoot, fileArg);
const errors = [];

function fail(message) {
    errors.push(message);
}

function normalize(value) {
    return String(value)
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#>*`_|~]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function routeExists(route) {
    if (route.startsWith('/blog/')) {
        const slug = route.slice('/blog/'.length).split(/[?#]/)[0];
        return fs.existsSync(path.join(projectRoot, 'content/blog', `${slug}.mdx`));
    }

    if (route.startsWith('/images/')) {
        return fs.existsSync(path.join(projectRoot, 'public', route));
    }

    const routePath = route.split(/[?#]/)[0].replace(/^\//, '');
    if (!routePath) {
        return fs.existsSync(path.join(projectRoot, 'src/app/page.tsx'));
    }

    return ['page.tsx', 'page.ts', 'page.jsx', 'page.js'].some((page) =>
        fs.existsSync(path.join(projectRoot, 'src/app', routePath, page)),
    );
}

if (!fs.existsSync(filePath)) {
    console.error(`Blog post not found: ${filePath}`);
    process.exit(1);
}

if (!filePath.endsWith('.mdx') || path.dirname(filePath) !== path.join(projectRoot, 'content/blog')) {
    fail('Post must be an MDX file directly inside content/blog.');
}

const raw = fs.readFileSync(filePath, 'utf8');
const { data, content } = matter(raw);
const requiredFields = [
    'title',
    'metaTitle',
    'description',
    'primaryKeyword',
    'date',
    'updated',
    'author',
    'readTime',
    'category',
    'tags',
    'shareImage',
    'relatedService',
];

for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
        fail(`Missing required frontmatter field: ${field}.`);
    }
}

if (typeof data.metaTitle === 'string' && data.metaTitle.length > 60) {
    fail(`metaTitle is ${data.metaTitle.length} characters; maximum is 60.`);
}

if (typeof data.description === 'string') {
    if (data.description.length < 120 || data.description.length > 160) {
        fail(`description is ${data.description.length} characters; required range is 120–160.`);
    }
}

if (!Array.isArray(data.tags) || data.tags.length < 3 || data.tags.length > 6) {
    fail('tags must contain 3–6 entries.');
}

for (const field of ['date', 'updated']) {
    if (typeof data[field] !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
        fail(`${field} must use YYYY-MM-DD.`);
    }
}

if (data.author !== 'Somanath Khadanga') {
    fail('author must be "Somanath Khadanga".');
}

if (typeof data.readTime !== 'string' || !/^\d+ min read$/.test(data.readTime)) {
    fail('readTime must use the format "N min read".');
}

if (typeof data.shareImage === 'string' && !/^\/images\/blog\/[a-z0-9-]+\.png$/.test(data.shareImage)) {
    fail('shareImage must use /images/blog/<kebab-case-slug>.png.');
}

const postSlug = path.basename(filePath, '.mdx');
if (data.shareImage !== `/images/blog/${postSlug}.png`) {
    fail('shareImage filename must exactly match the post slug.');
}

if (typeof data.relatedService === 'string') {
    if (!data.relatedService.startsWith('/') || !routeExists(data.relatedService)) {
        fail(`relatedService does not resolve: ${data.relatedService}.`);
    }
}

const body = content.trimStart();
const firstLine = body.split('\n')[0];
const heroMatch = firstLine.match(/^!\[([^\]]+)\]\((\/images\/blog\/[^)]+\.png)\)$/);

if (!heroMatch) {
    fail('The first body line must be the hero image Markdown.');
} else {
    const [, altText, imagePath] = heroMatch;
    if (altText.trim().length < 20) {
        fail('Hero image alt text must be descriptive.');
    }
    if (imagePath !== data.shareImage) {
        fail('Hero image path must exactly match shareImage.');
    }
    if (!routeExists(imagePath)) {
        fail(`Hero image does not resolve: ${imagePath}.`);
    }
}

if (/^#\s+/m.test(content)) {
    fail('Body must not contain an H1; use ## and ### headings only.');
}

const prose = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*`_|~-]/g, ' ');
const wordCount = prose.match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length ?? 0;

if (!allowShortBrief && wordCount < 1200) {
    fail(`Body has ${wordCount} prose words; minimum is 1,200.`);
}

const markdownLinks = [...content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)].map((match) => match[1]);
const blogLinks = [...new Set(markdownLinks.filter((link) => link.startsWith('/blog/')))];

if (blogLinks.length < 2) {
    fail('Add at least two distinct internal blog links.');
}

const conversionLinks = markdownLinks.filter(
    (link) => link === data.relatedService || link === '/contact' || link.startsWith('/contact?'),
);
if (conversionLinks.length < 1) {
    fail('Add at least one link to relatedService or /contact.');
}

if (!/^## Related Reading\s*$/m.test(content)) {
    fail('Add a ## Related Reading section.');
}

const h2Headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
if (h2Headings.at(-1) !== 'Next Step') {
    fail('The final H2 section must be ## Next Step.');
}

for (const link of [...new Set(markdownLinks)]) {
    if (!routeExists(link)) {
        fail(`Internal link does not resolve: ${link}.`);
    }
}

if (data.faq !== undefined) {
    if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.length > 4) {
        fail('faq must contain 2–4 question-and-answer pairs when present.');
    } else {
        if (!/^## Frequently Asked Questions\s*$/m.test(content)) {
            fail('FAQ frontmatter requires a visible ## Frequently Asked Questions section.');
        }

        const normalizedBody = normalize(content);
        for (const [index, item] of data.faq.entries()) {
            if (!item?.question || !item?.answer) {
                fail(`FAQ item ${index + 1} needs question and answer.`);
                continue;
            }
            if (!normalizedBody.includes(normalize(item.question))) {
                fail(`FAQ question ${index + 1} does not appear in the body.`);
            }
            if (!normalizedBody.includes(normalize(item.answer))) {
                fail(`FAQ answer ${index + 1} does not appear in the body.`);
            }
        }
    }
}

if (errors.length > 0) {
    console.error(`Blog validation failed for ${path.relative(projectRoot, filePath)}:\n`);
    for (const error of errors) {
        console.error(`- ${error}`);
    }
    process.exit(1);
}

console.log(`Blog validation passed: ${path.relative(projectRoot, filePath)}`);
console.log(`- ${wordCount} prose words`);
console.log(`- ${blogLinks.length} distinct internal blog links`);
console.log(`- ${data.metaTitle.length}-character metaTitle`);
console.log(`- ${data.description.length}-character description`);
console.log(`- ${Array.isArray(data.faq) ? data.faq.length : 0} FAQ entries`);
