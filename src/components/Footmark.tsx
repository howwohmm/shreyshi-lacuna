// footer mark — a 6-petal daisy that slowly rotates + breathes, with three
// twinkling pixel-sparkles. speeds up on hover (.site-end:hover). lifted from her site.
const SPARKS = [
  { c: "s1", x: 16.5, y: 16.5 },
  { c: "s2", x: 102.5, y: 82.5 },
  { c: "s3", x: 98.5, y: 20.5 },
];

export const Footmark = ({ label }: { label?: string }) => (
  <div className="footmark site-end">
    <svg className="fm-svg" viewBox="0 0 120 104" aria-hidden="true">
      <g className="fm-rot">
        <g className="fm-breathe">
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
      </g>
      <g fill="currentColor">
        {SPARKS.map((s) => (
          <g className={`fm-spark ${s.c}`} key={s.c}>
            <rect x={s.x} y={s.y} width="3" height="3" />
            <rect x={s.x} y={s.y - 4.5} width="3" height="3" />
            <rect x={s.x} y={s.y + 4.5} width="3" height="3" />
            <rect x={s.x - 4.5} y={s.y} width="3" height="3" />
            <rect x={s.x + 4.5} y={s.y} width="3" height="3" />
          </g>
        ))}
      </g>
    </svg>
    {label && <span className="footmark-text">{label}</span>}
  </div>
);
