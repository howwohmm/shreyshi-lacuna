// Vercel serverless — Shreyshi's Spotify "now playing" (same shape as her original site).
// Set these env vars on deploy (copy them from her existing Vercel project — "her spotify secret"):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// Returns { isPlaying, title, artist, albumArt, url }. Falls back to last-played when idle.

// Vercel serverless — Shreyshi's Spotify "now playing".
// Uses her existing env secret (SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN on the project).
// Her refresh token's scope is currently-playing only (recently-played returns 403
// "insufficient scope"), so we show the live track when she's playing and a clean
// "not listening" otherwise. To also show the LAST track when idle, re-auth Spotify
// with the `user-read-recently-played` scope and update SPOTIFY_REFRESH_TOKEN.
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_URL = "https://api.spotify.com/v1/me/player/currently-playing";

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
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
    const tokRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: SPOTIFY_REFRESH_TOKEN }),
    });
    const token = (await tokRes.json()).access_token;

    const now = await fetch(NOW_URL, { headers: { Authorization: `Bearer ${token}` } });
    if (now.status === 200) {
      const data = await now.json();
      if (data?.item) return res.status(200).json(shape(data.item, !!data.is_playing));
    }
    return res.status(200).json({ isPlaying: false });
  } catch {
    return res.status(200).json({ isPlaying: false });
  }
}
