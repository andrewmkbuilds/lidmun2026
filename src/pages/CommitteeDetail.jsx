import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import CornerBrackets from "@/components/CornerBrackets";
import TiltCard from "@/components/TiltCard";
import DepthBackground from "@/components/DepthBackground";
import CardBottomLine from "@/components/CardBottomLine";
import { COMMITTEE_MAP, categoryLabel, isCrisis, headChairLabel, coChairLabel, accentFor, ACCENTS } from "@/data/committees";
import { base44 } from "@/api/base44Client";

const CommitteeEntity = base44.entities.Committee;

export default function CommitteeDetail() {
  const { slug } = useParams();
  const [committee, setCommittee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = COMMITTEE_MAP[slug];
    if (!base) {
      setCommittee(null);
      setLoading(false);
      return;
    }
    CommitteeEntity.filter({ slug })
      .then((res) => {
        const dbRec = res && res[0];
        setCommittee({ ...base, guide_url: (dbRec && dbRec.guide_url) || base.guide_url || null, topic: base.category === "CRISIS" ? null : base.agendaTitle });
      })
      .catch(() => setCommittee({ ...base, topic: base.category === "CRISIS" ? null : base.agendaTitle }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-20">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!committee) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black pt-20 px-6 text-center">
        <div className="text-xs font-mono text-white/40 mb-4 tracking-widest">[ 404 ]</div>
        <h1 className="section-title mb-4">COMMITTEE NOT FOUND</h1>
        <Link to="/committees" className="btn-transparent">&gt;&gt; BACK TO COMMITTEES</Link>
      </div>
    );
  }

  const crisis = isCrisis(committee.category);
  const catLabel = categoryLabel(committee.category);
  const overviewLabel = crisis ? "COMMITTEE OVERVIEW" : "WHAT TO EXPECT";
  const agendaLabel = crisis ? "CLASSIFIED AGENDA" : "COMMITTEE AGENDA";
  const hLabel = headChairLabel(committee.heads);
  const cLabel = coChairLabel(committee.coheads);
  const accent = accentFor(committee.category, committee.is_flagship);

  return (
    <div className="bg-black pt-20">
      {/* Hero */}
      <section className="detail-hero">
        <DepthBackground variant="hero" />
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="hero-orb" style={{ width: 400, height: 400, top: "-10%", right: "10%", background: "#fff" }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <Link to="/committees" className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white tracking-wider uppercase mb-10 hover-line transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> BACK TO COMMITTEES
            </Link>

            {committee.logo_url && (
              <div className="flex justify-center mb-8">
                <img
                  src={committee.logo_url}
                  alt={committee.name}
                  className="h-28 w-28 object-contain"
                  style={{ filter: committee.logoInvert ? "invert(1)" : "none" }}
                />
              </div>
            )}

            {committee.is_flagship && (
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono tracking-[0.2em] uppercase border" style={{ borderColor: ACCENTS.flagship, color: ACCENTS.flagship }}>
                  <Star className="w-3 h-3" /> FLAGSHIP COMMITTEE <Star className="w-3 h-3" />
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>{catLabel}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>{committee.name}</h1>
            <div className="gradient-line center" />
            <p className="text-sm md:text-base text-white/60 font-mono leading-relaxed max-w-2xl mx-auto mt-8 text-center">{committee.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Leadership + Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Reveal variant="card">
              <div className="content-card relative group h-full">
                <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ LEADERSHIP ]</div>
                <div className="detail-row">
                  <div className="detail-label">&gt; {hLabel}</div>
                  <div className="detail-value">{committee.heads}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">&gt; {cLabel}</div>
                  <div className="detail-value">{committee.coheads || "—"}</div>
                </div>
                <CardBottomLine />
              </div>
            </Reveal>

            <Reveal delay={100} variant="card">
              <div className="content-card relative group h-full">
                <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ SPECIFICATIONS ]</div>
                <div className="detail-row">
                  <div className="detail-label">&gt; COMMITTEE TYPE</div>
                  <div className="detail-value">{committee.committeeType}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">&gt; DIFFICULTY</div>
                  <div className="detail-value">{committee.difficulty}</div>
                </div>
                {committee.clearance && (
                  <div className="detail-row">
                    <div className="detail-label">&gt; CLEARANCE</div>
                    <div className="detail-value">{committee.clearance}</div>
                  </div>
                )}
                <CardBottomLine />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Agenda — featured panel (architectural corner framing) */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto" variant="card">
            <div className="content-card relative group">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
              <CornerBrackets />
              <div className="text-xs font-mono mb-6 tracking-widest" style={{ color: accent }}>[ {agendaLabel} ]</div>
              {crisis ? (
                <div className="text-center mb-6">
                  <div className="text-lg md:text-xl font-bold tracking-wide mb-3" style={{ fontFamily: "'Orbitron', sans-serif", color: accent }}>{committee.agendaTitle}</div>
                  {committee.agendaWarning && (
                    <div className="text-xs font-mono text-white/50 tracking-[0.15em] uppercase">{committee.agendaWarning}</div>
                  )}
                </div>
              ) : (
                <h3 className="text-lg md:text-xl font-bold mb-4 leading-snug" style={{ fontFamily: "'Orbitron', sans-serif", color: accent }}>{committee.agendaTitle}</h3>
              )}
              <p className="text-sm text-white/60 font-mono leading-relaxed">{committee.agendaBody}</p>
              <CardBottomLine />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview / What to expect */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto" variant="card">
            <div className="content-card relative group">
              <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ {overviewLabel} ]</div>
              <div className="space-y-5">
                {committee.overview && committee.overview.map((p, i) => (
                  <p key={i} className="text-sm text-white/60 font-mono leading-relaxed">{p}</p>
                ))}
              </div>
              {committee.overviewNote && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/70 font-mono leading-relaxed">{committee.overviewNote}</p>
                </div>
              )}
              <CardBottomLine />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Flagship features — GICC only */}
      {committee.flagshipFeatures && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <Reveal className="max-w-4xl mx-auto" variant="card">
              <div className="content-card relative group">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: ACCENTS.flagship }} />
                <CornerBrackets />
                <div className="text-xs font-mono mb-6 tracking-widest" style={{ color: ACCENTS.flagship }}>[ FLAGSHIP FEATURES ]</div>
                <div className="space-y-4">
                  {committee.flagshipFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-white/8 last:border-0 last:pb-0">
                      <Star className="w-4 h-4 mt-1 shrink-0" style={{ color: ACCENTS.flagship }} />
                      <div>
                        <div className="text-sm font-bold mb-1 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{f.title}</div>
                        <div className="text-sm text-white/55 font-mono leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <CardBottomLine />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Research Guide Download — featured CTA */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto" variant="card">
            <TiltCard max={4} className="download-area text-center">
              <CornerBrackets />
              <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ RESEARCH GUIDE / BACKGROUND DOCUMENT ]</div>

              <div className="relative inline-flex mb-6">
                <div className="download-icon-wrap relative z-10">
                  <Download className="w-7 h-7 text-white/70" />
                </div>
                {committee.guide_url && <div className="download-pulse" />}
              </div>

              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>BACKGROUND GUIDE</h3>
              <p className="text-sm text-white/50 font-mono leading-relaxed mb-8 max-w-lg mx-auto">
                {committee.guide_url
                  ? "Download the comprehensive research guide for this committee. Contains topic briefs, rules of procedure, and preparation materials for delegates."
                  : "The research guide for this committee is being prepared by the secretariat. Check back soon for the full background document."}
              </p>

              {committee.guide_url ? (
                <a href={committee.guide_url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
                  <Download className="w-3.5 h-3.5" /> DOWNLOAD GUIDE
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-xs font-mono tracking-widest uppercase text-white/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
                  COMING SOON
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div>
                  <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">FORMAT</div>
                  <div className="text-xs font-mono text-white/60">PDF</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">STATUS</div>
                  <div className="text-xs font-mono text-white/60">{committee.guide_url ? "READY" : "PENDING"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">ACCESS</div>
                  <div className="text-xs font-mono text-white/60">FREE</div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Reveal>
            <Link to="/registration" className="btn-primary inline-flex items-center gap-2">
              &gt;&gt; REGISTER AS DELEGATE <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}