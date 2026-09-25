import { useState, useEffect, useRef } from "react";

const REDUCED =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// Variant presets — each defines the initial (pre-entrance) transform/blur
// and a duration. Final state is always: no transform, no blur, opacity 1.
const VARIANTS = {
  default:     { x: 0,   y: 28,  scale: 1,     blur: 6,  rx: 0, rz: 0,  dur: 700 },
  heading:     { x: -64, y: 0,   scale: 1,     blur: 8,  rx: 0, rz: 2,  dur: 900 },
  "heading-r": { x: 64,  y: 0,   scale: 1,     blur: 8,  rx: 0, rz: -2, dur: 900 },
  label:       { x: 0,   y: 14,  scale: 1,     blur: 4,  rx: 0, rz: 0,  dur: 500 },
  description: { x: 0,   y: 22,  scale: 1,     blur: 5,  rx: 0, rz: 0,  dur: 700 },
  card:        { x: 0,   y: 48,  scale: 0.94,  blur: 8,  rx: 5, rz: 0,  dur: 800 },
  image:       { x: 0,   y: 10,  scale: 1.05,  blur: 6,  rx: 0, rz: 0,  dur: 900 },
  button:      { x: 0,   y: 16,  scale: 1,     blur: 0,  rx: 0, rz: 0,  dur: 500 },
  decor:       { x: 0,   y: 0,   scale: 0.9,   blur: 0,  rx: 0, rz: 0,  dur: 1200 },
};

/**
 * Reveal — premium one-time scroll entrance.
 *
 * Plays the entrance animation exactly once when the element first enters the
 * viewport, then remains visible forever (never replays on scroll-back).
 *
 * variant: "default" | "heading" | "heading-r" | "label" | "description" |
 *           "card" | "image" | "button" | "decor"
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y,
  variant = "default",
  once = true,
  threshold = 0.12,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.default;
  const ty = y !== undefined ? y : v.y;

  useEffect(() => {
    if (REDUCED) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const trigger = () => setVisible(true);

    // Already in viewport on mount — animate in on the next frame so the
    // initial (hidden) state paints first.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      const raf = requestAnimationFrame(trigger);
      return () => cancelAnimationFrame(raf);
    }

    if (typeof IntersectionObserver === "undefined") {
      trigger();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const settled = REDUCED || visible;

  const transform = settled
    ? "translate3d(0,0,0) scale(1) rotateX(0deg) rotateZ(0deg)"
    : `translate3d(${v.x}px, ${ty}px, 0) scale(${v.scale}) rotateX(${v.rx}deg) rotateZ(${v.rz}deg)`;
  const filter = settled || v.blur === 0 ? "none" : `blur(${v.blur}px)`;
  const opacity = settled ? 1 : 0;
  const perspective = v.rx !== 0 || v.scale !== 1 ? "1000px" : "none";
  const willChange = settled ? "auto" : "transform, opacity, filter";

  return (
    <div ref={ref} className="w-full flex" style={{ perspective }}>
      <div
        className={`w-full h-full ${className} ${settled ? "is-revealed" : ""}`}
        style={{
          transform,
          filter,
          opacity,
          willChange,
          transition: `transform ${v.dur}ms ${EASE}, opacity ${v.dur}ms ease-out, filter ${v.dur}ms ${EASE}`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}