#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  shreyshi — update your live website 🌼
#  double-click this file. it pulls your new site and puts it live
#  on shreyshithapliyal.vercel.app. that's it.
# ─────────────────────────────────────────────────────────────
set -e
cd "$(dirname "$0")"

GOLD='\033[38;5;179m'; ROSE='\033[38;5;211m'; DIM='\033[2m'; B='\033[1m'; R='\033[0m'
say() { printf "${GOLD}%s${R}\n" "$1"; }
soft() { printf "${DIM}%s${R}\n" "$1"; }

clear
printf "${ROSE}${B}\n  🌼  lacuna — updating your website\n${R}\n"
soft "  this takes a few minutes. just follow the prompts when asked."
echo ""

REPO="https://github.com/howwohmm/shreyshi-lacuna.git"
DIR="$HOME/shreyshi-website"

# 1. node check
if ! command -v node >/dev/null 2>&1; then
  say "→ i need node.js first. opening the download page…"
  open "https://nodejs.org/en/download/"
  echo ""
  printf "${B}install node, then double-click this file again. press enter to close.${R}\n"
  read _ ; exit 0
fi

# 2. get the latest site code
if [ -d "$DIR/.git" ]; then
  say "→ getting the latest version of your site…"
  git -C "$DIR" fetch --depth 1 origin main -q && git -C "$DIR" reset --hard origin/main -q
else
  say "→ downloading your site…"
  rm -rf "$DIR"
  git clone --depth 1 "$REPO" "$DIR" -q
fi
cd "$DIR"

# 3. install + build
say "→ building… (this is the long bit, ~2 min)"
npm install --no-audit --no-fund >/dev/null 2>&1
npm run build >/dev/null 2>&1
say "  ✓ built"
echo ""

# 4. deploy with vercel
say "→ putting it live. a browser may open to log you into vercel — that's normal."
soft "   when it asks 'Link to existing project?' say YES and pick:  shreyshithapliyal"
soft "   (picking your EXISTING project keeps your web address + spotify working.)"
echo ""
npx --yes vercel@latest link
echo ""
say "→ deploying to production…"
npx --yes vercel@latest --prod

echo ""
printf "${ROSE}${B}  ✓ done! your site is live at https://shreyshithapliyal.vercel.app  🌼${R}\n\n"
soft "  (if the music/now-playing looks empty, it's because this was a NEW vercel"
soft "   project — ask ohm to copy the 3 SPOTIFY_ env vars from your old project.)"
echo ""
open "https://shreyshithapliyal.vercel.app" || true
printf "${B}press enter to close.${R}\n"; read _
