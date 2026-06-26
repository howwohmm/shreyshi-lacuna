# Handoff — shreyshi site update

Repo: **github.com/howwohmm/shreyshi-lacuna** · Live target: **shreyshithapliyal.vercel.app**

## The one file to send her
`update-shreyshi-website.command` — she double-clicks it on her Mac. It pulls this
repo, builds, and deploys to her live site. (It's the same idea as last month's
`START HERE.command` from the claude-kit.)

What it does, in order: checks Node → clones/updates the repo to `~/shreyshi-website`
→ `npm install` + build → `vercel link` (she picks her EXISTING `shreyshithapliyal`
project) → `vercel --prod` → opens the live URL.

## 3 things only a human can close (stated plainly — I could not do these for you)

1. **Vercel auth + link.** The command runs `vercel login` (opens browser, one-time)
   and `vercel link`. She MUST pick the **existing `shreyshithapliyal` project** when
   asked — that keeps the same web address AND inherits the Spotify secret. If she
   creates a *new* project, it deploys to a random URL and Spotify goes blank.
   (I couldn't verify her Vercel from here — ohm's CLI wasn't logged in.)

2. **Spotify secret.** Only needed IF a fresh project is made. Her existing project
   already has `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN`
   (that's why her current now-playing works) — deploying to that same project reuses
   them automatically. To copy into a new project:
   `vercel env add SPOTIFY_CLIENT_ID production` (×3), values from the old project's
   Vercel → Settings → Environment Variables.

3. **Spot-check the Instagram links** on /lacuna. Only **2 of 18** artworks are linked
   to an exact IG post (verified by image + caption):
   - `blue-portrait` → instagram.com/lacuna.3/p/DVQxd_5kfjv/
   - `dragon` → instagram.com/lacuna.3/p/DWHXbB9k_3f/
   The other **16 fall back to her IG profile** (a tap always lands somewhere real,
   never a *wrong* post — that was the safe call). To wire more, set `link` per item
   in `src/data.ts` to the right `/p/<shortcode>/` url.

## What's in this update
- Layout = exact ohm.quest skeleton; tap the name → bio reveals **in the left pane**.
- Theme rebuilt from HER artwork palette (cobalt + gold + rose + terracotta), warm
  bone light / warm aubergine-ink dark, both jewel-toned. No "Nothing"/Doto font.
- Fonts: Space Grotesk + Space Mono + Caveat Brush.
- Her small elements: cursor daisy, footer breathing daisy, mini rotating daisy.
- Favicon = her gold flower (`favicon.svg`).
- /lacuna: "longing" autoplays quietly (~35% volume), pausable. Browsers block
  autoplay-with-sound until a click/scroll — it starts on the first one if blocked.
- Lottie daisy-bloom loading screen on first load.
- Gallery artworks link out to Instagram (see point 3).

## Verified
tsc clean · vite build clean · home + /lacuna · light + dark · spotify (via her live
api) · IG links resolve · loader · favicon · cursor flower. NOT verifiable by me:
the live Vercel deploy itself (needs her auth) — that's what the .command is for.
