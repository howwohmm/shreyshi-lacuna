// shown only on small screens (CSS-gated, ≤760px) — this split-layout gallery is
// built for a bigger screen, so on mobile we ask them to open it on desktop instead
// of showing a broken layout. IG link keeps it from being a dead end.
export const DesktopGate = () => (
  <div className="desktop-gate" aria-label="open on desktop">
    <svg className="dg-flower" viewBox="0 0 120 104" aria-hidden="true">
      <g className="mg-rot">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="60"
            cy="30"
            rx="11"
            ry="19"
            transform={`rotate(${a} 60 52)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
          />
        ))}
        <circle cx="60" cy="52" r="5.5" fill="currentColor" />
      </g>
    </svg>
    <p className="dg-name">shreyshi.</p>
    <p className="dg-line">
      this little gallery is made for a bigger screen.
      <br />
      open it on a desktop to see it the way it's meant to be.
    </p>
    <a className="dg-link" href="https://www.instagram.com/lacuna.3/" target="_blank" rel="noopener noreferrer">
      or peek at the art on instagram ↗
    </a>
  </div>
);
