---
name: labs-audit
description: Use to audit the Albanexa Labs experience (/labs) — checks project/apple data integrity, broken links, build health, and optionally runs browser interaction + responsive checks. Trigger - "Labs'i denetle", "audit Labs", "Labs QA".
---

# Audit Albanexa Labs

## 1. Data integrity (fast, no server)
Run: `node scripts/labs-validate.mjs`
Confirms: unique ids/slugs, kebab slugs, valid hex accents, related-slug references resolve, published count within the 64-slot anchor pool.

## 2. Build health
Run: `npm run build`
Confirm `/labs` is `○ (Static)` and `/labs/[slug]` is `● (SSG)` with one path per published project, and no type/import errors.

## 3. Broken-link / data sanity
For each project in `data/labs.ts`, check that any `caseUrl`, `demoUrl`, `repositoryUrl`, `gallery[]`, `downloads[].url` either exist (internal routes) or are intentional external URLs. Do not leave dead internal links.

## 4. Browser interaction (optional, needs dev server)
Start `npm run dev`, then with a browser tool:
- `/labs` loads, intro camera settles, apples glow, no console errors (ignore the Vercel `_vercel/insights` 404 locally).
- Hover an apple → tooltip shows title + summary.
- Click an apple → shake → fall → light burst → navigates to `/labs/<slug>`.
- Detail page renders only populated sections; "Labs ağacına dön" returns to `/labs`.
- Directory panel ("Tüm Projeler") lists every project and each link navigates.

## 5. Responsive + accessibility
- Viewports: 390×844 (mobile, low-quality 3D), 768×1024, 1440×900.
- `prefers-reduced-motion: reduce` → intro skipped, apple click navigates without the fall animation.
- WebGL-disabled → the list fallback renders every project.
- Keyboard: directory links and detail-page controls are focusable/operable.

## 6. Regression
Confirm the main site (`/`, `/projeler`, `/cozumler`) is unaffected and the global background scene still renders off `/labs`.

Report each check as PASS/FAIL with the evidence. Never mark an unrun check PASS.
