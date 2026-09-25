import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Send, Inbox, FileText, Clock, ArrowRight, Trash2 } from "lucide-react";
import CornerBrackets from "@/components/CornerBrackets";

export default function EChitsDesk() {
  const [session, setSession] = useState(null);
  const [chits, setChits] = useState([]);
  const [newChit, setNewChit] = useState({ to: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("lidmun_echits_session");
    if (!raw) {
      navigate("/echits/login", { replace: true });
      return;
    }
    setSession(JSON.parse(raw));
    const stored = localStorage.getItem("lidmun_echits_chits");
    if (stored) setChits(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("lidmun_echits_session");
    navigate("/echits/login", { replace: true });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newChit.to || !newChit.subject || !newChit.message) return;
    setSending(true);
    setTimeout(() => {
      const chit = {
        id: Date.now(),
        from: `${session.country} · ${session.committee}`,
        to: newChit.to.toUpperCase(),
        subject: newChit.subject,
        message: newChit.message,
        timestamp: new Date().toISOString(),
        status: "sent",
      };
      const updated = [chit, ...chits];
      setChits(updated);
      localStorage.setItem("lidmun_echits_chits", JSON.stringify(updated));
      setNewChit({ to: "", subject: "", message: "" });
      setSending(false);
    }, 600);
  };

  const handleDelete = (id) => {
    const updated = chits.filter((c) => c.id !== id);
    setChits(updated);
    localStorage.setItem("lidmun_echits_chits", JSON.stringify(updated));
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-body relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">E-Chits Desk</span>
            <span className="text-[10px] font-mono text-white/30">[ PORTAL v2.0 ]</span>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-1.5 border border-white/30 text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 transition-all duration-300">
            <LogOut className="w-3 h-3" /> Logout
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Identity card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="border border-white/20 bg-white/5 backdrop-blur-md p-6 mb-6 relative">
          <CornerBrackets />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-2">[ Delegate Identity ]</div>
              <h1 className="text-2xl font-black font-mono tracking-wider text-white uppercase">{session.country} <span className="text-white/40 font-light">·</span> {session.committee}</h1>
              <p className="text-[11px] font-mono text-white/50 mt-1">Portfolio #{session.number} · Passcode: {session.passcode}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-1">Session Active</div>
              <div className="text-[11px] font-mono text-white/60">{new Date(session.loginAt).toLocaleTimeString()}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compose chit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="border border-white/20 bg-white/5 backdrop-blur-md relative">
            <CornerBrackets />
            <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Compose Chit</span>
            </div>
            <form onSubmit={handleSend} className="p-5 space-y-4">
              <div>
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5 block">&gt; To (Country / Committee)</label>
                <input type="text" value={newChit.to} onChange={(e) => setNewChit({ ...newChit, to: e.target.value })} placeholder="e.g. CHN-UNSC" className="w-full bg-black/80 border border-white/30 text-white placeholder-white/20 font-mono text-sm tracking-widest uppercase px-3 py-2.5 focus:border-white focus:outline-none transition-all" required />
              </div>
              <div>
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5 block">&gt; Subject</label>
                <input type="text" value={newChit.subject} onChange={(e) => setNewChit({ ...newChit, subject: e.target.value })} placeholder="Motion to adjourn..." className="w-full bg-black/80 border border-white/30 text-white placeholder-white/20 font-mono text-sm px-3 py-2.5 focus:border-white focus:outline-none transition-all" required />
              </div>
              <div>
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5 block">&gt; Message</label>
                <textarea value={newChit.message} onChange={(e) => setNewChit({ ...newChit, message: e.target.value })} placeholder="Your diplomatic note..." rows={4} className="w-full bg-black/80 border border-white/30 text-white placeholder-white/20 font-mono text-sm px-3 py-2.5 focus:border-white focus:outline-none transition-all resize-none" required />
              </div>
              <button type="submit" disabled={sending} className="w-full border border-white/50 text-white hover:bg-white hover:text-black font-mono font-bold tracking-widest text-[11px] uppercase py-3 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                {sending ? "Sending..." : <>Send Chit <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </form>
          </motion.div>

          {/* Inbox */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="border border-white/20 bg-white/5 backdrop-blur-md relative">
            <CornerBrackets />
            <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="w-3.5 h-3.5 text-white/50" />
                <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Chit Log</span>
              </div>
              <span className="text-[10px] font-mono text-white/30">{chits.length} sent</span>
            </div>
            <div className="p-5 max-h-[420px] overflow-y-auto">
              {chits.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-8 h-8 text-white/10 mb-3" />
                  <p className="text-[11px] font-mono text-white/30 tracking-widest uppercase">No chits sent yet</p>
                  <p className="text-[10px] font-mono text-white/20 mt-1">Compose your first diplomatic note</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chits.map((chit) => (
                    <div key={chit.id} className="border border-white/10 bg-black/60 p-4 group">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">To:</span>
                            <span className="text-[11px] font-mono text-white tracking-widest uppercase truncate">{chit.to}</span>
                          </div>
                          <h3 className="text-sm font-mono text-white font-bold truncate">{chit.subject}</h3>
                        </div>
                        <button onClick={() => handleDelete(chit.id)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white transition-all shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-white/50 leading-relaxed mb-2">{chit.message}</p>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 tracking-widest uppercase">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(chit.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[10px] font-mono text-white/30 hover:text-white tracking-widest uppercase hover-line transition-colors">
            <ArrowRight className="w-3 h-3 rotate-180" /> Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}