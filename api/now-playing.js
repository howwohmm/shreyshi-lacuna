// Vercel serverless — Shreyshi's Spotify "now playing" (same shape as her original site).
// Set these env vars on deploy (copy them from her existing Vercel project — "her spotify secret"):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// Returns { isPlaying, title, artist, albumArt, url }. Falls back to last-played when idle.

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: SPOTIFY_REFRESH_TOKEN }),
  });
  const data = await res.json();
  return data.access_token;
}

function shape(track, isPlaying) {
  return {
    isPlaying,
    title: track?.name,
    artist: (track?.artists || []).map((a) => a.name).join(", "),
    albumArt: track?.album?.images?.[0]?.url,
    url: track?.external_urls?.spotify,
  };
}

export default async function handler(_req, res) {
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
  try {
    const token = await getAccessToken();
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    const now = await fetch(NOW_URL, auth);
    if (now.status === 200) {
      const data = await now.json();
      if (data?.item) return res.status(200).json(shape(data.item, !!data.is_playing));
    }

    // nothing playing → last played track
    const recent = await fetch(RECENT_URL, auth);
    if (recent.status === 200) {
      const data = await recent.json();
      const track = data?.items?.[0]?.track;
      if (track) return res.status(200).json(shape(track, false));
    }

    return res.status(200).json({ isPlaying: false });
  } catch {
    return res.status(200).json({ isPlaying: false });
  }
}
