import { useState, useEffect, useRef } from "react";

const REDUCED =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * ImageReveal — cinematic masked image entrance.
 *  - clip-path wipes left→right
 *  - slight scale-down (1.08 → 1)
 *  - a thin light sweep passes across once
 * Plays exactly once when scrolled into view. Does not touch filter/grayscale
 * so existing hover treatments keep working.
 */
export default function ImageReveal({ src, alt, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (REDUCED) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`img-reveal ${revealed ? "img-revealed" : ""}`}
      style={{ "--ir-delay": `${delay}ms` }}
    >
      <img src={src} alt={alt} className={className} loading="lazy" />
      <span className="img-reveal-sweep" />
    </div>
  );
}