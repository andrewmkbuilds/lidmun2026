import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import CornerBrackets from "@/components/CornerBrackets";

const PASSCODE_REGEX = /^[A-Z]{2,4}-[A-Z]{2,6}-\d{3,5}$/;

export default function EChitsLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = localStorage.getItem("lidmun_echits_session");
    if (existing) navigate("/echits/desk", { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const code = passcode.trim().toUpperCase();
    if (!PASSCODE_REGEX.test(code)) {
      setError("Invalid passcode format. Expected: COUNTRY-COMMITTEE-NUMBER (e.g. USA-UNSC-9821)");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const [country, committee, number] = code.split("-");
      const session = { passcode: code, country, committee, number, loginAt: Date.now() };
      localStorage.setItem("lidmun_echits_session", JSON.stringify(session));
      setLoading(false);
      navigate("/echits/desk");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-body">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-grid" />

      {/* Corner labels */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-white/50 tracking-widest hidden sm:block">&lt; SYSTEM: E-CHITS PORTAL &gt;</div>
      <div className="absolute top-10 right-10 font-mono text-[10px] text-white/50 tracking-widest hidden sm:block">.-.. .. -.. -- ..- -.</div>
      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-white/50 tracking-widest hidden sm:block">STATUS: AUTH_REQUIRED</div>
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-white/50 tracking-widest hidden sm:block">[ SECURE GATEWAY ]</div>

      {/* Back link */}
      <div className="w-full max-w-md mb-6 z-10 flex justify-between items-center px-1">
        <a href="/" className="inline-flex items-center gap-1.5 border border-white/30 text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 transition-all duration-300">
          <ArrowLeft className="w-3 h-3" /> Back to Site
        </a>
        <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">.-.. --- --. .. -.</span>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/90 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.08)] backdrop-blur-md relative z-10 overflow-hidden"
      >
        <CornerBrackets />
        {/* Top tech bar */}
        <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-white/50">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="tracking-widest uppercase">Authentication Gateway</span>
          </span>
          <span className="opacity-60">[ PORTAL v2.0 ]</span>
        </div>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 bg-white/5 text-[10px] font-mono text-white/70">
              <span className="text-white font-bold">&gt;&gt;</span>
              <span className="tracking-widest uppercase">Morse Tag:</span>
              <span className="text-white tracking-widest">.-.. --- --. .. -.</span>
            </div>

            <h2 className="text-3xl font-black tracking-wider text-white uppercase font-mono mt-3">
              LIDMUN <span className="text-white/40 font-light">E-CHITS</span>
            </h2>
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
              [ Enter Portfolio Passcode to Access System ]
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex items-center gap-1">
                <span>&gt; Access Passcode</span>
              </label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="e.g. USA-UNSC-9821"
                className="w-full text-center uppercase font-mono tracking-widest bg-black/80 border border-white/30 text-white placeholder-white/20 focus:border-white focus:outline-none transition-all duration-300 text-sm h-12 px-4"
                autoComplete="off"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-white/50 text-white hover:bg-white hover:text-black font-mono font-bold tracking-widest text-[11px] uppercase h-12 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
              ) : (
                <>Enter Desk <span className="opacity-70">&gt;&gt;</span></>
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-red-500/50 bg-red-950/40 text-red-200 font-mono text-[11px] px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Footer */}
          <div className="border-t border-white/10 pt-4 text-center">
            <div className="text-[10px] font-mono text-white/30 flex justify-between items-center">
              <span>LIDMUN DIPLOMACY OPS</span>
              <span className="tracking-widest opacity-60">..--- ----- ..--- -....</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}