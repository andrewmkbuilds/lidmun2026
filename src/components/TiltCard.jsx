import { useRef, useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import EdgeLight from "./EdgeLight";

const TiltContext = createContext({ x: 0, y: 0, active: false });
export const useTilt = () => useContext(TiltContext);

/**
 * TiltLayer — internal parallax. Moves its contents on a separate depth
 * plane so cards feel physically layered (icon > heading > metadata > cta).
 * depth in px (positive = closer to viewer).
 */
export function TiltLayer({ children, depth = 24, className = "", style, ...rest }) {
  const { x, y, active } = useTilt();
  return (
    <div
      className={className}
      style={{
        transform: active ? `translate3d(${x * depth}px, ${y * depth}px, ${Math.abs(depth)}px)` : "translate3d(0,0,0)",
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * TiltCard — premium mouse-tracking 3D surface.
 *  - restrained tilt (default 6deg)
 *  - cursor-following radial light + edge highlight
 *  - subtle elevation/scale on hover
 *  - GPU-friendly, rAF-throttled, smooth reset
 *  - internal parallax via <TiltLayer>
 */
export default function TiltCard({
  children,
  className = "",
  as: Component = "div",
  max = 4,
  scale = 1.01,
  glow = true,
  edge = true,
  ...props
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, nx: 0, ny: 0, op: 0, active: false });

  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setCoarse(window.matchMedia("(hover: none)").matches);
  }, []);

  const effMax = coarse ? Math.min(max, 3) : max;

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setT({
          rx: -(py - 0.5) * 2 * effMax,
          ry: (px - 0.5) * 2 * effMax,
          gx: px * 100,
          gy: py * 100,
          nx: px - 0.5,
          ny: py - 0.5,
          op: 1,
          active: true,
        });
      });
    },
    [effMax]
  );

  const onTouchMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      const rect = el.getBoundingClientRect();
      const px = (touch.clientX - rect.left) / rect.width;
      const py = (touch.clientY - rect.top) / rect.height;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setT({
          rx: -(py - 0.5) * 2 * effMax,
          ry: (px - 0.5) * 2 * effMax,
          gx: px * 100,
          gy: py * 100,
          nx: px - 0.5,
          ny: py - 0.5,
          op: 1,
          active: true,
        });
      });
    },
    [effMax]
  );

  const onLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setT((prev) => ({ ...prev, rx: 0, ry: 0, nx: 0, ny: 0, op: 0, active: false }));
  }, []);

  const ctxValue = useMemo(
    () => ({ x: t.nx, y: t.ny, active: t.active }),
    [t.nx, t.ny, t.active]
  );

  return (
    <div className="tilt-card">
      <TiltContext.Provider value={ctxValue}>
        <Component
          ref={ref}
          className={`tilt-card-inner ${className}`}
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? scale : 1})`,
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onLeave}
          onTouchCancel={onLeave}
          {...props}
        >
          {glow && (
            <div
              className="tilt-glow"
              style={{
                background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.10), transparent 45%)`,
                opacity: t.op,
              }}
            />
          )}
          {edge && (
            <div
              className="tilt-edge"
              style={{
                background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.35), transparent 50%)`,
                opacity: t.op * 0.4,
              }}
            />
          )}
          {!coarse && (
            <>
              {/* specular highlight — small bright spot that tracks the cursor */}
              <div
                className="tilt-spec"
                style={{
                  left: `${t.gx}%`,
                  top: `${t.gy}%`,
                  opacity: t.op * 0.5,
                }}
              />
              {/* diagonal shine sweep on hover */}
              <div
                className="tilt-shine"
                style={{ opacity: t.op * 0.25, transform: `translateX(${(t.nx + 0.5) * 100}%)` }}
              />
            </>
          )}
          {/* signature traveling edge light (reveal sweep + hover perimeter) */}
          <EdgeLight />
          {children}
        </Component>
      </TiltContext.Provider>
    </div>
  );
}