#!/usr/bin/env node
/**
 * IndexNow auto-ping
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs --auto          # postbuild: ping URLs from git diff
 *   node scripts/indexnow-ping.mjs /blog/my-slug   # manual paths
 *   node scripts/indexnow-ping.mjs --dry-run --auto
 *
 * Runs on production builds when INDEXNOW_KEY is set (Vercel production).
 * Set INDEXNOW_FORCE=1 to ping from local/preview.
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const HOST = "somanathkhadanga.com";
const BASE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const ROOT = process.cwd();

const args = process.argv.slice(2);
const isAuto = args.includes("--auto");
const isDryRun = args.includes("--dry-run");
const manualPaths = args.filter((a) => !a.startsWith("--"));

function getKey() {
  if (process.env.INDEXNOW_KEY?.trim()) return process.env.INDEXNOW_KEY.trim();

  // Fallback: read the committed public key file (IndexNow keys are public by design)
  const publicDir = join(ROOT, "public");
  if (!existsSync(publicDir)) return "";
  const match = readdirSync(publicDir).find((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
  if (!match) return "";
  return readFileSync(join(publicDir, match), "utf8").trim();
}

function shouldRun() {
  if (process.env.INDEXNOW_FORCE === "1") return true;
  if (process.env.VERCEL_ENV === "production") return true;
  if (process.env.CI === "true" && process.env.GITHUB_REF === "refs/heads/main") return true;
  // Manual CLI without --auto always allowed if key present
  if (!isAuto) return true;
  return false;
}

function toUrl(pathOrUrl) {
  const raw = pathOrUrl.trim();
  if (!raw) return null;
  if (raw.startsWith("http")) {
    try {
      const u = new URL(raw);
      if (u.hostname !== HOST && u.hostname !== `www.${HOST}`) return null;
      const path = u.pathname.replace(/\/$/, "") || "";
      return `${BASE_URL}${path}`;
    } catch {
      return null;
    }
  }
  const path = (raw.startsWith("/") ? raw : `/${raw}`).replace(/\/$/, "") || "";
  return `${BASE_URL}${path}`;
}

function gitChangedFiles() {
  const tries = [
    "git diff --name-only HEAD~1 HEAD",
    "git diff --name-only HEAD^ HEAD",
  ];

  // Vercel: prefer previous deploy SHA when available
  const prev = process.env.VERCEL_GIT_PREVIOUS_SHA;
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";
  if (prev) {
    tries.unshift(`git diff --name-only ${prev} ${sha}`);
  }

  for (const cmd of tries) {
    try {
      const out = execSync(cmd, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) return out.split("\n").filter(Boolean);
    } catch {
      // try next strategy
    }
  }
  return [];
}

/** Map repo files → public URLs to notify IndexNow about. */
function urlsFromFiles(files) {
  const urls = new Set();

  for (const file of files) {
    // Blog MDX
    const blog = file.match(/^content\/blog\/(.+)\.mdx$/);
    if (blog) {
      const slug = blog[1];
      urls.add(`${BASE_URL}/blog/${slug}`);
      urls.add(`${BASE_URL}/blog`);
      // Web stories are often generated 1:1 from blog slugs
      urls.add(`${BASE_URL}/stories/${slug}`);
      urls.add(`${BASE_URL}/stories`);
      continue;
    }

    // App Router page.tsx → route
    const page = file.match(/^src\/app\/(.+)\/page\.(tsx|ts|jsx|js)$/);
    if (page) {
      const route = page[1]
        .split("/")
        .filter((seg) => !seg.startsWith("[") && !seg.startsWith("("))
        .join("/");
      if (route && !route.includes("api/")) {
        urls.add(`${BASE_URL}/${route}`);
      }
      continue;
    }

    // Root page
    if (file === "src/app/page.tsx" || file === "src/app/page.ts") {
      urls.add(BASE_URL);
      continue;
    }

    // Service client components map to service pages
    const serviceClient = file.match(
      /^src\/components\/services\/(SaasMvp|NextjsPerformance|ProductionReadiness|AiSaas)DevelopmentClient\.tsx$/
    );
    if (serviceClient || file.includes("SaasMvpDevelopmentClient")) {
      const map = {
        SaasMvpDevelopmentClient: "/services/saas-mvp-development",
        NextjsPerformanceClient: "/services/nextjs-performance-optimization",
        ProductionReadinessClient: "/services/production-readiness-upgrade",
        AiSaasDevelopmentClient: "/services/ai-saas-development",
      };
      const name = basename(file, ".tsx");
      if (map[name]) urls.add(`${BASE_URL}${map[name]}`);
      continue;
    }

    if (file.startsWith("src/components/services/Mvp") || file.includes("MvpTrackedCtas") || file.includes("MvpPageHelper")) {
      urls.add(`${BASE_URL}/services/saas-mvp-development`);
      continue;
    }

    if (file === "src/lib/web-stories.ts") {
      urls.add(`${BASE_URL}/stories`);
      continue;
    }

    if (file === "src/app/sitemap.ts") {
      urls.add(`${BASE_URL}/`);
      continue;
    }
  }

  return [...urls];
}

async function submit(urls) {
  const key = getKey();
  if (!key) {
    console.log("[indexnow] Skip: INDEXNOW_KEY missing and no public key file found.");
    return;
  }

  const unique = [...new Set(urls.map(toUrl).filter(Boolean))];
  if (unique.length === 0) {
    console.log("[indexnow] Nothing to submit.");
    return;
  }

  console.log(`[indexnow] Submitting ${unique.length} URL(s):`);
  for (const u of unique) console.log(`  - ${u}`);

  if (isDryRun) {
    console.log("[indexnow] Dry run — no request sent.");
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${BASE_URL}/${key}.txt`,
      urlList: unique,
    }),
  });

  const body = await res.text().catch(() => "");
  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] OK (${res.status})`);
  } else {
    console.warn(`[indexnow] Failed (${res.status}) ${body.slice(0, 200)}`);
    // Do not fail the build
  }
}

async function main() {
  if (isAuto && !shouldRun()) {
    console.log(
      "[indexnow] Skip auto-ping (not production). Set INDEXNOW_FORCE=1 to override."
    );
    return;
  }

  let urls = [];
  if (isAuto) {
    const files = gitChangedFiles();
    console.log(`[indexnow] Changed files: ${files.length || 0}`);
    if (files.length) {
      for (const f of files.slice(0, 30)) console.log(`  · ${f}`);
      if (files.length > 30) console.log(`  · … +${files.length - 30} more`);
    }
    urls = urlsFromFiles(files);
    // If first shallow deploy with no diff, ping core conversion pages once
    if (urls.length === 0 && process.env.VERCEL_ENV === "production") {
      urls = [
        BASE_URL,
        `${BASE_URL}/services/saas-mvp-development`,
        `${BASE_URL}/blog`,
        `${BASE_URL}/services`,
      ];
      console.log("[indexnow] No file diff — fallback core URLs.");
    }
  } else {
    urls = manualPaths;
    if (urls.length === 0) {
      console.log("Usage: node scripts/indexnow-ping.mjs --auto | /path [/path...]");
      process.exit(0);
    }
  }

  await submit(urls);
}

main().catch((err) => {
  console.warn("[indexnow] Error (non-fatal):", err?.message || err);
  process.exit(0);
});
