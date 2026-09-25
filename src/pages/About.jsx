import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import CornerBrackets from "@/components/CornerBrackets";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import DepthBackground from "@/components/DepthBackground";
import CountUp from "@/components/CountUp";
import CardBottomLine from "@/components/CardBottomLine";

const INFO_CARDS = [
  { icon: "📅", label: "Conference Dates", value: "9-11 OCTOBER 2026" },
  { icon: "📍", label: "Location", value: "Academic city, UAE" },
  { icon: "💰", label: "Registration Fee", value: "AED 175 per delegate" },
  { icon: "💰", label: "Registration Fee", value: "AED -- per chair" },
  { icon: "⏰", label: "Duration", value: "3 Days" },
];

const STATS = [
  { n: 0, plus: true, l: "Delegates" },
  { n: 0, plus: true, l: "Schools" },
  { n: 7, plus: false, l: "Committees" },
  { n: 3, plus: false, l: "Days" },
];

const SECTIONS = [
  { tag: "SECTION_01", title: "WELCOME TO LIDMUN 2026", body: "The Leaders In Diplomacy Model United Nations (LIDMUN) is an immersive three-day conference designed to bring together aspiring diplomats, debaters, and global leaders from around the world. Our summit provides a platform for delegates to engage in meaningful discourse on pressing international issues, develop critical thinking skills, and forge lasting connections with like-minded individuals." },
  { tag: "SECTION_02", title: "CONFERENCE OBJECTIVES", body: "LIDMUN aims to foster diplomatic excellence by simulating authentic United Nations proceedings. Delegates will participate in committee sessions, engage in formal debates, draft resolutions, and negotiate with fellow delegates to reach consensus on complex global challenges. Our conference emphasizes skill development in public speaking, research, diplomacy, and collaborative problem-solving." },
  { tag: "SECTION_03", title: "WHAT TO EXPECT", body: "Over the course of three intensive days, delegates will experience opening ceremonies, multiple committee sessions, crisis simulations, social events, and closing ceremonies. Each committee tackles unique topics ranging from international security to sustainable development. Experienced chairs will guide discussions, while seasoned staff ensure smooth operations throughout the conference." },
  { tag: "SECTION_04", title: "WHO SHOULD ATTEND", body: "LIDMUN welcomes delegates of all experience levels, from first-time participants to seasoned MUN veterans. Whether you're a high school student exploring international relations or a university student honing diplomatic skills, our conference offers valuable learning opportunities. We pride ourselves on creating an inclusive environment where every voice matters and every perspective enriches our collective understanding." },
];

const RULES = [
  { n: "RULE_01", title: "GENERAL CONDUCT", body: "All delegates are expected to maintain professional and respectful behavior throughout the conference. Delegates must address the Chair appropriately and follow proper parliamentary procedure at all times. Any form of harassment, discrimination, or inappropriate conduct will result in immediate disciplinary action." },
  { n: "RULE_02", title: "SPEAKERS LIST", body: "The Speakers List is the foundation of formal debate. Delegates may add themselves to the list by raising their placards when invited by the Chair. Speaking time will be allocated by the Chair and delegates must yield their remaining time appropriately:", list: ["Yield to another delegate", "Yield to questions", "Yield to the Chair"] },
  { n: "RULE_03", title: "MOTIONS AND POINTS", body: "Delegates may raise various motions and points during committee sessions. All motions require a second and are subject to Chair approval. Common motions include:", list: ["Motion to Open/Close Debate", "Motion for Moderated Caucus", "Motion for Unmoderated Caucus", "Motion to Table Topic", "Motion to Adjourn Meeting"] },
  { n: "RULE_04", title: "CAUCUSES", body: "Caucuses provide opportunities for informal negotiation and collaboration. Moderated caucuses allow structured discussion on specific topics with designated speaking time. Unmoderated caucuses permit free-form negotiation where delegates may move freely and discuss strategies with other delegations." },
  { n: "RULE_05", title: "WORKING PAPERS AND DRAFT RESOLUTIONS", body: "Working papers are informal documents used to outline potential solutions. Draft resolutions are formal documents that require sponsorship and must adhere to proper formatting:", list: ["Must have minimum number of sponsors as specified by Chair", "Must follow standard UN resolution format", "Must address the agenda topic directly", "Operative clauses must be actionable"] },
  { n: "RULE_06", title: "AMENDMENTS", body: "Delegates may propose amendments to draft resolutions during debate. Friendly amendments are accepted by all sponsors without vote. Unfriendly amendments require approval through voting procedure. All amendments must be submitted in writing to the Chair for approval before introduction." },
  { n: "RULE_07", title: "VOTING PROCEDURE", body: "Voting on substantive matters requires a majority vote. Delegates may vote:", list: ["Yes - In favor of the resolution", "No - Against the resolution", "Abstain - Neither for nor against", "Pass - Defer voting until later (if permitted)"], body2: "During voting procedure, no delegate may interrupt except on points of personal privilege or parliamentary inquiry regarding voting procedure." },
  { n: "RULE_08", title: "DRESS CODE", body: "Professional Western business attire is required for all committee sessions. This includes formal suits, dress shirts, ties, and dress shoes for all delegates. Casual attire is not permitted in committee rooms. Special exceptions may be granted for cultural or religious dress with prior approval from the Secretariat." },
  { n: "RULE_09", title: "ELECTRONIC DEVICES", body: "Laptops and tablets are permitted for research and document preparation. Mobile phones must be silenced during all committee sessions. Delegates may not use devices for non-conference related activities. The Chair reserves the right to restrict device usage if misused." },
  { n: "RULE_10", title: "CHAIR DISCRETION", body: "The Chair maintains ultimate authority over committee proceedings and may exercise discretion in interpreting and enforcing these rules. The Chair's decisions are final unless successfully appealed by a majority vote of the committee. Delegates must respect the Chair's authority and follow all directives promptly." },
  { n: "RULE_11", title: "NOTE PASSING", body: "Delegates may communicate through written notes passed via conference staff. All notes must be reviewed by staff before delivery. Notes containing inappropriate content will not be delivered and may result in disciplinary action. Note passing is suspended during voting procedure and formal presentations." },
  { n: "RULE_12", title: "CONFERENCE MATERIALS", body: "All conference materials including background guides, position papers, and resolutions become property of LIDMUN upon submission. Delegates must cite sources properly and avoid plagiarism. Original research and analysis are strongly encouraged. Materials may be shared with educational institutions for academic purposes." },
];

const TRAINING_URL = "https://base44.app/api/apps/6ab3bd02612032ac3b63c0eb/files/mp/public/6ab3bd02612032ac3b63c0eb/71efc47d3_DelegateTrainingSession.pptx";

export default function About() {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch(TRAINING_URL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Delegate Training Session.pptx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(TRAINING_URL, "_blank");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="bg-black pt-20">
      {/* Summit Overview Section */}
      <section className="py-24 bg-black relative z-10 overflow-hidden">
        <DepthBackground />
        <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x01</div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / OVERVIEW ]" title="SUMMIT OVERVIEW" />

            {/* Theme Banner */}
            <Reveal delay={50} className="mt-12" variant="card">
              <div className="content-card text-center relative group">
                <div className="text-xs font-mono text-white/40 mb-4">[ CONFERENCE THEME 2026 ]</div>
                <div className="text-2xl md:text-3xl italic" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  "Bridging Shadows and Statesmanship"
                </div>
                <CardBottomLine />
              </div>
            </Reveal>

            {/* Info Grid */}
            <Reveal delay={100} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INFO_CARDS.map((c, i) => (
                  <Reveal key={c.label + c.value} delay={i * 60} variant="card">
                    <div className="info-card relative group">
                      <div className="text-2xl mb-2">{c.icon}</div>
                      <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">{c.label}</div>
                      <div className="text-sm font-mono text-white/80">{c.value}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={150} className="mt-8" variant="card">
              <div className="content-card relative group">
                <div className="text-xs font-mono text-white/40 mb-4">[ PARTICIPATION STATISTICS ]</div>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>SUMMIT BY THE NUMBERS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {STATS.map((s) => (
                    <div key={s.l} className="text-center border border-white/10 p-4 hover:border-white/25 transition-colors">
                      <div className="stat-number mb-2" style={{ fontSize: "2rem" }}>
                        {s.n > 0 ? <CountUp end={s.n} keepPlus={s.plus} /> : (s.plus ? "--+" : "--")}
                      </div>
                      <div className="text-xs font-mono text-white/50 uppercase tracking-widest">{s.l}</div>
                    </div>
                  ))}
                </div>
                <CardBottomLine />
              </div>
            </Reveal>

            {/* Content Sections */}
            <div className="mt-12 space-y-6">
              {SECTIONS.map((s, i) => (
                <Reveal key={s.tag} delay={i * 50} variant="card">
                  <div className="content-card relative group">
                    <div className="text-xs font-mono text-white/40 mb-4">[ {s.tag} ]</div>
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
                    <CardBottomLine />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delegate Training Download */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal variant="card">
              <TiltCard max={4} className="download-area text-center">
                <CornerBrackets />
                <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ DELEGATE TRAINING SESSION ]</div>
                <div className="download-icon-wrap mx-auto mb-6 relative z-10">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>DELEGATE TRAINING PRESENTATION</h3>
                <p className="text-sm text-white/50 font-mono leading-relaxed mb-8 max-w-lg mx-auto">
                  Access the full training deck for delegates to prepare for LIDMUN 2026. This file contains all key session details, guidelines, and preparation tips for participants.
                </p>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> PREPARING…</>
                  ) : (
                    <><Download className="w-4 h-4" /> DOWNLOAD TRAINING DECK</>
                  )}
                </button>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-24 bg-black relative z-10 overflow-hidden">
        <DepthBackground />
        <div className="tech-element" style={{ top: 40, left: 20, fontSize: "7rem" }}>0x0C</div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / RULES ]" title="RULES AND PROCEDURE" />

            <div className="mt-12 space-y-4">
              {RULES.map((r, i) => (
                <Reveal key={r.n} delay={(i % 4) * 50} variant="card">
                  <div className="rule-section relative group">
                    <div className="text-xs font-mono text-white/40 mb-4">[ {r.n} ]</div>
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>{r.title}</h3>
                    <p className="text-sm text-white/60 font-mono leading-relaxed">{r.body}</p>
                    {r.list && (
                      <ul className="mt-4 space-y-2">
                        {r.list.map((item) => (
                          <li key={item} className="text-sm text-white/50 font-mono pl-4 border-l border-white/10 hover:border-white/30 hover:text-white/70 transition-colors">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {r.body2 && <p className="text-sm text-white/60 font-mono leading-relaxed mt-4">{r.body2}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}