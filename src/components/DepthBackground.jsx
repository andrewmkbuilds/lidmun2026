import { useMemo } from "react";

/**
 * DepthBackground — subtle monochrome depth layer for sections.
 *  - perspective grid floor
 *  - slow drifting ambient grayscale light
 *  - sparse, slow, low-opacity floating particles
 *  - parallax-friendly (pointer-events none, CSS transforms only)
 */
export default function DepthBackground({ variant = "default" }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 6,
        dur: 8 + Math.random() * 8,
        op: 0.15 + Math.random() * 0.25,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Perspective grid floor */}
      <div className="perspective-grid" />

      {/* Ambient drifting light */}
      <div
        className="ambient-light"
        style={
          variant === "hero"
            ? { width: 700, height: 700, top: "20%", left: "30%" }
            : { width: 500, height: 500, top: "10%", left: "20%" }
        }
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="depth-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.op,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}

      {/* Depth vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,0.5) 100%)" }}
      />
    </div>
  );
}