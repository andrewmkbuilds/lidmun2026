import { Link } from "react-router-dom";
import { Mail, Instagram } from "lucide-react";
import Reveal from "@/components/Reveal";
import EdgeLight from "@/components/EdgeLight";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-20 relative z-10 overflow-hidden">
      <Reveal>
        <div className="relative">
          <EdgeLight />
          <div className="container mx-auto px-6">
            <div className="text-center">
              <Reveal variant="label">
                <div className="morse-code mb-3">.-.. .. -.. -- ..- -.</div>
              </Reveal>
              <Reveal variant="heading" delay={120}>
                <div className="text-4xl md:text-5xl font-bold mb-6 tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>LIDMUN</div>
              </Reveal>
              <Reveal variant="description" delay={260}>
                <p className="text-white/50 mb-2 font-mono text-sm tracking-widest">LEADERS IN DIPLOMACY MODEL UNITED NATIONS</p>
              </Reveal>
              <Reveal variant="description" delay={340}>
                <p className="text-white/40 mb-2 font-mono text-xs">9—11 OCTOBER 2026 &nbsp;//&nbsp; ACADEMIC CITY, UAE</p>
              </Reveal>
              <Reveal delay={420}>
                <p className="text-white/40 mb-6 font-mono text-xs">Designed By Andrew M</p>
              </Reveal>

              <Reveal variant="button" delay={500}>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <a href="mailto:lidmun.official@gmail.com" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <Mail className="w-3.5 h-3.5" /> EMAIL
                  </a>
                  <a href="https://instagram.com/leadersindiplomacy.mun" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <Instagram className="w-3.5 h-3.5" /> INSTAGRAM
                  </a>
                  <Link to="/echits/login" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 transition-all">
                    E-CHITS LOGIN
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={620}>
                <p className="text-white/30 text-xs font-mono mt-10">© 2025 LIDMUN // ALL RIGHTS RESERVED</p>
                <div className="text-xs font-mono opacity-30 mt-2">[ END OF TRANSMISSION ]</div>
              </Reveal>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}