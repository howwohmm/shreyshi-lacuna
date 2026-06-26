import { useEffect, useState } from "react";
import Lottie from "lottie-react";

// brief intro flourish — a daisy blooms (lottie), then fades to the site.
export const LoadingScreen = () => {
  const [data, setData] = useState<unknown>(null);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    fetch("/bloom.json").then((r) => r.json()).then(setData).catch(() => {});
    const t1 = setTimeout(() => setFading(true), 1300);
    const t2 = setTimeout(() => setGone(true), 1950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        opacity: fading ? 0 : 1,
        transition: "opacity .6s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {data ? (
        <Lottie animationData={data} loop style={{ width: 132, height: 132 }} />
      ) : (
        <div style={{ width: 132, height: 132 }} />
      )}
    </div>
  );
};
