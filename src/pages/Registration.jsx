import { useEffect } from "react";
import Reveal from "@/components/Reveal";
import CornerBrackets from "@/components/CornerBrackets";
import TiltCard from "@/components/TiltCard";
import DepthBackground from "@/components/DepthBackground";
import { base44 } from "@/api/base44Client";

export default function Registration() {
  useEffect(() => {
    base44.analytics.track({ eventName: "registration_page_viewed" });
  }, []);

  const handleSubmit = () => {
    base44.analytics.track({ eventName: "registration_submitted" });
  };

  return (
    <section className="py-24 bg-black relative z-10 pt-32 overflow-hidden">
      <DepthBackground variant="hero" />
      <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x03</div>
      <div className="hero-orb" style={{ width: 350, height: 350, top: "10%", left: "20%", background: "#fff" }} />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          {/* Status Badge */}
          <div className="status-badge mb-8 inline-flex">
            <span className="status-indicator" />
            DELEGATE REGISTRATION OPEN
          </div>

          {/* Title */}
          <h1 className="section-title mb-8">APPLY NOW</h1>
          <div className="gradient-line center" />

          {/* Subtitle */}
          <p className="text-sm text-white/60 font-mono leading-relaxed mb-10 max-w-xl mx-auto mt-6">
            Delegate applications for the Leaders In Diplomacy Model United Nations (LIDMUN) 2026 conference are now officially open. Join aspiring diplomats and leaders from around the world in this premium conference.
          </p>

          {/* CTA Card */}
          <TiltCard max={4} className="download-area mb-12">
            <CornerBrackets />
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>DELEGATE APPLICATION</h3>
            <p className="text-xs text-white/50 font-mono mb-6 max-w-md mx-auto">
              Submit your application through our official form to secure your spot at LIDMUN 2026.
            </p>
            <a href="https://forms.gle/shr5QsxqC8j2qQ4B8" target="_blank" rel="noopener noreferrer" onClick={handleSubmit} className="btn-primary inline-flex">
              &gt;&gt; SUBMIT DELEGATE APPLICATION
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("I just applied for LIDMUN 2026 (Oct 9-11, Academic City UAE)! Join me: https://lidmun.officialmun.workers.dev/registration")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-transparent inline-flex mt-4"
            >
              &gt;&gt; SHARE WITH A FRIEND
            </a>
          </TiltCard>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://www.instagram.com/leadersindiplomacy.mun" target="_blank" rel="noopener noreferrer" className="inline-flex border border-white/10 px-6 py-3 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              &gt; INSTAGRAM
            </a>
            <a href="mailto:lidmun.official@gmail.com" className="inline-flex border border-white/10 px-6 py-3 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              &gt; EMAIL
            </a>
          </div>

          <div className="text-xs font-mono text-white/40">
            [ SYSTEM ACTIVE // LIDMUN 2026 ]
          </div>
        </Reveal>
      </div>
    </section>
  );
}