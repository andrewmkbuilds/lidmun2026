import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechBackground from "@/components/TechBackground";
import DepthBackground from "@/components/DepthBackground";
import ImageReveal from "@/components/ImageReveal";
import CountUp from "@/components/CountUp";
import CardBottomLine from "@/components/CardBottomLine";
import CtaButtons from "@/components/CtaButtons";
import { GraduationCap, Globe, Zap } from "lucide-react";

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-start relative pt-28 sm:pt-32 pb-24 overflow-hidden">
      <TechBackground />
      <DepthBackground variant="hero" />

      {/* Animated orbs */}
      <div className="hero-orb" style={{ width: 400, height: 400, top: "10%", left: "15%", background: "#fff" }} />
      <div className="hero-orb" style={{ width: 300, height: 300, bottom: "15%", right: "20%", background: "#fff", animationDelay: "4s" }} />
      <div className="hero-orb" style={{ width: 250, height: 250, top: "40%", right: "35%", background: "#fff", animationDelay: "7s" }} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-10" />

      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-block mb-8">
            <Link to="/registration" className="inline-flex items-center gap-2 px-4 py-2 border bg-white/5 text-xs font-mono tracking-wider transition duration-300" style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = ""; }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.7)" }} />
              [ DELEGATE APPLICATIONS OPEN NOW ]
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-mono text-sm text-white/50 mb-2 tracking-widest">
            •— •—— •—— •• &nbsp; INITIALIZED &nbsp; •• •—— •—— ••
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-xs font-mono text-white/40 mb-10">
            [ SYSTEM STATUS: ACTIVE ]
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }} className="hero-title mb-8 text-gradient hero-glitch">
            LIDMUN
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="morse-code mb-8">
            .-.. .. -.. -- ..- -.
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mb-2">
            <p className="text-lg md:text-2xl mb-1 max-w-3xl mx-auto font-light text-white/80 tracking-[0.2em]" style={{ fontFamily: "'Space Mono', monospace" }}>
              LEADERS IN DIPLOMACY
            </p>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light text-white/80 tracking-[0.2em]" style={{ fontFamily: "'Space Mono', monospace" }}>
              MODEL UNITED NATIONS
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="text-sm font-mono text-white/40 mb-10">
            [ DEPLOYMENT DATE: OCTOBER 2026 ]
          </motion.div>

          <CtaButtons />
        </motion.div>
      </div>

      {/* Scroll indicator — pinned to the bottom of the hero */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 flex justify-center pt-2 animate-bounce-scroll">
            <div className="w-1 h-3 bg-white/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["DIPLOMACY", "LEADERSHIP", "DEBATE", "CRISIS", "RESOLUTION", "DIPLOMACY", "LEADERSHIP", "DEBATE", "CRISIS", "RESOLUTION"];
  return (
    <div className="py-6 border-y border-white/10 overflow-hidden bg-black relative z-10">
      <div className="marquee marquee-mask">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 px-8 text-2xl md:text-3xl font-bold text-white/20" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {item}
            <span className="text-white/10">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const target = new Date("2026-10-09T00:00:00");
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
        m: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { v: time.d, l: "DD", u: "DAYS" },
    { v: time.h, l: "HH", u: "HOURS" },
    { v: time.m, l: "MM", u: "MINUTES" },
    { v: time.s, l: "SS", u: "SECONDS" },
  ];

  return (
    <section id="countdown" className="py-32 bg-black relative z-10 overflow-hidden">
      <DepthBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="[ COUNTDOWN ACTIVE ]" title="EVENT COUNTDOWN" center />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20">
            {blocks.map((b, i) => (
              <Reveal key={b.u} delay={i * 100} variant="card">
                <div className="countdown-box text-center relative group">
                  <div className="text-xs font-mono text-white/40 mb-3">[{b.l}]</div>
                  <div className="countdown-number mb-4">{b.v}</div>
                  <div className="text-white/50 uppercase tracking-widest text-xs font-semibold">{b.u}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500} className="text-center mt-20">
            <p className="text-white/50 uppercase tracking-widest text-xs mb-4 font-mono">[ TARGET DATE ]</p>
            <p className="text-3xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>9-11 OCTOBER 2026</p>
            <p className="text-xs font-mono text-white/40 mt-2">2026.10.09 &gt; 2026.10.11</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: 150, plus: true, l: "EXPECTING DELEGATES", t: "[PARTICIPANTS]" },
    { n: 7, plus: false, l: "COMMITTEES", t: "[SESSIONS]" },
    { n: 3, plus: false, l: "DAYS", t: "[DURATION]" },
  ];
  return (
    <section className="py-32 bg-gradient-to-b from-black via-white/[0.02] to-black relative z-10 overflow-hidden">
      <DepthBackground />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading label="[ CONFERENCE METRICS ]" title="BY THE NUMBERS" center className="mb-16" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={(i + 1) * 100} variant="card">
              <div className="stat-box-elevated text-center relative group">
                <div className="stat-number mb-4">
                  <CountUp end={s.n} keepPlus={s.plus} />
                </div>
                <div className="text-white/60 uppercase tracking-widest text-xs font-semibold">{s.l}</div>
                <div className="text-xs font-mono text-white/30 mt-2">{s.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { Icon: GraduationCap, emoji: "🎓", title: "ELITE TRAINING", desc: "Comprehensive diplomatic training and debate preparation for delegates of all levels.", tech: "[ ]" },
    { Icon: Globe, emoji: "🌍", title: "GLOBAL NETWORK", desc: "Connect with delegates from diverse backgrounds and build lasting international relationships.", tech: "< >" },
    { Icon: Zap, emoji: "⚡", title: "AUTHENTIC DEBATES", desc: "Realistic UN simulations with cutting-edge procedures, crisis management, and protocols.", tech: "{ }" },
  ];
  return (
    <section className="py-32 bg-black relative z-10 overflow-hidden">
      <DepthBackground />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading label="[ CORE FEATURES ]" title="WHY LIDMUN" center className="mb-16" />

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} variant="card">
              <div className="glass-card p-8 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-25 transition flex items-center justify-center">
                  <div className="text-5xl font-mono font-bold">{f.tech}</div>
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                    <f.Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-3xl">{f.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed relative z-10">{f.desc}</p>
                <CardBottomLine />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-white/[0.02] to-black relative z-10" id="about">
      <DepthBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="[ SYSTEM INFORMATION ]" title="ABOUT LIDMUN" />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <Reveal delay={200} variant="card">
              <div className="glass-card p-10 relative h-full group">
                <div className="text-xs font-mono text-white/40 mb-4">[ DIRECTIVE_01 ]</div>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>OUR MISSION</h3>
                <p className="text-white/60 leading-relaxed text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                  LIDMUN provides a transformative platform for young leaders to engage in meaningful diplomatic discourse, develop critical thinking skills, and foster global awareness through world-class Model United Nations conferences.
                </p>
                <CardBottomLine />
              </div>
            </Reveal>

            <Reveal delay={300} variant="card">
              <div className="glass-card p-10 relative h-full group">
                <div className="text-xs font-mono text-white/40 mb-4">[ DIRECTIVE_02 ]</div>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>WHAT WE DO</h3>
                <p className="text-white/60 leading-relaxed text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                  We organize prestigious MUN conferences that authentically simulate UN proceedings, bringing together delegates from diverse backgrounds to debate pressing global issues and develop innovative solutions.
                </p>
                <CardBottomLine />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "SODMUN", image: "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/76e0a74f0_lidmun_officialmun_workers_dev_sodmun_013ae575.webp" },
    { name: "NGMUN", image: "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/523165ac8_lidmun_officialmun_workers_dev_ngmun_d02a4cbc.jpg" },
  ];
  return (
    <section className="py-32 bg-black relative z-10 overflow-hidden">
      <DepthBackground />
      <div className="tech-element" style={{ top: 0, right: 0, fontSize: "8rem" }}>0x00</div>
      <div className="tech-element" style={{ bottom: 0, left: 0, fontSize: "8rem" }}>0xFF</div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading label="[ INSTITUTIONAL SUPPORT ]" title="OUR PARTNERS" center className="mb-20" />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} variant="card">
              <div className="stat-box-elevated p-10 flex flex-col items-center justify-center text-center group">
                <div className="w-24 h-24 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition">
                  <ImageReveal src={p.image} alt={p.name} className="w-full h-full object-contain p-3 grayscale group-hover:grayscale-0 transition-all duration-500" delay={i * 100} />
                </div>
                <h3 className="font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem" }}>{p.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-20 text-center">
          <p className="text-white/50 mb-6 font-mono text-xs">[ INTERESTED IN PARTNERSHIPS? ]</p>
          <a href="mailto:lidmun.official@gmail.com" className="btn-transparent inline-block">&gt;&gt; BECOME A PARTNER</a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Marquee />
      <Countdown />
      <Stats />
      <Features />
      <About />
      <Partners />
    </div>
  );
}