import { useEffect, useRef } from "react";

// her signature: a little daisy that trails the cursor, spins over interactive
// targets (flower-hot), shrinks on press (flower-press). hidden on touch devices.
export const CursorFlower = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // no coarse-pointer guard: the flower stays at opacity 0 until the first real
    // mousemove, so touch devices (which never fire one) never show it anyway.
    let raf = 0;
    let x = -100;
    let y = -100;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      el.classList.toggle("flower-hot", !!t?.closest("a, button, [role=button], .n-pill, input"));
    };
    const down = () => el.classList.add("flower-press");
    const up = () => el.classList.remove("flower-press");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-flower" aria-hidden="true" ref={ref} style={{ opacity: 0 }}>
      <div className="cf-inner">
        <svg viewBox="0 0 30 30">
          <g className="cf-default" fill="currentColor">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="15" cy="8" rx="5" ry="7" transform={`rotate(${a} 15 15)`} />
            ))}
            <circle cx="15" cy="15" r="4.2" />
          </g>
          <g className="cf-lacuna" fill="currentColor">
            {[0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57].map((a) => (
              <path key={a} d="M15 15 Q11 7 15 1.5 Q19 7 15 15 Z" transform={`rotate(${a} 15 15)`} />
            ))}
            <circle cx="15" cy="15" r="2.6" />
          </g>
        </svg>
      </div>
    </div>
  );
};
