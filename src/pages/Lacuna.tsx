import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gallery, lacunaMeta, profile } from "../data";
import { Footmark } from "../components/Footmark";

type Props = { theme: "light" | "dark"; onToggleTheme: () => void };

// "longing" — her track, streamed from youtube (same as her original site)
const SONG_ID = "bRcMvvAulfw";

export const Lacuna = ({ theme, onToggleTheme }: Props) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  // the lacuna route swaps the cursor daisy → pink pointed bloom
  useEffect(() => {
    document.body.classList.add("lacuna-page");
    return () => document.body.classList.remove("lacuna-page");
  }, []);

  // longing: autoplay quietly via the YT IFrame API (volume ~35%), pausable.
  // browsers block autoplay-with-sound until a gesture, so we also try on first
  // deliberate click / scroll / key (NOT mousemove — music shouldn't lurch in).
  const userPausedRef = useRef(false);

  useEffect(() => {
    const w = window as any;
    let cancelled = false;

    // the gesture fallback only ever KICK-STARTS the first play. it must never
    // override a deliberate pause, so it no-ops once the user has paused and the
    // listeners are torn down the moment playback actually starts.
    const tryPlay = () => {
      if (userPausedRef.current) return;
      try { playerRef.current?.playVideo?.(); } catch { /* noop */ }
    };
    const removeGestures = () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };

    const init = () => {
      if (cancelled || !w.YT?.Player) return;
      playerRef.current = new w.YT.Player("longing-player", {
        videoId: SONG_ID,
        playerVars: { autoplay: 1, loop: 1, playlist: SONG_ID, controls: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(35);
            try { e.target.playVideo(); } catch { /* blocked until gesture */ }
          },
          onStateChange: (e: any) => {
            const isPlaying = e.data === w.YT.PlayerState.PLAYING;
            setPlaying(isPlaying);
            if (isPlaying) removeGestures(); // fallback's job is done
          },
        },
      });
    };

    if (w.YT?.Player) init();
    else {
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => { prev?.(); init(); };
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("scroll", tryPlay, { once: true, passive: true });
    window.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      cancelled = true;
      removeGestures();
      try { playerRef.current?.destroy?.(); } catch { /* noop */ }
    };
  }, []);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) { userPausedRef.current = true; p.pauseVideo(); }
    else { userPausedRef.current = false; p.playVideo(); }
  };

  return (
    <div className="lac">
      <style>{`
        .lac { max-width: 1180px; margin: 0 auto; padding: clamp(20px, 4vw, 40px) clamp(20px, 5vw, 56px) clamp(48px, 8vw, 96px); min-height: 100svh; display: flex; flex-direction: column; }
        .lac-hd { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-bottom: clamp(40px, 8vw, 72px); }
        .lac-hd-left { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
        .lac-hero { max-width: 48ch; padding-bottom: clamp(40px, 8vw, 80px); }
        .lac-title { font-family: var(--font-ui); font-weight: 300; font-size: clamp(3rem, 10vw, 6rem); line-height: .95; letter-spacing: -.03em; color: var(--text-display); margin: 14px 0 0; }
        .lac-line { font-family: var(--font-hand); font-weight: 400; font-size: clamp(1.5rem, 3.4vw, 2.2rem); line-height: 1.25; color: var(--terracotta); margin: 18px 0 0; }
        .lac-masonry { column-count: 3; column-gap: clamp(14px, 2.4vw, 26px); }
        @media (max-width: 1099px) { .lac-masonry { column-count: 2; } }
        @media (max-width: 619px)  { .lac-masonry { column-count: 1; } }
        .lac-item { break-inside: avoid; margin: 0 0 clamp(14px, 2.4vw, 26px); }
        .lac-frame { display: block; padding: 10px; background: var(--surface-raised); border: 1px solid var(--border-vis); border-radius: 2px; box-shadow: 0 1px 0 rgba(60,40,20,.04); transition: box-shadow .5s ease, transform .5s ease; }
        .lac-frame img { display: block; width: 100%; height: auto; }
        .lac-frame:hover { transform: translateY(-3px); box-shadow: 0 22px 54px -24px rgba(0,0,0,.5); }
        .lac-foot { margin-top: auto; padding-top: clamp(48px, 8vw, 88px); display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .lac-foot-row { display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 16px; flex-wrap: wrap; }
        .tg { font-family: var(--font-data); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-disabled); background: none; border: 0; cursor: pointer; transition: color .15s; }
        .tg:hover { color: var(--text-primary); }
        @media (max-width: 760px) { .lac-hero { max-width: none; } }
      `}</style>

      {/* hidden youtube player (YT IFrame API replaces this div) */}
      <div style={{ position: "absolute", width: 1, height: 1, left: -9999, top: -9999, overflow: "hidden" }}>
        <div id="longing-player" />
      </div>

      {/* header */}
      <header className="lac-hd">
        <div className="lac-hd-left">
          <Link to="/" className="n-navlink" style={{ color: "var(--text-display)" }}>
            ‹ {profile.name}
          </Link>
          <span className="lac-kicker">lacuna · a journal</span>
        </div>
        <button className="tg" onClick={onToggleTheme}>
          {theme === "light" ? "dark" : "light"}
        </button>
      </header>

      {/* hero */}
      <motion.section className="lac-hero" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
        <span className="lac-kicker">{lacunaMeta.definition}</span>
        <h1 className="lac-title">{lacunaMeta.heading}</h1>
        <p className="lac-line">{lacunaMeta.line}</p>
        <button className="lac-song-btn" style={{ marginTop: 24 }} onClick={toggle} aria-pressed={playing}>
          <span>{playing ? "❚❚ pause" : "▶ play"}</span> {lacunaMeta.song}
        </button>
      </motion.section>

      {/* gallery — each piece links to its instagram post */}
      <div className="lac-masonry">
        {gallery.map((art, i) => (
          <motion.figure
            key={art.src}
            className="lac-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: Math.min((i % 4) * 0.1, 0.3) }}
          >
            <a className="lac-frame" href={art.link} target="_blank" rel="noopener noreferrer" aria-label="view on instagram">
              <img src={art.src} alt="" loading="lazy" />
            </a>
          </motion.figure>
        ))}
      </div>

      {/* footer */}
      <footer className="lac-foot">
        <Footmark />
        <div className="lac-foot-row">
          <span className="footmark-text">{profile.location}</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link className="n-link" to="/">home</Link>
            <a className="n-link" href="https://www.instagram.com/lacuna.3/" target="_blank" rel="noopener noreferrer">instagram</a>
            <a className="n-link" href="https://www.behance.net/shreyshthapliy" target="_blank" rel="noopener noreferrer">behance</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
