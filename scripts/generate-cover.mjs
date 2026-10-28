#!/usr/bin/env node
// Generate a blog cover with the Gemini image API, then add the real brand logo with sharp.
// Usage:
//   node --env-file=.env scripts/generate-cover.mjs --slug my-post \
//     --scene "servers, a laptop, a shield with a checkmark, a coffee mug" [--style matte|infographic] \
//     [--title "..." --subtitle "..." --labels "A|B|C"]   (text is only used by the infographic style)
//     [--model gemini-3-pro-image] [--logo path|none] [--lockup none] [--brand "Name"] [--domain site.com]
//     [--out path.png] [--force]   (matte also renders --title/--subtitle as an exact text overlay)
// Default output: public/images/blog/<slug>.png (refuses to overwrite without --force).
//
// Styles:
//   matte (default): calm, soft, flat editorial illustration, no text, matches boring-architecture-for-saas.png.
//   infographic: dark panel infographic with headline and step cards (glossier; use sparingly).

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]?.startsWith("--") || all[i + 1] === undefined ? "true" : all[i + 1]]);
    return acc;
  }, []),
);

const { slug, title = "", subtitle = "", labels = "" } = args;
const style = args.style || "matte";
const model = args.model || "gemini-3-pro-image";
const key = process.env.GEMINI_API_KEY;

if (!slug) {
  console.error("Required: --slug");
  process.exit(1);
}
if (["infographic", "diagram", "buildlog"].includes(style) && !title) {
  console.error(`The ${style} style requires --title`);
  process.exit(1);
}
if (!key) {
  console.error("GEMINI_API_KEY missing. Run with: node --env-file=.env scripts/generate-cover.mjs ...");
  process.exit(1);
}

const out = args.out || path.join("public/images/blog", `${slug}.png`);
const exists = await access(out).then(() => true, () => false);
if (exists && args.force !== "true") {
  console.error(`${out} already exists. Pass --force to overwrite.`);
  process.exit(1);
}

// diagram and buildlog are described in words only (no reference images), so nothing third-party is copied.
const refs =
  style === "matte"
    ? ["public/images/blog/boring-architecture-for-saas.png"]
    : style === "infographic"
      ? ["public/images/blog/Security-update- next.js-release .png", "public/images/blog/boring-architecture-for-saas.png"]
      : [];
const refParts = [];
for (const r of refs) {
  try {
    const data = (await readFile(r)).toString("base64");
    refParts.push({ inlineData: { mimeType: "image/png", data } });
  } catch {
    /* reference missing: skip */
  }
}

const scene = args.scene || "a laptop, a few servers, a database and a shield with a checkmark";
const labelList = labels.split("|").map((s) => s.trim()).filter(Boolean);

const mattePrompt = [
  "Create one landscape (3:2) blog cover illustration in the exact visual style of the reference image:",
  "a calm, soft, flat editorial illustration on a clean off-white background, muted desaturated palette (greys, sage green, pale blue),",
  "matte surfaces with gentle hand-drawn outlines and simple soft shading.",
  `Subject: ${scene}.`,
  "Make the scene rich and full: many small related details (charts, notes, plants, cables, small icons) so the canvas does not feel empty, while staying calm and uncluttered.",
  title
    ? "Compose the illustration across the right and lower parts of the canvas; keep the upper-left 45% by 45% area plain off-white background (no illustration may enter it) (a headline will be added there)."
    : "Compose the illustration across the whole canvas.",
  "Strictly avoid: glossy or glassy surfaces, glow, neon, lens flare, 3D render look, heavy gradients, dark backgrounds, reflections, saturated colours.",
  "No text, no letters, no numbers, no logos, no brand marks, no people.",
  "Draw no white boxes, panels, cards or frames anywhere; the background stays one continuous off-white.",
];

const infographicPrompt = [
  "Create one landscape (3:2) blog cover in the visual style of the first reference: dark navy technology infographic,",
  "but restrained: matte panels, flat icons, minimal glow, no glossy reflections, no 3D render look.",
  "Layout: small outlined badge top-left, big stacked headline on the left, a simple hero illustration on the right, a row of numbered step cards along the bottom.",
  args.badge ? `Badge text (render exactly): "${args.badge}".` : "",
  `Headline text (render exactly, spelled correctly): "${title}".`,
  subtitle ? `Subtitle (render exactly): "${subtitle}".` : "",
  `Hero illustration: ${scene}.`,
  labelList.length
    ? `Bottom row: ${labelList.length} numbered step cards with a small flat icon and these labels, rendered exactly: ${labelList.map((l, i) => `${i + 1}. ${l}`).join("; ")}.`
    : "",
  "Do not add any other text, footer lines, logos, brand letters on icons, watermarks, people, or invented numbers, versions or dates.",
  "Keep the top-right corner (about 12% of width and height) empty: a logo will be added there later.",
];

const nodeList = (args.nodes || "").split("|").map((s) => s.trim()).filter(Boolean);

// Light architecture diagram: airy background, labelled nodes joined by flowing coloured lines.
const diagramPrompt = [
  "Create one landscape (3:2) blog cover: a clean technical architecture diagram on a light, airy white-to-pale-blue background.",
  "Rounded white nodes with small flat colourful icons, joined by smooth flowing curved lines in blue, red, yellow and green.",
  "Soft, minimal, flat look with only very light shadows; no glow, no neon, no dark background, no 3D render.",
  `Headline in dark sans-serif, top-left (render exactly, spelled correctly): "${title}".`,
  nodeList.length
    ? `Nodes, each with a short dark label rendered exactly, flowing left to right in this order: ${nodeList.join(" -> ")}.`
    : "",
  args.flow ? `Diagram idea: ${args.flow}.` : "",
  "Arrange the nodes in one tidy row or gentle arc across the middle of the canvas, vertically centred, with exactly one short, smooth, gently curved arrow between consecutive nodes. Arrows must never loop, curl, cross or overlap, and must not wrap around nodes. Keep nodes level in a horizontal row.",
  "Fill the canvas well: large nodes and a big headline, no big empty areas.",
  "Do not add any other text, brand names, logos, people, numbers, versions or dates.",
  "Draw no extra boxes, panels or frames in the corners; the background stays continuous.",
];

// Build-in-public card: dark, big hand-brushed kicker, product UI mockup, small status tiles.
const buildlogPrompt = [
  "Create one landscape (3:2) build-in-public blog cover on a near-black navy background with a subtle violet glow.",
  `Very large hand-brushed style kicker text (render exactly): "${args.kicker || "BUILD LOG"}".`,
  `Below it, a two-line message in white with a violet accent on the key words (render exactly): "${title}".`,
  `On the right, a flat dark UI mockup of the product screen: ${args.scene || "a clean dashboard with a sidebar and cards"}. Inside the mockup use only grey placeholder bars and generic shapes: no digits, no words, no readable text at all. Show the whole mockup fully inside the canvas with a clear margin on the right and bottom, nothing cropped.`,
  nodeList.length
    ? `Along the bottom, a row of ${nodeList.length} small rounded icon tiles with these labels rendered exactly: ${nodeList.join("; ")}.`
    : "",
  "Matte and modern, restrained violet and blue accents, no glossy reflections, no 3D render look.",
  "Do not add any other text, brand names, logos, taglines, people, or invented numbers, versions or dates.",
  "Keep the top-left corner (about 15% of the width and height) as plain dark background: draw no panel, box, card, frame or shape there, because a logo will be placed on it.",
];

const prompts = { matte: mattePrompt, infographic: infographicPrompt, diagram: diagramPrompt, buildlog: buildlogPrompt };
if (!prompts[style]) {
  console.error(`Unknown --style ${style}. Use: ${Object.keys(prompts).join(", ")}`);
  process.exit(1);
}
const prompt = prompts[style].filter(Boolean).join(" ");

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, ...refParts] }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "3:2" } },
    }),
  },
);

if (!res.ok) {
  console.error(`Gemini API error ${res.status}: ${(await res.text()).slice(0, 400)}`);
  process.exit(1);
}

const json = await res.json();
const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
if (!part) {
  console.error("No image returned:", JSON.stringify(json).slice(0, 400));
  process.exit(1);
}

await mkdir(path.dirname(out), { recursive: true });
let png = Buffer.from(part.inlineData.data, "base64");

// Overlay exact text (headline, brand name, domain) and the real logo with sharp; never let the model draw them.
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const wrap = (text, max) => {
  const lines = [];
  let line = "";
  for (const w of text.split(/\s+/)) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
};
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

if (args.logo !== "none") {
  const { default: sharp } = await import("sharp");
  const dark = style === "infographic" || style === "buildlog";
  const ink = dark ? "#FFFFFF" : "#1A2233";
  const soft = dark ? "#A9B4CC" : "#5B6577";
  const logoPath =
    args.logo ||
    `public/somanath-transparent-logo-3-variants/somanath-icon-${dark ? "white" : "black"}-transparent.png`;
  const meta = await sharp(png).metadata();
  const W = meta.width;
  const H = meta.height;
  const margin = Math.round(W * 0.03);
  const layers = [];

  // Headline for the matte style (other styles already carry their own text).
  if (style === "matte" && title) {
    const fs = Math.round(W * 0.052);
    const lines = wrap(title, 18);
    const subFs = Math.round(fs * 0.45);
    const subLines = subtitle ? wrap(subtitle, 40) : [];
    const h = Math.round(lines.length * fs * 1.15 + (subLines.length ? subLines.length * subFs * 1.4 + subFs : 0) + fs);
    const tw = Math.round(Math.max(...lines.map((l) => l.length * fs * 0.62), ...subLines.map((l) => l.length * subFs * 0.55)) + 10);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${h}">` +
      lines.map((l, i) => `<text x="0" y="${Math.round(fs * (i + 1) * 1.1)}" font-family="${FONT}" font-weight="700" font-size="${fs}" fill="${ink}">${esc(l)}</text>`).join("") +
      subLines.map((l, i) => `<text x="0" y="${Math.round(lines.length * fs * 1.1 + fs * 0.5 + subFs * 1.4 * (i + 1))}" font-family="${FONT}" font-size="${subFs}" fill="${soft}">${esc(l)}</text>`).join("") +
      `</svg>`;
    layers.push({ input: Buffer.from(svg), left: margin * 2, top: margin * 2 });
  }

  // Brand lockup: logo + name + domain.
  if (args.lockup !== "none") {
    const brand = args.brand ?? "Somanath Studio";
    const domain = args.domain ?? "somanathkhadanga.com";
    const size = Math.round(W * 0.075);
    const nameFs = Math.round(size * 0.36);
    const domFs = Math.round(size * 0.27);
    const gap = Math.round(size * 0.22);
    const textW = Math.round(Math.max(brand.length * nameFs * 0.62, domain.length * domFs * 0.58));
    const right = style === "infographic";
    const logoB64 = (await sharp(logoPath).resize(size, size, { fit: "contain" }).png().toBuffer()).toString("base64");
    const pad = Math.round(size * 0.22);
    const innerW = size + gap + textW;
    const totalW = innerW + pad * 2;
    const totalH = size + pad * 2;
    const lx = pad + (right ? textW + gap : 0);
    const tx = pad + (right ? textW : size + gap);
    const anchor = right ? "end" : "start";
    const pill = dark ? "rgba(10,14,28,0.55)" : "rgba(255,255,255,0.82)";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}">` +
      `<rect width="${totalW}" height="${totalH}" rx="${pad}" fill="${pill}"/>` +
      `<image href="data:image/png;base64,${logoB64}" x="${lx}" y="${pad}" width="${size}" height="${size}"/>` +
      `<text x="${tx}" y="${pad + Math.round(size * 0.48)}" text-anchor="${anchor}" font-family="${FONT}" font-weight="700" font-size="${nameFs}" fill="${ink}">${esc(brand)}</text>` +
      `<text x="${tx}" y="${pad + Math.round(size * 0.48 + domFs * 1.5)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${domFs}" fill="${soft}">${esc(domain)}</text>` +
      `</svg>`;
    const left = right ? W - totalW - margin : margin;
    const top = dark ? margin : H - totalH - margin;
    layers.push({ input: Buffer.from(svg), left, top });
  }

  png = await sharp(png).composite(layers).png().toBuffer();
}

await writeFile(out, png);
console.log(`Saved ${out} (${model}, ${style})`);
