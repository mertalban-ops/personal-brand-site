---
name: labs-add-project
description: Use when adding a new project to Albanexa Labs (the interactive Tree of Life at /labs). Adds a LabProject to data/labs.ts, which makes a new golden apple appear on the tree and generates its /labs/[slug] page. Trigger phrases - "Albanexa Labs'e yeni proje ekle", "add project to Labs", "yeni elma ekle".
---

# Add a project to Albanexa Labs

One published project = one apple on the Tree of Life. Adding a project is a
single edit to `data/labs.ts` plus validation.

## Steps

1. **Gather the project facts** from the user (ask only for what's missing):
   - title (brand name, language-neutral)
   - summary (short — shown in the hover tooltip) in TR (EN/DE optional; TR is the fallback)
   - description (longer, for the detail page)
   - category: `customer-project` | `product-lab` | `internal-project` | `concept-work`
   - technologies[], tools[] (optional)
   - caseUrl / demoUrl / repositoryUrl (optional — only add if real)
   - prompts / installationSteps / downloads / gallery (optional — only if they exist)

2. **Append a `LabProject`** to the `labProjects` array in `data/labs.ts`:
   - `id`: STABLE and unique, prefix `lab-` + kebab slug. NEVER reuse or change an existing id — it drives apple placement.
   - `slug`: unique kebab-case (becomes `/labs/<slug>`).
   - `accentColor`: a hex like `#38bdf8` (used for the hover label + apple tint). Pick one distinct from neighbours.
   - `status`: `"published"` to show the apple now, or `"draft"` to hide it.
   - `createdAt`: today's date `YYYY-MM-DD`. Older projects keep their apple slots; new ones fill remaining slots, so existing apples never move.
   - Fill ONLY fields that are genuinely known. Omit empty gallery/prompts/downloads — the detail page renders only present data.

3. **Validate**: `node scripts/labs-validate.mjs` (must print `✓ PASS`).

4. **Build**: `npm run build` (confirms `/labs/<slug>` is generated via generateStaticParams, with no type errors).

5. **Verify the apple** (optional but recommended): `npm run dev`, open `/labs`, confirm a new glowing apple appears and clicking it opens the new detail page.

## Notes
- To remove a project: delete its object (or set `status: "draft"`). Its apple disappears; others stay put.
- Keep `related` slugs pointing at existing slugs (the validator enforces this).
- Anchor pool is 64 slots (see `lib/labs/anchors.ts` POOL_SIZE); past ~50 projects, raise it.
