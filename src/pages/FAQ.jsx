import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import CornerBrackets from "@/components/CornerBrackets";
import SectionHeader from "@/components/SectionHeader";
import TiltCard from "@/components/TiltCard";
import DepthBackground from "@/components/DepthBackground";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_SECTIONS = [
  {
    category: "LOGISTICS",
    items: [
      { q: "When and where is LIDMUN 2026?", a: "LIDMUN 2026 takes place from October 9-11, 2026, at Academic City, UAE. The venue is accessible by public transport and parking is available for delegates and faculty advisors." },
      { q: "What is the registration fee?", a: "The delegate registration fee is AED 175 per delegate. This covers all conference sessions, materials, social events, and meals during the three-day conference. Chair applications are free of charge." },
      { q: "How do I register for the conference?", a: "You can register through our online application form on the Registration page. Once your application is reviewed and accepted, you will receive a confirmation email with further instructions." },
      { q: "Can I participate as part of a school delegation?", a: "Yes, we welcome school delegations. Faculty advisors can register multiple delegates at once. We offer group discounts for schools sending 5 or more delegates. Contact us for details." },
      { q: "Is accommodation provided for out-of-town delegates?", a: "LIDMUN does not provide accommodation directly. However, we have partnered with nearby hotels offering discounted rates for delegates. Contact us for recommended accommodations." },
    ],
  },
  {
    category: "DRESS CODE",
    items: [
      { q: "What is the dress code for the conference?", a: "Professional Western business attire is required for all committee sessions. This includes formal suits, dress shirts, ties, and dress shoes. Casual attire is not permitted in committee rooms." },
      { q: "Are cultural or religious dress exceptions allowed?", a: "Yes, special exceptions may be granted for cultural or religious dress with prior approval from the Secretariat. Please contact us before the conference to arrange approval." },
      { q: "What should I wear to the social events?", a: "Social events have a smart casual dress code. You do not need to wear formal business attire to evening social events, but please maintain a neat and presentable appearance." },
      { q: "Do I need to bring anything specific?", a: "Bring a notebook, pens, a laptop or tablet for research, and your conference badge (provided at check-in). All committee materials and background guides are available digitally." },
    ],
  },
  {
    category: "CONFERENCE ATTENDANCE",
    items: [
      { q: "Do I need prior MUN experience to attend?", a: "No, LIDMUN welcomes delegates of all experience levels. We offer beginner-friendly committees and provide training resources. First-time delegates are encouraged to review our Rules of Procedure and training materials before the conference." },
      { q: "Which committee should I choose?", a: "Beginner delegates should consider BEGINNER-level committees like FIFA or UNHRC. Intermediate delegates can try ADVANCED committees such as GA1, GA2, or UNSC. Experienced delegates should consider CRISIS committees like GICC or Formula One." },
      { q: "What if I cannot attend all three days?", a: "Full attendance is expected for all delegates. Missing sessions impacts your committee's proceedings and your own experience. If you have an unavoidable conflict, contact the Secretariat as early as possible." },
      { q: "Are meals included in the registration fee?", a: "Yes, lunch and coffee breaks are provided on all three conference days. If you have dietary restrictions or allergies, please indicate them during registration or contact us in advance." },
      { q: "Can I get a refund if I cannot attend?", a: "Refund requests must be submitted at least 14 days before the conference date. A processing fee may apply. Refunds are not available after this deadline except in exceptional circumstances." },
      { q: "Will I receive a certificate of participation?", a: "Yes, all delegates receive a digital certificate of participation after the conference. Outstanding delegates may receive special awards during the closing ceremony." },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="bg-black pt-20">
      <section className="py-24 bg-black relative z-10 overflow-hidden">
        <DepthBackground />
        <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x0F</div>
        <div className="hero-orb" style={{ width: 300, height: 300, top: "10%", left: "15%", background: "#fff" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="[ SUMMIT RESOURCES / HELP DESK ]" title="FAQ" />

            <Reveal delay={100} className="mt-12 mb-12" variant="card">
              <div className="content-card relative group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6)" }} />
                  <div className="text-xs font-mono text-white/40 tracking-widest">[ HELP DESK ACTIVE ]</div>
                </div>
                <p className="text-sm text-white/60 font-mono leading-relaxed">
                  &gt;&gt; Frequently asked questions about LIDMUN 2026. Can't find what you're looking for? Reach out to the Secretariat team.
                </p>
              </div>
            </Reveal>

            <div className="space-y-12">
              {FAQ_SECTIONS.map((section, si) => (
                <Reveal key={section.category} delay={si * 100}>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-xs font-mono text-white/40 tracking-widest">[ {String(si + 1).padStart(2, "0")} ]</div>
                      <h3 className="text-lg font-bold tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{section.category}</h3>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="content-card relative">
                      <Accordion type="single" collapsible className="px-2">
                        {section.items.map((item, ii) => (
                          <AccordionItem key={ii} value={`item-${si}-${ii}`} className="border-white/10">
                            <AccordionTrigger className="text-left text-sm font-mono text-white/70 hover:text-white py-5 hover:no-underline">
                              <span className="flex items-start gap-3">
                                <span className="text-white/30 text-xs mt-0.5">Q{String(ii + 1).padStart(2, "0")}</span>
                                <span>{item.q}</span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-white/50 font-mono leading-relaxed pl-8 pb-5">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-16" variant="card">
              <TiltCard max={4} className="download-area text-center">
                <CornerBrackets />
                <div className="text-xs font-mono text-white/40 mb-6 tracking-widest">[ STILL NEED HELP? ]</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>CONTACT THE SECRETARIAT</h3>
                <p className="text-sm text-white/50 font-mono leading-relaxed mb-8 max-w-lg mx-auto">
                  Our team is here to help with any questions not covered in this FAQ.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/contact" className="btn-primary">&gt;&gt; CONTACT US</Link>
                  <Link to="/resources" className="btn-transparent">&gt;&gt; VIEW RESOURCES</Link>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}