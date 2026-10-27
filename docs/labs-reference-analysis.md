# Albanexa Labs — Reference Video Analysis

**Source:** `referans video/Glowing_apple_tumbling_from_island_1080p_20261026152926.mp4`
**Metadata:** 1920×1080 · H.264 · 24 fps · 240 frames · 10.0s · ~7.6 Mbps · AAC audio
**Method:** ffmpeg 9.0 (arm64, static) frame extraction @ 2 fps → 4×5 montage, visual read.

## Scene breakdown (timeline)
| Time | Beat | Notes |
|------|------|-------|
| 0.0–1.5s | Establishing | Floating island + hero tree seen wide/from below; cloud sea fills frame; large soft moon upper-right; warm golden backlight; distant mini floating islands + balloon silhouettes for depth. |
| 2.0–3.5s | Dolly-in | Camera pushes toward tree; waterfalls stream off island edges; volumetric god-rays; golden apples visible in canopy. |
| 4.0–5.5s | Hero framing | Close on tree — large emissive golden apple foreground-left, organic spreading branches, dense backlit foliage, rooty/rocky island underside. |
| 6.0–7.5s | Apple fall | One glowing apple detaches, tumbles downward toward clouds with slight spin; camera follows the descent. |
| 8.0–10.0s | Transition | Apple glow blooms into a bright light burst (lens flare), then dissolves into a field of golden sparkle/bokeh particles. |

## Visual DNA
- **Palette:** warm amber/gold highlights (#F4C66A-ish), cream/ivory cloud sea, muted sage-green canopy, soft teal-grey cloud shadows, pale ivory sky.
- **Light:** strong warm key from upper-right/back (golden hour) → rim light on leaves & apple; soft fill from cloud bounce.
- **Atmosphere:** heavy soft fog/haze, layered clouds, floating dust/light particles, subtle DOF (background clouds soft).
- **Composition:** single hero tree is the undisputed focus, roughly centered, slightly low camera angle looking up.
- **Island:** disc of rock/earth, grass top, rocky+root underside, waterfalls off rim.
- **Tree:** thick trunk, broad organic canopy, many spreading secondary branches, dense leaves.
- **Apples:** golden, emissive glow, nestled in foliage (not floating free), premium metallic-ish material but silhouette preserved (bloom not blown out).
- **Depth cues:** distant smaller islands + balloon shapes, parallax, atmospheric perspective.

## Translation to real-time 3D (not pixel copy)
- Procedural tree (branch recursion + instanced leaf cards) — avoids heavy GLB, fast load, no licensing.
- Floating island: low-poly rock disc + grass cap + instanced rocks; optional waterfall shader planes.
- Clouds: layered soft sprite/volumetric billboards + fog; large soft moon as a backdrop sphere/plane.
- Lighting: warm directional key (upper-right) + hemisphere fill; emissive apple material + selective bloom.
- Intro: ~2s dolly-in easing to fixed hero framing, then fixed camera with slight pointer parallax.
- Apple click → shake → detach → gravity fall + spin → light burst → particle dissolve → route to `/labs/[slug]`.
- Mobile: reduced leaf/particle counts, capped DPR, bloom off/cheap, shorter intro.
