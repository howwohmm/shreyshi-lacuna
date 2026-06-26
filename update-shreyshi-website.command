#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  shreyshi — update your live website 🌼
#  double-click this file. it pulls your new site and puts it live
#  on shreyshithapliyal.vercel.app. that's it.
# ─────────────────────────────────────────────────────────────
set -eo pipefail
cd "$(dirname "$0")"

# It runs on HER Mac with HER vercel login — nobody else's credentials needed.
# First run only: it pops a browser to log into vercel (her account, the one that
# owns shreyshithapliyal) and asks her to pick that project once. After that, every
# run is pure double-click. (Optional: if a vercel token is ever pasted below, it
# skips even those first-run steps — but it works perfectly fine left empty.)
VERCEL_TOKEN=""
VERCEL_PROJECT="shreyshi"
VERCEL_SCOPE="shreyshithapliyalst-8178s-projects"
VERCEL_PROJECT_ID="prj_DZhgPH9ZhE0rh9xhU6lat9LzgUOB"

GOLD='\033[38;5;179m'; ROSE='\033[38;5;211m'; DIM='\033[2m'; B='\033[1m'; R='\033[0m'
say() { printf "${GOLD}%s${R}\n" "$1"; }
soft() { printf "${DIM}%s${R}\n" "$1"; }

clear
printf "${ROSE}${B}\n  🌼  lacuna — updating your website\n${R}\n"
soft "  sit back, this takes a couple minutes and does everything itself."
echo ""

REPO="https://github.com/howwohmm/shreyshi-lacuna.git"
DIR="$HOME/shreyshi-website"

# helper: stop with a friendly, visible message (never a silent dead-end)
die() { echo ""; printf "${B}✗ %s${R}\n" "$1"; echo ""; soft "  screenshot this window and send it to ohm — he'll sort it."; printf "${B}press enter to close.${R}\n"; read _ ; exit 1; }

# 1. node check (must exist AND be v18+, which vite 5 / framer-motion 12 need)
if ! command -v node >/dev/null 2>&1; then
  say "→ i need node.js first. opening the download page…"
  open "https://nodejs.org/en/download/"
  echo ""
  printf "${B}install node, then double-click this file again. press enter to close.${R}\n"
  read _ ; exit 0
fi
NODE_MAJOR=$(node -v | sed -E 's/v([0-9]+).*/\1/')
if [ "$NODE_MAJOR" -lt 18 ] 2>/dev/null; then
  say "→ your node.js is too old (need v18+). opening the download page…"
  open "https://nodejs.org/en/download/"
  printf "${B}install the latest node, then run this file again. press enter to close.${R}\n"
  read _ ; exit 0
fi

# 2. get the latest site code
if [ -d "$DIR/.git" ]; then
  say "→ getting the latest version of your site…"
  { git -C "$DIR" fetch --depth 1 origin main -q && git -C "$DIR" reset --hard origin/main -q; } || die "couldn't fetch the latest site (check your internet)."
else
  say "→ downloading your site…"
  rm -rf "$DIR"
  git clone --depth 1 "$REPO" "$DIR" -q || die "couldn't download the site (check your internet)."
fi
cd "$DIR" || die "couldn't open the site folder."

# 3. install + build  (show errors — never fail silently)
say "→ building… (this is the long bit, ~2 min)"
npm install --no-audit --no-fund 2>&1 | tail -3 || die "couldn't install the building blocks (npm install failed)."
npm run build 2>&1 | tail -6 || die "the build didn't finish."
[ -d dist ] || die "the build produced no output."
say "  ✓ built"
echo ""

# 4. deploy with vercel
if [ -n "$VERCEL_TOKEN" ]; then
  # ── fully automatic: token baked in by ohm, no prompts for her ──
  say "→ putting your site live… (no clicks needed, ~1 min)"
  npx --yes vercel@latest link --yes --project "$VERCEL_PROJECT" --scope "$VERCEL_SCOPE" --token "$VERCEL_TOKEN" >/dev/null 2>&1 \
    || die "couldn't connect to vercel (the access key may be wrong or expired — tell ohm)."
  npx --yes vercel@latest deploy --prod --yes --scope "$VERCEL_SCOPE" --token "$VERCEL_TOKEN" 2>&1 | tail -4 \
    || die "the deploy didn't finish."
else
  # ── fallback (ohm didn't bake a token): one-time vercel login + link ──
  say "→ putting it live. a browser may open to log into vercel — that's normal."
  soft "   if it asks 'Link to existing project?' say YES and pick:  shreyshithapliyal"
  echo ""
  npx --yes vercel@latest link
  echo ""
  say "→ deploying to production…"
  npx --yes vercel@latest --prod
fi

echo ""
printf "${ROSE}${B}  ✓ done! your site is live at https://shreyshithapliyal.vercel.app  🌼${R}\n\n"
soft "  (if now-playing looks empty, it deployed to a NEW project — tell ohm to"
soft "   copy the 3 SPOTIFY_ env vars over.)"
echo ""
open "https://shreyshithapliyal.vercel.app" || true
printf "${B}press enter to close.${R}\n"; read _
