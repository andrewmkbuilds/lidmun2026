import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import DepthBackground from "@/components/DepthBackground";
import CardBottomLine from "@/components/CardBottomLine";

export default function Contact() {
  return (
    <section className="py-24 bg-black relative z-10 pt-32 overflow-hidden">
      <DepthBackground />
      <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x06</div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="[ GET IN TOUCH ]" title="CONTACT" center />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <Reveal variant="card">
              <a href="mailto:lidmun.official@gmail.com" className="content-card group block h-full text-center relative">
                <div className="text-3xl mb-4">✉️</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">EMAIL</div>
                <div className="text-sm font-mono text-white/80 group-hover:text-white transition">lidmun.official@gmail.com</div>
                <CardBottomLine />
              </a>
            </Reveal>

            <Reveal delay={100} variant="card">
              <a href="https://instagram.com/leadersindiplomacy.mun" target="_blank" rel="noopener noreferrer" className="content-card group block h-full text-center relative">
                <div className="text-3xl mb-4">📷</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">INSTAGRAM</div>
                <div className="text-sm font-mono text-white/80 group-hover:text-white transition">@leadersindiplomacy.mun</div>
                <CardBottomLine />
              </a>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-8" variant="card">
            <div className="content-card relative group">
              <div className="text-xs font-mono text-white/40 mb-6">[ CONFERENCE DETAILS ]</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">DATES</div>
                  <div className="text-sm font-mono text-white/80">9-11 October 2026</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">LOCATION</div>
                  <div className="text-sm font-mono text-white/80">Academic City, UAE</div>
                </div>
              </div>
              <CardBottomLine />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}