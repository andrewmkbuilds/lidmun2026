import { useState, useEffect, useRef } from "react";
import "./CinematicLoader.css";

const LOGO_URL =
  "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/1b54dbc73_lidmun_officialmun_workers_dev_logo_1570384c.jpg";

const STATUSES = [
  { min: 0, max: 15, text: "INITIALIZING" },
  { min: 15, max: 35, text: "LOADING ASSETS" },
  { min: 35, max: 55, text: "ESTABLISHING CONNECTION" },
  { min: 55, max: 75, text: "SYNCHRONIZING" },
  { min: 75, max: 95, text: "FINALIZING" },
  { min: 95, max: 101, text: "TRANSMISSION READY" },
];

/**
 * CinematicLoader — full-screen LIDMUN transmission boot sequence.
 * Plays once on initial app load (Layout mounts once; persists across routes,
 * so it never replays on client-side navigation). Drives a believable eased
 * progress curve, then performs a cinematic fade/scale exit into the site.
 */
export default function CinematicLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | ready | exiting | done
  const [speed, setSpeed] = useState(0);
  const rafRef = useRef(null);

  // Progress + exit orchestration
  useEffect(() => {
    let cancelled = false;
    const DURATION = 2300;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let start = null;

    const tick = (ts) => {
      if (cancelled) return;
      if (start == null) start = ts;
      const t = Math.min(1, (ts - start) / DURATION);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setPhase("ready");
        setTimeout(() => !cancelled && setPhase("exiting"), 450);
        setTimeout(() => !cancelled && setPhase("done"), 1300);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Harmless technical speed readout
  useEffect(() => {
    if (phase === "done") return;
    const id = setInterval(() => {
      setSpeed(Math.round(260 + Math.random() * 240));
    }, 180);
    return () => clearInterval(id);
  }, [phase]);

  // Signal the hero CTA to deploy as the loader begins its cinematic exit.
  useEffect(() => {
    if (phase !== "exiting") return;
    window.__lidmunLoaded = true;
    window.dispatchEvent(new CustomEvent("lidmun:loaded"));
  }, [phase]);

  if (phase === "done") return null;

  const status =
    STATUSES.find((s) => progress >= s.min && progress < s.max) ||
    STATUSES[STATUSES.length - 1];
  const ready = phase === "ready" || phase === "exiting";

  return (
    <div
      className={`cload-root ${phase === "exiting" ? "cload-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="cload-bg-radial" />
      <div className="cload-bg-grid" />
      <div className="cload-bg-noise" />
      <div className="cload-scan" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="cload-particle"
          style={{
            left: `${8 + i * 16}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        />
      ))}
      <div className="cload-corner tl" />
      <div className="cload-corner tr" />
      <div className="cload-corner bl" />
      <div className="cload-corner br" />

      <div className="cload-content">
        <img
          src={LOGO_URL}
          alt="LIDMUN"
          className="cload-logo"
          draggable={false}
        />
        <h1 className="cload-wordmark">LIDMUN</h1>
        <div className="cload-morse">.-.. .. -.. -- ..- -.</div>

        <div className="cload-bar-wrap">
          <div className="cload-track">
            <div className="cload-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="cload-meta">
            <span className="cload-percent">{progress}%</span>
            <span className="cload-speed">{speed} KB/s</span>
          </div>
        </div>
      </div>

      <div className={`cload-status ${ready ? "cload-status-ready" : ""}`}>
        [ {status.text} ]
      </div>
    </div>
  );
}