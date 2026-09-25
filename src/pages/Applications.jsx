import { useParams, Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import DepthBackground from "@/components/DepthBackground";
import CardBottomLine from "@/components/CardBottomLine";

const CONFIG = {
  chair: {
    status: "CHAIR APPS CLOSED",
    title: "CHAIR\nAPPLICATIONS",
    subtitle: "Chair applications have now closed. Thank you to everyone who applied.",
    ctaLink: "/applications/admin",
    ctaText: "VIEW ADMIN APPLICATIONS",
    details: [
      { label: "STATUS", value: "Closed" },
      { label: "DEADLINE", value: "Closed" },
      { label: "COMMITMENT", value: "Full conference duration + preparation sessions" },
      { label: "ROLE", value: "Committee Chair — Facilitate debates, manage procedure, ensure authentic UN simulation" },
    ],
    requirements: [
      { title: "Strong Communication Skills", desc: "Ability to articulate complex ideas and moderate discussions effectively" },
      { title: "Diplomatic Knowledge", desc: "Understanding of international relations, UN procedures, and parliamentary protocol" },
      { title: "Leadership Experience", desc: "Demonstrated ability to guide groups and maintain professional decorum" },
      { title: "Commitment & Availability", desc: "Attendance at all preparation sessions and full conference participation" },
    ],
    timeline: [
      { period: "NOW - FEB 5, 2026", title: "Application Submission Period", desc: "Complete and submit your chair application" },
      { period: "FEB 6-12, 2026", title: "Review & Selection", desc: "Applications reviewed by organizing committee" },
      { period: "FEB 15, 2026", title: "Notifications Sent", desc: "Selected chairs notified via email" },
      { period: "FEB 20, 2026 ONWARDS", title: "Training & Preparation", desc: "Mandatory training sessions begin" },
    ],
    footerText: "[ CHAIR APPLICATIONS CLOSED ]",
  },
  admin: {
    status: "APPLICATIONS COMING SOON",
    title: "ADMIN\nAPPLICATIONS",
    subtitle: "Admin applications will be posted here as soon as the form is ready.",
    isComingSoon: true,
    ctaLink: null,
    ctaText: null,
    footerText: null,
  },
};

export default function Applications() {
  const { type } = useParams();
  const config = CONFIG[type] || CONFIG.chair;

  return (
    <div className="bg-black pt-20">
      {/* Hero */}
      <section className="py-20 bg-black relative z-10 overflow-hidden">
        <DepthBackground variant="hero" />
        <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x04</div>
        <div className="hero-orb" style={{ width: 350, height: 350, top: "5%", right: "15%", background: "#fff" }} />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="status-badge mb-6 inline-flex">
              <span className="status-indicator" />
              {config.status}
            </div>
            <h1 className="section-title mb-6 whitespace-pre-line">{config.title}</h1>
            <div className="gradient-line center" />
            <p className="text-sm text-white/60 font-mono leading-relaxed max-w-xl mx-auto mt-6">
              {config.subtitle}
            </p>
            {config.ctaLink && (
              <div className="mt-8">
                <Link to={config.ctaLink} className="btn-primary inline-flex">
                  <span>&gt;&gt; {config.ctaText}</span>
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Details + Requirements + Timeline (only for chair) */}
      {!config.isComingSoon && (
        <section className="py-16 bg-black relative z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Application Details */}
              <Reveal variant="card">
                <div className="content-card relative group">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <span className="text-2xl">📋</span>
                    <h2 className="text-xl font-mono font-bold">APPLICATION DETAILS</h2>
                  </div>
                  <div>
                    {config.details.map((d) => (
                      <div key={d.label} className="detail-row">
                        <div className="detail-label">&gt; {d.label}</div>
                        <div className="detail-value flex items-center gap-2">
                          {d.label === "STATUS" && <span className="status-indicator" />}
                          {d.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <CardBottomLine />
                </div>
              </Reveal>

              {/* Requirements */}
              <Reveal delay={100} className="mt-16">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl">✓</span>
                  <h2 className="text-xl font-mono font-bold">REQUIREMENTS</h2>
                </div>
                <div className="space-y-3">
                  {config.requirements.map((r, i) => (
                    <Reveal key={r.title} variant="card" delay={i * 80}>
                      <div className="requirement-item relative group">
                        <span className="text-lg">→</span>
                        <div>
                          <div className="font-semibold mb-1 text-sm">{r.title}</div>
                          <div className="text-sm text-white/60 font-mono">{r.desc}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* Timeline */}
              <Reveal delay={200} className="mt-16">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl">⏱️</span>
                  <h2 className="text-xl font-mono font-bold">APPLICATION TIMELINE</h2>
                </div>
                <div>
                  {config.timeline.map((t) => (
                    <div key={t.title} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="font-mono text-sm text-white/50 mb-1">{t.period}</div>
                      <div className="font-semibold text-sm">{t.title}</div>
                      <div className="text-sm text-white/60 font-mono mt-1">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={300} className="mt-16 text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <a href="mailto:lidmun.official@gmail.com" className="inline-flex border border-white/10 px-6 py-3 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    EMAIL US
                  </a>
                  <a href="https://www.instagram.com/leadersindiplomacy.mun" target="_blank" rel="noopener noreferrer" className="inline-flex border border-white/10 px-6 py-3 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    INSTAGRAM
                  </a>
                </div>
                {config.footerText && (
                  <div className="text-xs font-mono text-white/30 mt-8">
                    {config.footerText}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}