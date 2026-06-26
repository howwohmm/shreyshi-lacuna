import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { profile, work, links } from "../data";

type Props = { theme: "light" | "dark"; onToggleTheme: () => void };

// her live spotify — relative endpoint: dev proxies to her live api (vite.config),
// prod serves api/now-playing.js using her spotify secret (set env on deploy)
const SPOTIFY_API = "/api/now-playing";

type NowPlaying = { isPlaying: boolean; title?: string; artist?: string; albumArt?: string; url?: string };

const label: CSSProperties = {
  fontFamily: "var(--font-data)",
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-secondary)",
  display: "block",
};
const section = (extra?: CSSProperties): CSSProperties => ({
  flex: 1,
  borderBottom: "1px solid var(--border)",
  padding: "0 24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  ...extra,
});

// small rotating daisy — one of her signature small elements
const MiniDaisy = () => (
  <svg className="mg-flower" viewBox="0 0 100 100" aria-hidden="true" style={{ width: 40, height: 40 }}>
    <g className="mg-rot">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="50" cy="26" rx="9" ry="16" transform={`rotate(${a} 50 50)`} fill="none" stroke="currentColor" strokeWidth="2.4" />
      ))}
      <circle cx="50" cy="50" r="4.5" fill="currentColor" />
    </g>
  </svg>
);

export const Home = ({ theme, onToggleTheme }: Props) => {
  const [bioOpen, setBioOpen] = useState(false);
  const [time, setTime] = useState("--:--:--");
  const [np, setNp] = useState<NowPlaying>({ isPlaying: false });

  // dehradun (IST) clock
  useEffect(() => {
    const tick = () => {
      const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(ist.getUTCHours())}:${p(ist.getUTCMinutes())}:${p(ist.getUTCSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // her live spotify
  useEffect(() => {
    const fetchNp = () =>
      fetch(SPOTIFY_API)
        .then((r) => r.json())
        .then(setNp)
        .catch(() => {});
    fetchNp();
    const id = setInterval(fetchNp, 10_000);
    return () => clearInterval(id);
  }, []);

  const hasTrack = !!(np.title && np.artist);

  return (
    <div className="hero-grid">
      {/* ── LEFT: name → bio reveals IN this pane ── */}
      <div className={`hero-name ${bioOpen ? "is-open" : "is-closed"}`}>
        {/* closed */}
        <div className="bio-closed" onClick={() => setBioOpen(true)}>
          <h1
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(44px, 8.5vw, 132px)",
              fontWeight: 300,
              letterSpacing: "-.04em",
              color: "var(--text-display)",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {profile.name}
          </h1>
          <p style={{ fontFamily: "var(--font-data)", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-secondary)", margin: 0 }}>
            tap to get to know me in one minute
          </p>
          <div style={{ marginTop: 18, color: "var(--gold)", opacity: 0.85 }}>
            <MiniDaisy />
          </div>
        </div>

        {/* open — same pane */}
        <div className="bio-open">
          <div className="bio-top">
            <span className="bio-name" onClick={() => setBioOpen(false)}>
              {profile.name}
            </span>
            <span className="bio-back" onClick={() => setBioOpen(false)} role="button" tabIndex={0}>
              ← close
            </span>
          </div>
          <div className="n-bio-photo">
            <img className="n-bio-photo-img" src="/shreyshi.png" alt="shreyshi thapliyal" />
            <img className="n-bio-cyber" src="/shreyshi-cyber.png" alt="" aria-hidden="true" />
            <div className="n-bio-grain" />
          </div>
          <h2 className="n-bio-heading">Shreyshi Thapliyal</h2>
          <div className="n-bio-body">
            <p>
              <strong>I'm a visual communication designer and artist</strong> from Dehradun, in the
              foothills of Uttarakhand. I care about the process of making, and about taste. Design
              and art are both how I make sense of things, and functionally I'm always trying to fold
              the two into each other, to let the feeling of a piece live inside work that still has
              to do its job. Designing for a wide audience is the kind of problem I love being handed.
            </p>
            <p>
              Find me on{" "}
              <a href="https://www.instagram.com/lacuna.3/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>,{" "}
              <a href="https://www.behance.net/shreyshthapliy" target="_blank" rel="noopener noreferrer">Behance ↗</a> and{" "}
              <a href="https://www.linkedin.com/in/shreyshi-thapliyal-34b490240/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>, or{" "}
              <a href="mailto:shreyshithapliyal.st@gmail.com">email me</a>.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: widget rail ── */}
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* clock + spotify */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
          <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", borderRight: "1px solid var(--border)" }}>
            <span style={label}>dehradun</span>
            <span style={{ fontFamily: "var(--font-data)", fontSize: "clamp(30px, 3.8vw, 46px)", fontWeight: 400, color: "var(--text-display)", letterSpacing: "-.01em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
              {time}
            </span>
            <span style={{ fontFamily: "var(--font-data)", fontSize: "11px", letterSpacing: ".06em", color: "var(--text-disabled)", textTransform: "uppercase" }}>
              uttarakhand, in
            </span>
          </div>

          {/* spotify */}
          <div style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px", padding: "0 24px" }}>
            {hasTrack && np.albumArt && (
              <div style={{ position: "absolute", inset: "-50%", backgroundImage: `url(${np.albumArt})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(50px) saturate(1.4)", opacity: np.isPlaying ? 0.32 : 0.12, zIndex: 0 }} />
            )}
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
              {hasTrack && np.albumArt && (
                <img src={np.albumArt} alt="" style={{ width: 46, height: 46, objectFit: "cover", flexShrink: 0, opacity: np.isPlaying ? 1 : 0.55 }} />
              )}
              <div style={{ minWidth: 0 }}>
                <span style={label}>{np.isPlaying ? "now playing" : "last played"}</span>
                {hasTrack ? (
                  <a href={np.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 4 }}>
                    <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: "14px", fontWeight: 400, color: "var(--text-display)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {np.title}
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font-data)", fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {np.artist}
                    </span>
                  </a>
                ) : (
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 300, color: "var(--text-disabled)", margin: "4px 0 0" }}>not listening right now</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* currently */}
        <div style={section()}>
          <span style={label}>currently</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
            {["designing for a wide audience", "branding · design systems", "always making"].map((item) => (
              <span key={item} style={{ fontFamily: "var(--font-ui)", fontSize: "15px", fontWeight: 300, color: "var(--text-primary)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ethos quote + LACUNA cta */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
          <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px", borderRight: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "15px", fontStyle: "italic", fontWeight: 300, color: "var(--text-primary)", margin: 0, lineHeight: 1.5 }}>
              "{profile.tagline}"
            </p>
          </div>
          <Link to="/lacuna" className="lacuna-cta">
            <span style={label}>the gallery</span>
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(30px, 3.6vw, 46px)", color: "var(--gold)", lineHeight: 1 }}>
              lacuna
            </span>
            <span className="lacuna-cta-btn">enter the journal →</span>
          </Link>
        </div>

        {/* selected work */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", borderBottom: "1px solid var(--border)" }}>
          <div style={{ padding: "0 24px", display: "flex", alignItems: "center", height: "34px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            <span style={label}>selected work</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {work.map((w) => {
              const ext = w.url.startsWith("http");
              return (
                <a
                  key={w.title}
                  href={w.url}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="project-row"
                  style={{ flex: 1, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", cursor: "pointer" }}
                >
                  <span className="project-name" style={{ fontFamily: "var(--font-ui)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", letterSpacing: "-.01em", transition: "color .15s" }}>
                    {w.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-data)", fontSize: "11px", letterSpacing: ".03em", textTransform: "uppercase", color: "var(--text-disabled)", textAlign: "right" }}>
                    {w.kind} {ext ? "↗" : ""}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div style={{ flexShrink: 0, minHeight: "46px", padding: "8px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => setBioOpen(true)} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
              {profile.name}
            </button>
            <button onClick={onToggleTheme} className="foot-link" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", fontFamily: "var(--font-data)", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-disabled)" }}>
              {theme === "light" ? "dark" : "light"}
            </button>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {links.map((l) => (
              <a key={l.name} href={l.url} target={l.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="foot-link" style={{ fontFamily: "var(--font-data)", fontSize: "11px", letterSpacing: ".07em", textTransform: "uppercase", color: "var(--text-disabled)" }}>
                {l.name}
              </a>
            ))}
            <Link to="/lacuna" className="foot-link" style={{ fontFamily: "var(--font-data)", fontSize: "11px", letterSpacing: ".07em", textTransform: "uppercase", color: "var(--text-display)", fontWeight: 700 }}>
              lacuna →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
