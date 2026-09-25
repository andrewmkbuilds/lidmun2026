import { useState, useEffect } from "react";
import CornerBrackets from "@/components/CornerBrackets";
import { base44 } from "@/api/base44Client";

export default function DelegateTicker() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = () => {
      base44.entities.Registration.list()
        .then((res) => setCount(Array.isArray(res) ? res.length : 0))
        .catch(() => setCount(0));
    };
    fetchCount();
    const id = setInterval(fetchCount, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="stat-box-elevated text-center relative group">
      <CornerBrackets />
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6)" }} />
        <div className="text-xs font-mono text-white/40 tracking-widest">[ LIVE ]</div>
      </div>
      <div className="stat-number mb-4">{count !== null ? count : "—"}</div>
      <div className="text-white/60 uppercase tracking-widest text-xs font-semibold">DELEGATES REGISTERED SO FAR</div>
      <div className="text-xs font-mono text-white/30 mt-2">[ COUNT.ACTIVE ]</div>
    </div>
  );
}