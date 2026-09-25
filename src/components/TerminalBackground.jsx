import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * TerminalBackground — a fixed, GPU-friendly canvas behind all site content
 * that continuously drifts subtle monochrome terminal symbols, Morse fragments,
 * and short data-stream messages across three depth layers.
 *
 *   Layer 0 (very background): faint, slow, low alpha        — parallax 0.2
 *   Layer 1 (midground):       moderate drift, brighter      — parallax 0.4
 *   Layer 2 (foreground):      sparse, larger, faster        — parallax 0.7
 *
 * Scroll shifts each layer vertically at its own speed (parallax). On desktop,
 * mouse movement shifts layers in the opposite direction (foreground most).
 * Symbol pools bias subtly toward the current section. Respects
 * prefers-reduced-motion (static, no parallax). pointer-events: none, z-0.
 */

const BASE = [">_", ">>", "//", "::", "[]", "{}", "01", "00", "[ ]", "< >", "/ \\", ".-..", "..-", "-..", "--", "-.", "10", "11"];
const LABELS = ["[SYS]", "[SEC]", "[NET]", "[AUTH]", "[DATA]", "[LINK]", "[SYNC]", "[OK]", "[WAIT]", "[READY]", "[ACCESS]", "[VERIFY]"];
const WORDS = ["LIDMUN", "UN", "MUN"];
const STREAMS = [
  "[SYS] 01 10 01 00",
  "[NET] CONNECTING...",
  "[AUTH] VERIFIED",
  "[DATA] 010101",
  "[LIDMUN] ACTIVE",
  "[SYNC] COMPLETE",
  "[SEC] ENCRYPTED",
  "[ACCESS] GRANTED",
];

// Section-aware symbol bias (subtle). Longest matching prefix wins.
const BIAS = {
  "/": ["LIDMUN", "[SYS]", "[READY]", "[SYNC]", ">_"],
  "/about": ["UN", "MUN", "[DATA]", "::", "01"],
  "/committees": ["[NET]", "01", "10", "00", "[]"],
  "/secretariat": ["[AUTH]", "[SEC]", "[DATA]", "{}", ">_"],
  "/rules-of-procedure": ["[SYS]", "[WAIT]", "01", "::", "[]"],
  "/registration": ["[AUTH]", "[ACCESS]", "[VERIFY]", "[OK]", ">_"],
  "/resources": ["[DATA]", "[LINK]", "01", "::"],
  "/faq": ["[SYS]", "[OK]", "?", "::"],
  "/contact": ["[NET]", "[LINK]", "[AUTH]", "::"],
  "/partners": ["[DATA]", "[LINK]", "01", "[]"],
  "/applications/chair": ["[AUTH]", "[WAIT]", "[SYNC]", ">_"],
  "/applications/admin": ["[AUTH]", "[WAIT]", "[READY]", ">_"],
};

function buildPool(path) {
  let match = "";
  for (const key of Object.keys(BIAS)) {
    if (path === key || path.startsWith(key)) {
      if (key.length > match.length) match = key;
    }
  }
  const bias = match ? BIAS[match] : [];
  return [...BASE, ...LABELS, ...WORDS, ...bias, ...bias];
}

export default function TerminalBackground() {
  const canvasRef = useRef(null);
  const poolRef = useRef(BASE);
  const location = useLocation();

  useEffect(() => {
    poolRef.current = buildPool(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let raf = 0, last = performance.now(), running = true, time = 0;
    let scrollY = window.scrollY || 0;
    let mDX = 0, mDY = 0;

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = () => {
      const p = poolRef.current.length ? poolRef.current : BASE;
      return p[(Math.random() * p.length) | 0];
    };

    const LAYERS = [
      { count: 30, sMin: 11, sMax: 15, aMin: 0.05, aMax: 0.10, vMin: 5, vMax: 11, parallax: 0.2, mouse: 0.5 },
      { count: 22, sMin: 10, sMax: 13, aMin: 0.07, aMax: 0.15, vMin: 9, vMax: 20, parallax: 0.4, mouse: 1.0 },
      { count: 11, sMin: 13, sMax: 18, aMin: 0.10, aMax: 0.20, vMin: 16, vMax: 28, parallax: 0.7, mouse: 1.8 },
    ];

    let symbols = [];
    let streams = [];
    let nextStream = 2.5;

    function makeLayer(li) {
      const L = LAYERS[li];
      const count = W < 640 ? Math.max(6, Math.round(L.count * 0.6)) : L.count;
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: rand(0, W || window.innerWidth),
          y: rand(0, H || window.innerHeight),
          vx: rand(-1, 1) * rand(L.vMin, L.vMax) * 0.4,
          vy: rand(0.35, 1) * rand(L.vMin, L.vMax),
          size: rand(L.sMin, L.sMax),
          baseA: rand(L.aMin, L.aMax),
          phase: rand(0, Math.PI * 2),
          pulse: rand(0.12, 0.45),
          text: pick(),
          parallax: L.parallax,
          mouse: L.mouse,
        });
      }
      return arr;
    }

    function rebuild() {
      symbols = [];
      for (let li = 0; li < LAYERS.length; li++) symbols = symbols.concat(makeLayer(li));
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    }

    function spawnStream() {
      const text = STREAMS[(Math.random() * STREAMS.length) | 0];
      const size = rand(10, 13);
      streams.push({
        x: W + 20,
        y: rand(H * 0.12, H * 0.88),
        vx: -rand(38, 70),
        text,
        size,
        alpha: rand(0.05, 0.11),
      });
    }

    function frame(now) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      for (const s of symbols) {
        if (!reduce) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.y > H) { s.y -= H; if (Math.random() < 0.5) s.text = pick(); }
          if (s.y < 0) { s.y += H; if (Math.random() < 0.5) s.text = pick(); }
          if (s.x > W) s.x -= W;
          if (s.x < 0) s.x += W;
          // very rare glitch flicker
          if (Math.random() < 0.0006) s.text = pick();
        }

        const offX = reduce ? 0 : -mDX * s.mouse;
        const offY = reduce ? 0 : -scrollY * s.parallax - mDY * s.mouse;
        const dx = (((s.x + offX) % W) + W) % W;
        const dy = (((s.y + offY) % H) + H) % H;

        const pulse = reduce ? 1 : 0.5 + 0.5 * Math.sin(time * s.pulse + s.phase);
        const alpha = s.baseA * (0.4 + 0.6 * pulse);

        ctx.font = `${s.size}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fillText(s.text, dx, dy);
      }

      if (!reduce) {
        nextStream -= dt;
        if (nextStream <= 0 && streams.length < 3) {
          spawnStream();
          nextStream = rand(3.5, 7.5);
        }
      }
      for (let i = streams.length - 1; i >= 0; i--) {
        const st = streams[i];
        if (!reduce) st.x += st.vx * dt;
        ctx.font = `${st.size}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(255,255,255,${st.alpha})`;
        ctx.fillText(st.text, st.x, st.y);
        if (st.x < -320) streams.splice(i, 1);
      }

      raf = requestAnimationFrame(frame);
    }

    function onScroll() { scrollY = window.scrollY || 0; }
    function onMouse(e) {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      mDX = (e.clientX - cx) / cx;
      mDY = (e.clientY - cy) / cy;
    }
    function onVis() {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduce) window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}