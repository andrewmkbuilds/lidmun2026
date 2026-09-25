import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];

// Parent orchestrates the staggered pop. The pop is armed by the cinematic
// loader's exit event so the buttons deploy visibly as the transmission
// completes (not hidden behind the loader overlay). It plays exactly once.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// 3D pop: rises forward out of the page (translateZ), scales up, de-blurs.
const pop = {
  hidden: { opacity: 0, y: 35, scale: 0.92, z: -20, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    z: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function CtaButtons() {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(
    () => typeof window !== "undefined" && !!window.__lidmunLoaded
  );

  useEffect(() => {
    if (armed) return;
    const handler = () => setArmed(true);
    window.addEventListener("lidmun:loaded", handler);
    // Safety net: always reveal if the loader event never arrives.
    const fallback = setTimeout(() => setArmed(true), 4000);
    return () => {
      window.removeEventListener("lidmun:loaded", handler);
      clearTimeout(fallback);
    };
  }, [armed]);

  const c = reduce ? { hidden: {}, show: {} } : container;
  const p = reduce ? { hidden: {}, show: {} } : pop;

  return (
    <motion.div
      variants={c}
      initial="hidden"
      animate={armed ? "show" : "hidden"}
      style={{ perspective: 800 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <motion.div variants={p}>
        <Link to="/registration" className="btn-primary">&gt;&gt; REGISTER NOW</Link>
      </motion.div>
      <motion.div variants={p}>
        <Link to="/#countdown" className="btn-transparent">&gt;&gt; ACCESS EVENT</Link>
      </motion.div>
      <motion.div variants={p}>
        <Link to="/secretariat" className="btn-transparent">&gt;&gt; VIEW TEAM</Link>
      </motion.div>
    </motion.div>
  );
}