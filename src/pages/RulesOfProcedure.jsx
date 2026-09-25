import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import DepthBackground from "@/components/DepthBackground";

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

export default function RulesOfProcedure() {
  return (
    <div className="bg-black pt-20">
      <section className="py-24 bg-black relative z-10 overflow-hidden">
        <DepthBackground />
        <div className="tech-element" style={{ top: 40, left: 20, fontSize: "7rem" }}>0x0C</div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / RULES ]" title="RULES OF PROCEDURE" />

            <Reveal delay={100} className="mt-12 mb-8" variant="card">
              <div className="content-card relative group">
                <div className="text-xs font-mono text-white/40 mb-4">[ PROTOCOL OVERVIEW ]</div>
                <p className="text-sm text-white/60 font-mono leading-relaxed">
                  &gt;&gt; The following rules govern all committee sessions at LIDMUN 2026. Delegates are expected to familiarize themselves with these procedures before the conference. Chairs will enforce these rules throughout all sessions to ensure orderly and productive debate.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 space-y-4">
              {RULES.map((r, i) => (
                <Reveal key={r.n} delay={(i % 4) * 50} variant="card">
                  <div className="rule-section relative group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-xs font-mono text-white/40">[ {r.n} ]</div>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
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