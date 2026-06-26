import { useEffect } from "react";

// the about-reveal — tap the name and this opens (like ohm.quest's bio reveal):
// b&w portrait under a pink pixel-flower vine overlay + grain, then her bio + links.
export const BioReveal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="n-bio-overlay" onClick={onClose}>
      <div className="n-bio-panel" onClick={(e) => e.stopPropagation()}>
        <span className="n-bio-close" onClick={onClose} role="button" tabIndex={0}>
          ← close
        </span>

        <div className="n-bio-photo">
          <img className="n-bio-photo-img" src="/shreyshi.png" alt="shreyshi thapliyal" />
          <img className="n-bio-cyber" src="/shreyshi-cyber.png" alt="" aria-hidden="true" />
          <div className="n-bio-grain" />
        </div>

        <h2 className="n-bio-heading">Shreyshi Thapliyal</h2>

        <div className="n-bio-body">
          <p>
            <strong>I'm a visual communication designer and artist</strong> from Dehradun, in the
            foothills of Uttarakhand. I care about the process of making, and about taste. Design and
            art are both how I make sense of things, and functionally I'm always trying to fold the
            two into each other, to let the feeling of a piece live inside work that still has to do
            its job. Designing for a wide audience is the kind of problem I love being handed.
          </p>
          <p>
            Find me on{" "}
            <a href="https://www.instagram.com/lacuna.3/" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            ,{" "}
            <a href="https://www.behance.net/shreyshthapliy" target="_blank" rel="noopener noreferrer">
              Behance ↗
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/shreyshi-thapliyal-34b490240/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            , or <a href="mailto:shreyshithapliyal.st@gmail.com">email me</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
