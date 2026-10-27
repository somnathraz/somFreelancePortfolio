#!/usr/bin/env node
/**
 * Copies every <episode>/trace.json from a local interview-traps checkout
 * into content/traps/<slug>.json.
 *
 *   npm run traps:sync                         # expects ../interview-traps
 *   TRAPS_DIR=~/code/interview-traps npm run traps:sync
 */
import fs from "node:fs";
import path from "node:path";

const src = path.resolve(process.env.TRAPS_DIR ?? path.join(process.cwd(), "..", "interview-traps"));
const dest = path.join(process.cwd(), "content", "traps");

if (!fs.existsSync(src)) {
    console.error(`✖ interview-traps not found at ${src}. Set TRAPS_DIR.`);
    process.exit(1);
}
fs.mkdirSync(dest, { recursive: true });

let count = 0;
for (const dir of fs.readdirSync(src).filter((d) => /^\d{2}-/.test(d)).sort()) {
    const file = path.join(src, dir, "trace.json");
    if (!fs.existsSync(file)) continue;
    const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
    if (bundle.schemaVersion !== 1 || !bundle.slug) {
        console.warn(`⚠ skipped ${dir}: unsupported trace (schemaVersion ${bundle.schemaVersion})`);
        continue;
    }
    fs.writeFileSync(path.join(dest, `${bundle.slug}.json`), JSON.stringify(bundle, null, 2) + "\n");
    console.log(`✔ ${dir} → content/traps/${bundle.slug}.json`);
    count++;
}
console.log(`\n${count} trap(s) synced.`);
