import { Link } from "react-router-dom";
import { Download, FileText, BookOpen, FileCheck, GraduationCap, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import CornerBrackets from "@/components/CornerBrackets";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import DepthBackground from "@/components/DepthBackground";

const RESOURCES = [
  {
    icon: BookOpen,
    tag: "RESOURCE_01",
    title: "BACKGROUND GUIDES",
    desc: "Comprehensive research guides for each committee containing topic briefs, historical context, and preparation materials.",
    status: "AVAILABLE",
    link: "/committees",
    linkLabel: "BROWSE COMMITTEES",
    internal: true,
  },
  {
    icon: FileText,
    tag: "RESOURCE_02",
    title: "POSITION PAPER TEMPLATE",
    desc: "Standard template for delegates to structure their position papers. Includes formatting guidelines and sample content.",
    status: "COMING SOON",
  },
  {
    icon: FileCheck,
    tag: "RESOURCE_03",
    title: "RESOLUTION TEMPLATE",
    desc: "Official UN resolution formatting template with preambulatory and operative clause structures for draft resolutions.",
    status: "COMING SOON",
  },
  {
    icon: GraduationCap,
    tag: "RESOURCE_04",
    title: "DELEGATE TRAINING PRESENTATION",
    desc: "Full training deck covering parliamentary procedure, debate strategy, and preparation tips for first-time delegates.",
    status: "COMING SOON",
  },
  {
    icon: FileText,
    tag: "RESOURCE_05",
    title: "CONFERENCE HANDBOOK",
    desc: "The complete LIDMUN 2026 handbook with schedules, maps, rules, and essential delegate information.",
    status: "COMING SOON",
  },
  {
    icon: Download,
    tag: "RESOURCE_06",
    title: "RULES OF PROCEDURE",
    desc: "Quick reference document summarizing all parliamentary procedures, motions, and voting protocols.",
    status: "AVAILABLE",
    link: "/rules-of-procedure",
    linkLabel: "VIEW RULES",
    internal: true,
  },
];

export default function DelegateResources() {
  return (
    <div className="bg-black pt-20">
      <section className="py-24 bg-black relative z-10 overflow-hidden">
        <DepthBackground />
        <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x0R</div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / DELEGATE PORTAL ]" title="DELEGATE RESOURCES" />

            <Reveal delay={100} className="mt-12 mb-12" variant="card">
              <div className="content-card relative group">
                <div className="text-xs font-mono text-white/40 mb-4">[ RESOURCE DATABASE ]</div>
                <p className="text-sm text-white/60 font-mono leading-relaxed">
                  &gt;&gt; Access official LIDMUN 2026 documentation, research guides, and preparation materials. All resources are free for registered delegates. Download what you need to prepare for your committee sessions.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESOURCES.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Reveal key={r.tag} delay={(i % 3) * 80} variant="card">
                    <div className="content-card relative group h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 border border-white/15 flex items-center justify-center group-hover:border-white/35 transition-colors">
                          <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border ${r.status === "AVAILABLE" ? "border-white/30 text-white/80" : "border-white/10 text-white/30"}`}>
                          {r.status}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-white/30 mb-2">[ {r.tag} ]</div>
                      <h3 className="text-base font-bold mb-3 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{r.title}</h3>
                      <p className="text-sm text-white/50 font-mono leading-relaxed mb-6 flex-1">{r.desc}</p>
                      {r.link ? (
                        <Link to={r.link} className="btn-primary inline-flex items-center gap-2 self-start">
                          {r.linkLabel} <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-mono tracking-widest uppercase text-white/30 self-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
                          COMING SOON
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={200} className="mt-16" variant="card">
              <TiltCard max={4} className="download-area text-center">
                <CornerBrackets />
                <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ NEED HELP PREPARING? ]</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>STILL HAVE QUESTIONS?</h3>
                <p className="text-sm text-white/50 font-mono leading-relaxed mb-8 max-w-lg mx-auto">
                  Check our FAQ page or reach out to the Secretariat team for assistance with your preparation.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/faq" className="btn-primary">&gt;&gt; VIEW FAQ</Link>
                  <Link to="/contact" className="btn-transparent">&gt;&gt; CONTACT US</Link>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}