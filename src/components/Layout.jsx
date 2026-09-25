import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import CursorReticle from "./CursorReticle";
import CinematicLoader from "./CinematicLoader";
import AmbientCursor from "./AmbientCursor";
import TerminalBackground from "./TerminalBackground";

export default function Layout() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col relative">
      {/* Animated terminal symbol background (canvas, behind content) */}
      <TerminalBackground />
      {/* Mute the terminal canvas so content stays clearly readable */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "rgba(0,0,0,0.4)" }} />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Scanline */}
      <div className="scanline" />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* CRT flicker wrapper */}
      <div className="crt-flicker absolute inset-0 pointer-events-none z-0" />

      {/* Viewport corner brackets */}
      <div className="fixed top-3 left-3 w-5 h-5 border-t border-l border-white/20 pointer-events-none z-[9997]" />
      <div className="fixed top-3 right-3 w-5 h-5 border-t border-r border-white/20 pointer-events-none z-[9997]" />
      <div className="fixed bottom-3 left-3 w-5 h-5 border-b border-l border-white/20 pointer-events-none z-[9997]" />
      <div className="fixed bottom-3 right-3 w-5 h-5 border-b border-r border-white/20 pointer-events-none z-[9997]" />

      {/* Tech metadata - fixed side labels */}
      <div className="fixed top-1/2 left-1 -translate-y-1/2 rotate-180 pointer-events-none z-[9997]" style={{ writingMode: "vertical-rl" }}>
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/15">LIDMUN // SYS.ACTIVE // 2026.10.09</span>
      </div>
      <div className="fixed top-1/2 right-1 -translate-y-1/2 pointer-events-none z-[9997]" style={{ writingMode: "vertical-rl" }}>
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/15">SEC.CHANNEL // ENCRYPTED // 0xFF</span>
      </div>

      <AmbientCursor />
      <CursorReticle />
      <MusicPlayer />
      <CinematicLoader />
      <Header />
      <main className="flex-1 relative z-10"><Outlet /></main>
      <Footer />
    </div>
  );
}