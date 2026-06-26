# shreyshi-lacuna

Redesign of **shreyshithapliyal.vercel.app** — built on the ohm.quest skeleton,
re-skinned entirely into Shreyshi's own design language.

## What it is
A two-route personal site for Shreyshi Thapliyal (visual communication designer &
mixed-media illustrator, Dehradun):
- `/` — home dashboard: tagline, selected work, elsewhere, current work, what i can do.
- `/lacuna` — "lacuna · a journal": her 18-piece art gallery + a looped "longing" track.

## Design language (HERS — not generic, not nocturne)
Lifted verbatim from her live site:
- **Theme:** warm-cream light ground `#f7f2e6` (default) + green→blue→indigo gradient mesh.
  Her dark theme (`#1c1119`) is preserved as a toggle. Light is default (no nocturne).
- **Fonts:** Doto (display), Space Grotesk (UI), Space Mono (data/labels), Caveat Brush (accent).
- **Flower elements (her signature, all preserved):**
  - `CursorFlower` — a daisy that trails the cursor; spins over interactive targets,
    shrinks on press, swaps to a pink pointed bloom on `/lacuna` (body `.lacuna-page`).
  - `Footmark` — footer daisy that slowly rotates + breathes with twinkling pixel-sparkles.
- **Bio reveal (`BioReveal`):** tap the `shreyshi.` name pill → modal with her B&W portrait
  under a pink pixel-flower vine overlay + grain, her bio, and links. (The ohm.quest
  "tap the name to open info" interaction, in her aesthetic.)

## Architecture
- Vite + React 18 + TS + react-router-dom + framer-motion. No tailwind — pure CSS vars
  (`src/index.css`) + inline styles. Theme + cursor flower + mesh live in `src/main.tsx`.
- Content is centralised in `src/data.ts` (work, links, gallery, bio copy).
- Assets in `public/`: `shreyshi.png` (portrait), `shreyshi-cyber.png` (pink pixel-flower
  overlay), `lacuna/*.jpg` (18 artworks), favicon. "longing" streams from YouTube `bRcMvvAulfw`.

## Run / build
- `bun install` then `bun run dev` (port 8080) or `bun run build` → `dist/`.
- Verified: tsc clean, vite build clean, no console errors; home + bio + lacuna checked
  at desktop (1440) and mobile (390); cursor flower tracks the mouse.

## Spotify (her live "now playing")
- Frontend fetches `/api/now-playing` (relative).
- **Dev:** `vite.config.ts` proxies `/api` → `https://shreyshithapliyal.vercel.app` (avoids CORS; shows her real track).
- **Prod:** `api/now-playing.js` (Vercel serverless) serves it same-origin. On deploy, set these env vars
  — copy them from her existing Vercel project (this IS "her spotify secret"):
  `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.

## Layout = exact ohm.quest skeleton
Split hero: LEFT = giant `shreyshi.` → tap reveals the bio **inside the same pane** (portrait + pink
pixel-flowers + bio + links), not a popup. RIGHT = widget rail (dehradun clock in Space Mono · her live
Spotify · currently · ethos quote + a "lacuna" CTA button · selected work · footer). No Doto / no
"nothing" dot-matrix font anywhere.

## Not done (ohm's call)
- Deploy. Build + screenshot only — delivery to her Vercel + setting the 3 Spotify env vars is a separate step.
