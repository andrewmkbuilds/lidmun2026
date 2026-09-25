import { useEffect, useRef } from "react";

/**
 * AmbientCursor — very subtle grayscale light that follows the cursor.
 * Desktop only (no touch), disabled for reduced-motion. Sits behind content
 * (z-1) with screen blend so it reads as soft depth, not a glow.
 */
export default function AmbientCursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="ambient-cursor" aria-hidden="true" />;
}