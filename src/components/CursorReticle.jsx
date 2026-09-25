import { useState, useEffect, useRef } from "react";

export default function CursorReticle() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        const el = e.target;
        setHovering(
          !!el.closest('a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, [data-cursor="pointer"]')
        );
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-reticle ${hovering ? "hover" : ""}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      >
        <span className="reticle-corner tl" />
        <span className="reticle-corner tr" />
        <span className="reticle-corner bl" />
        <span className="reticle-corner br" />
      </div>
      <div
        className="cursor-reticle-dot"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      />
    </>
  );
}