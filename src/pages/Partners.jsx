import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ImageReveal from "@/components/ImageReveal";
import DepthBackground from "@/components/DepthBackground";
import { base44 } from "@/api/base44Client";

const PartnerEntity = base44.entities.Partner;

const FALLBACK = [
  { name: "SODMUN", image_url: "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/76e0a74f0_lidmun_officialmun_workers_dev_sodmun_013ae575.webp" },
  { name: "NGMUN", image_url: "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/523165ac8_lidmun_officialmun_workers_dev_ngmun_d02a4cbc.jpg" },
];

export default function Partners() {
  const [partners, setPartners] = useState([]);
  useEffect(() => { PartnerEntity.list().then(setPartners).catch(() => {}); }, []);
  const items = partners.length > 0 ? partners : FALLBACK;

  return (
    <section className="py-24 bg-black relative z-10 pt-32 overflow-hidden">
      <DepthBackground />
      <div className="tech-element" style={{ top: 0, right: 0, fontSize: "8rem" }}>0x00</div>
      <div className="tech-element" style={{ bottom: 0, left: 0, fontSize: "8rem" }}>0xFF</div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader label="[ INSTITUTIONAL SUPPORT ]" title="OUR PARTNERS" center />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          {items.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} variant="card">
              <div className="stat-box-elevated p-10 flex flex-col items-center justify-center text-center group">
                <div className="w-24 h-24 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition">
                  <ImageReveal src={p.image_url} alt={p.name} className="w-full h-full object-contain p-3 grayscale group-hover:grayscale-0 transition-all duration-500" delay={i * 100} />
                </div>
                <h3 className="font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem" }}>{p.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-20 text-center">
          <p className="text-white/50 mb-6 font-mono text-xs">[ INTERESTED IN PARTNERSHIPS? ]</p>
          <a href="mailto:lidmun.official@gmail.com" className="btn-primary inline-block">&gt;&gt; BECOME A PARTNER</a>
        </Reveal>
      </div>
    </section>
  );
}