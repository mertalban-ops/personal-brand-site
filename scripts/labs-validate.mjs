#!/usr/bin/env node
// Validates data/labs.ts integrity for Albanexa Labs.
// Dependency-free (text scan). Run: node scripts/labs-validate.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "data/labs.ts"), "utf8");

// Anchor pool capacity must stay in sync with lib/labs/anchors.ts POOL_SIZE.
const POOL_SIZE = 64;

const ids = [...src.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const accents = [...src.matchAll(/accentColor:\s*"([^"]+)"/g)].map((m) => m[1]);
const statuses = [...src.matchAll(/status:\s*"(draft|published)"/g)].map((m) => m[1]);
const relatedBlocks = [...src.matchAll(/related:\s*\[([^\]]*)\]/g)].map((m) => m[1]);
const relatedSlugs = relatedBlocks.flatMap((b) =>
  [...b.matchAll(/"([^"]+)"/g)].map((x) => x[1]),
);

const errors = [];
const warn = [];

function dupes(arr) {
  const seen = new Set();
  const dup = new Set();
  for (const v of arr) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

if (ids.length !== slugs.length)
  warn.push(`id count (${ids.length}) != slug count (${slugs.length})`);

const dupIds = dupes(ids);
if (dupIds.length) errors.push(`Duplicate ids: ${dupIds.join(", ")}`);

const dupSlugs = dupes(slugs);
if (dupSlugs.length) errors.push(`Duplicate slugs: ${dupSlugs.join(", ")}`);

for (const s of slugs)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) errors.push(`Slug not kebab-case: "${s}"`);

for (const c of accents)
  if (!/^#[0-9a-fA-F]{6}$/.test(c)) errors.push(`Invalid accentColor: "${c}"`);

const slugSet = new Set(slugs);
for (const r of relatedSlugs)
  if (!slugSet.has(r)) errors.push(`related slug "${r}" has no matching project`);

const publishedCount = statuses.filter((s) => s === "published").length;
if (publishedCount > POOL_SIZE)
  errors.push(`${publishedCount} published projects exceed anchor pool (${POOL_SIZE}). Raise POOL_SIZE.`);
if (publishedCount > POOL_SIZE * 0.8)
  warn.push(`${publishedCount}/${POOL_SIZE} anchor slots used — approaching capacity.`);

console.log(`Albanexa Labs — data validation`);
console.log(`  projects: ${slugs.length}  (published: ${publishedCount}/${POOL_SIZE})`);
console.log(`  accents: ${accents.length}  related refs: ${relatedSlugs.length}`);
warn.forEach((w) => console.log(`  ⚠ ${w}`));

if (errors.length) {
  console.error(`\n✗ FAIL — ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`\n✓ PASS — labs data is valid.`);
