import { NextResponse } from "next/server";
import { getWebStoryBySlug } from "@/lib/web-stories";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderStoryHtml(slug: string) {
  const story = getWebStoryBySlug(slug);

  if (!story) {
    return null;
  }

  const baseUrl = "https://somanathkhadanga.com";
  const posterUrl = `${baseUrl}${story.poster}`;
  const canonicalUrl = `${baseUrl}/stories/${story.slug}`;
  const serviceUrl = `${baseUrl}${story.serviceUrl}`;
  const sourceBlogUrl = `${baseUrl}${story.sourceBlogUrl}`;
  const pageMarkup = story.pages
    .map((page, index) => {
      const bullets =
        page.bullets && page.bullets.length
          ? `<ul>${page.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>`
          : "";
      const coverMedia =
        page.layout === "cover"
          ? `
            <amp-img
              src="${posterUrl}"
              width="720"
              height="1280"
              layout="fill"
              alt="${escapeHtml(story.title)} cover image">
            </amp-img>
            <div class="page-scrim"></div>
          `
          : `<div class="page-gradient page-gradient-${(index % 4) + 1}"></div>`;
      const primaryLabel = story.serviceUrl === "/book" ? "Book strategy call" : "See service";
      const ctaMarkup =
        page.layout === "cta"
          ? `
            <div class="cta-row">
              <a href="${serviceUrl}" class="cta-link">${escapeHtml(primaryLabel)}</a>
              <a href="${sourceBlogUrl}" class="cta-link cta-link-secondary">Read full blog</a>
            </div>
          `
          : "";

      return `
        <amp-story-page id="${escapeHtml(page.id)}">
          <amp-story-grid-layer template="fill">
            ${coverMedia}
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical" class="content-layer">
            <div class="eyebrow">${escapeHtml(page.kicker)}</div>
            <h1>${escapeHtml(page.headline)}</h1>
            <p>${escapeHtml(page.body)}</p>
            ${bullets}
            ${ctaMarkup}
          </amp-story-grid-layer>
        </amp-story-page>
      `;
    })
    .join("");

  return `<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(story.title)} | Web Story | Somanath Studio</title>
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="${escapeHtml(story.description)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(story.title)}">
    <meta property="og:description" content="${escapeHtml(story.description)}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${posterUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(story.title)}">
    <meta name="twitter:description" content="${escapeHtml(story.description)}">
    <meta name="twitter:image" content="${posterUrl}">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
        animation: -amp-start 8s steps(1,end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
      @-moz-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
      @-ms-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
      @-o-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
      @keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
    </style>
    <noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style>
    </noscript>
    <style amp-custom>
      * { box-sizing: border-box; }
      amp-story {
        font-family: Inter, Arial, sans-serif;
        color: white;
        background: #050505;
      }
      h1 {
        margin: 0;
        font-size: 2.05rem;
        line-height: 1.05;
        letter-spacing: -0.04em;
        max-width: 11ch;
      }
      p {
        margin: 0;
        max-width: 32ch;
        color: rgba(255,255,255,0.82);
        font-size: 1rem;
        line-height: 1.55;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 0.7rem;
        max-width: 30ch;
      }
      li {
        padding: 0.85rem 0.95rem;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 0.95rem;
        background: rgba(255,255,255,0.045);
        font-size: 0.95rem;
        line-height: 1.35;
      }
      .content-layer {
        padding: 3.25rem 1.5rem 2rem;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        background:
          linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.9) 100%),
          linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
      }
      .eyebrow {
        display: inline-flex;
        align-self: flex-start;
        padding: 0.4rem 0.7rem;
        border-radius: 999px;
        border: 1px solid rgba(34,211,238,0.24);
        background: rgba(34,211,238,0.14);
        color: #b6f5ff;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        font-size: 0.68rem;
        font-family: "Geist Mono", monospace;
      }
      .page-scrim {
        width: 100%;
        height: 100%;
        background:
          linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.88) 82%),
          radial-gradient(circle at top, rgba(34,211,238,0.22), transparent 34%);
      }
      .page-gradient {
        width: 100%;
        height: 100%;
      }
      .page-gradient-1 { background: radial-gradient(circle at top, rgba(34,211,238,0.18), transparent 34%), linear-gradient(180deg, #020617, #0a0a0a); }
      .page-gradient-2 { background: radial-gradient(circle at 20% 10%, rgba(59,130,246,0.18), transparent 30%), linear-gradient(180deg, #111827, #050505); }
      .page-gradient-3 { background: radial-gradient(circle at 80% 12%, rgba(34,211,238,0.12), transparent 26%), linear-gradient(180deg, #0f172a, #030712); }
      .page-gradient-4 { background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.07), transparent 28%), linear-gradient(180deg, #111827, #030712); }
      .cta-row {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 0.3rem;
      }
      .cta-link {
        display: inline-block;
        width: fit-content;
        padding: 0.9rem 1.1rem;
        border-radius: 999px;
        text-decoration: none;
        background: white;
        color: black;
        font-weight: 700;
        font-size: 0.95rem;
      }
      .cta-link-secondary {
        background: rgba(255,255,255,0.045);
        color: white;
        border: 1px solid rgba(255,255,255,0.1);
      }
    </style>
  </head>
  <body>
    <amp-story
      standalone
      title="${escapeHtml(story.title)}"
      publisher="Somanath Studio"
      publisher-logo-src="${baseUrl}/icon.svg"
      poster-portrait-src="${posterUrl}"
      poster-square-src="${posterUrl}"
      poster-landscape-src="${posterUrl}">
      ${pageMarkup}
    </amp-story>
  </body>
</html>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const html = renderStoryHtml(slug);

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
