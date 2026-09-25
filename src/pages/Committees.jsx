import { Link } from "react-router-dom";
import { Info, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import TiltCard, { TiltLayer } from "@/components/TiltCard";
import CardBottomLine from "@/components/CardBottomLine";
import { COMMITTEES, dirHeadLabel, dirCoLabel, accentFor, ACCENTS } from "@/data/committees";

export default function Committees() {
  const items = COMMITTEES;

  return (
    <div className="bg-black pt-20">
      {/* Committees Section */}
      <section id="committees" className="py-24 bg-black relative z-10 overflow-hidden">
        <div className="tech-element" style={{ top: 60, left: 10, fontSize: "7rem" }}>0x0A</div>

        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / COMMITTEES ]" title="COMMITTEES" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {items.map((c, i) => {
                const accent = accentFor(c.category, c.is_flagship);
                return (
                <Reveal key={c.slug} delay={(i % 3) * 80} variant="card">
                  <TiltCard as={Link} to={`/committees/${c.slug}`} max={6} className={`committee-card-premium group flex flex-col ${c.is_flagship ? "flagship" : ""}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
                    {c.is_flagship && (
                      <div className="flagship-badge flex items-center gap-1" style={{ color: ACCENTS.flagship }}>
                        <Star className="w-2.5 h-2.5" /> FLAGSHIP <Star className="w-2.5 h-2.5" />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className="committee-type-badge" style={{ borderColor: accent, color: accent }}>{c.category}</div>
                      <div className="committee-tag" style={{ marginBottom: 0, color: accent }}>_{String(c.number || i + 1).padStart(2, "0")}</div>
                    </div>
                    {c.logo_url ? (
                      <TiltLayer depth={32} className="mb-4 flex justify-center">
                        <img
                          src={c.logo_url}
                          alt={c.name}
                          className="h-20 w-20 object-contain opacity-90 group-hover:opacity-100 transition"
                          style={{ filter: c.logoInvert ? "invert(1)" : "none" }}
                        />
                      </TiltLayer>
                    ) : (
                      <div className="mb-4 flex justify-center">
                        <div className="h-20 w-20 border border-white/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white/20" style={{ fontFamily: "'Orbitron', sans-serif" }}>{c.number}</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-4 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{c.name}</h3>
                    <div className="mb-4 space-y-1">
                      <div className="text-xs font-mono text-white/50"><span className="text-white/30">{dirHeadLabel(c.heads)}:</span> {c.heads}</div>
                      {c.coheads && <div className="text-xs font-mono text-white/50"><span className="text-white/30">{dirCoLabel(c.coheads)}:</span> {c.coheads}</div>}
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed font-mono mb-6 line-clamp-3">{c.description}</p>
                    <div className="committee-arrow mt-auto text-xs font-mono tracking-wider uppercase flex items-center gap-1" style={{ color: accent }}>
                      LEARN MORE <Info className="w-3 h-3" />
                    </div>
                  </TiltCard>
                </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 bg-black relative z-10 overflow-hidden">
        <div className="tech-element" style={{ bottom: 40, right: 20, fontSize: "7rem" }}>0x0B</div>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / SCHEDULE ]" title="SCHEDULE & TIMELINE" />

            <Reveal delay={120} className="mt-16">
              <div className="content-card relative group text-center">
                <div className="text-xs font-mono text-white/40 mb-4 tracking-widest">[ DETAILS INCOMING ]</div>
                <h3 className="text-xl font-bold mb-4 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>SCHEDULE CONTENT IS BEING PREPARED</h3>
                <p className="text-sm text-white/55 font-mono leading-relaxed max-w-2xl mx-auto mb-4">
                  The full schedule is currently being prepared by the secretariat team. Please check back soon for a complete timeline, session plan, and committee schedule.
                </p>
                <p className="text-xs text-white/40 font-mono leading-relaxed max-w-2xl mx-auto">
                  This section will include day-by-day timings, committee sessions, opening ceremony details, workshop slots, and closing procedures.
                </p>
                <CardBottomLine />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}