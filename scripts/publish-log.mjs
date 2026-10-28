#!/usr/bin/env node
// Track where each post was published and whether it worked.
// Log file: doc/publish-log.json (override with PUBLISH_LOG_PATH).
//
//   node scripts/publish-log.mjs set <slug> <platform> <status> [--url <live url>] [--note "why"]
//   node scripts/publish-log.mjs new <slug> [--title "Post title"]     (adds every platform as pending)
//   node scripts/publish-log.mjs report [slug]                          (table + list of failures)
//   node scripts/publish-log.mjs platforms
//
// Statuses: pending | success | failed | manual | skipped
// "manual" = needs a person to post it (LinkedIn, Instagram, YouTube, ...).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LOG = process.env.PUBLISH_LOG_PATH || "doc/publish-log.json";

// Order matters: own site first, then the rest.
export const PLATFORMS = [
  "studio-site",
  "devto",
  "hashnode",
  "medium",
  "substack",
  "hackernoon",
  "peerlist",
  "facebook",
  "linkedin", // Labs/traps build posts only
  "instagram", // posted by the owner; Claude only observes
  "youtube", // posted by the owner; Claude only observes
];
const STATUSES = ["pending", "success", "failed", "manual", "skipped"];
const OWNER_ONLY = new Set(["instagram", "youtube"]);

const [cmd, ...rest] = process.argv.slice(2);
const flags = {};
const pos = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith("--")) flags[rest[i].slice(2)] = rest[++i];
  else pos.push(rest[i]);
}

async function load() {
  try {
    return JSON.parse(await readFile(LOG, "utf8"));
  } catch {
    return { posts: {} };
  }
}
async function save(db) {
  await mkdir(path.dirname(LOG), { recursive: true });
  await writeFile(LOG, JSON.stringify(db, null, 2) + "\n");
}
const now = () => new Date().toISOString();

function entry(db, slug) {
  db.posts[slug] ??= { title: "", created: now(), platforms: {} };
  return db.posts[slug];
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

if (cmd === "platforms") {
  console.log(PLATFORMS.join("\n"));
} else if (cmd === "new") {
  const [slug] = pos;
  if (!slug) fail("Usage: new <slug> [--title ...]");
  const db = await load();
  const p = entry(db, slug);
  if (flags.title) p.title = flags.title;
  for (const pl of PLATFORMS) {
    p.platforms[pl] ??= { status: OWNER_ONLY.has(pl) ? "manual" : "pending", updated: now() };
  }
  await save(db);
  console.log(`Added ${slug} with ${PLATFORMS.length} platforms.`);
} else if (cmd === "set") {
  const [slug, platform, status] = pos;
  if (!slug || !platform || !status) fail("Usage: set <slug> <platform> <status> [--url ...] [--note ...]");
  if (!PLATFORMS.includes(platform)) fail(`Unknown platform. Use one of: ${PLATFORMS.join(", ")}`);
  if (!STATUSES.includes(status)) fail(`Unknown status. Use one of: ${STATUSES.join(", ")}`);
  const db = await load();
  const p = entry(db, slug);
  const prev = p.platforms[platform] || {};
  p.platforms[platform] = {
    ...prev,
    status,
    updated: now(),
    ...(flags.url ? { url: flags.url } : {}),
    ...(flags.note ? { note: flags.note } : {}),
  };
  await save(db);
  console.log(`${slug} / ${platform}: ${status}`);
} else if (cmd === "report") {
  const db = await load();
  const slugs = pos[0] ? [pos[0]] : Object.keys(db.posts);
  if (!slugs.length) fail("No posts logged yet.");
  const icon = { success: "OK  ", failed: "FAIL", pending: "...", manual: "YOU ", skipped: "skip" };
  const failures = [];
  for (const slug of slugs) {
    const p = db.posts[slug];
    if (!p) fail(`Unknown slug ${slug}`);
    console.log(`\n${slug}${p.title ? `  (${p.title})` : ""}`);
    for (const pl of PLATFORMS) {
      const e = p.platforms[pl];
      if (!e) continue;
      console.log(`  ${icon[e.status] || e.status}  ${pl.padEnd(11)} ${e.url || ""}${e.note ? `  - ${e.note}` : ""}`);
      if (e.status === "failed") failures.push(`${slug} / ${pl}${e.note ? `: ${e.note}` : ""}`);
    }
  }
  console.log(failures.length ? `\nFailed (${failures.length}):\n  ${failures.join("\n  ")}` : "\nNo failures.");
} else {
  fail("Commands: new | set | report | platforms");
}
