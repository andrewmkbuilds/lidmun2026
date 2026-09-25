import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import TeamGallery from "@/components/TeamGallery";
import TiltCard, { TiltLayer } from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import { base44 } from "@/api/base44Client";

const TeamMemberEntity = base44.entities.TeamMember;

const IMG = "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb";

const FALLBACK = [
  { number: "001", name: "Ananya Rawat", role: "Secretary General", school: "GEMS Modern Academy", bio: "geeked.", image_url: `${IMG}/3a8b530a3_ananya.webp` },
  { number: "002", name: "Samarendu Muhury", role: "Secretary General", school: "Dubai College", bio: "Built for ts.", image_url: `${IMG}/494c4ac32_samarendu.webp` },
  { number: "003", name: "Amit Ashok", role: "Deputy Secretary General", school: "Wellington International School", bio: "I don't play the odds, I play the man.", image_url: `${IMG}/5503286af_amit.webp` },
  { number: "004", name: "Kavish Gehani", role: "Under Secretary General", school: "Indian High School Dubai", bio: "In a room full of voices fighting to be heard, leadership is the refusal to let any of them fade.", image_url: `${IMG}/e6856da96_kasish.webp` },
  { number: "005", name: "Amaan Mohtasham", role: "Head of Public Relations", school: "American School of Dubai", bio: "Fortune favours the bold.", image_url: `${IMG}/d1de50af6_amaan.webp` },
  { number: "006", name: "Rudraditya Bisen", role: "Head of Media", school: "Cambridge International School", bio: "YOLO.", image_url: `${IMG}/689f0ed47_rudraditya.webp` },
  { number: "007", name: "Anwesha Sahoo", role: "Media Member", school: "JESS Arabian Ranches", bio: "been a minute.", image_url: `${IMG}/99871678a_anwesha.webp` },
  { number: "008", name: "Tejasvini Yogesh", role: "Media Member", school: "Al Yasmina Academy", bio: "son js leave it blank pls.", image_url: `${IMG}/5d6d3db49_tejaswini.webp` },
  { number: "009", name: "Aehyut Jithesh", role: "Media Member", school: "Raffles World Academy", bio: "meow.", image_url: `${IMG}/9538569d2_achyut.webp` },
  { number: "010", name: "Gopal Patil", role: "Head of Chairs", school: "Nord Anglia International School", bio: "Pressure is a privilege.", image_url: `${IMG}/8b8d43591_gopal.webp` },
  { number: "011", name: "Arshiya Jainee", role: "Co-head of Chairs", school: "Kings Grammar School", bio: "No. 1 yapper.", image_url: `${IMG}/15231abb6_jainee.webp` },
  { number: "012", name: "Kanishka Senthil", role: "Head of Chairs", school: "British International School", bio: "idk, put anything you want.", image_url: `${IMG}/f4f716027_kaniska.webp` },
  { number: "013", name: "Amaar Asif Khan", role: "Crisis Director", school: "Sharjah International School", bio: "I don't follow the script. I write the chaos.", image_url: `${IMG}/38943560a_amaar.webp` },
  { number: "014", name: "Aditya Sai", role: "Web Master", school: "Delhi Private School Dubai", bio: "The only way to do great work is to love what you do.", image_url: `${IMG}/01714d952_adityasai.jpg` },
  { number: "015", name: "Druv Singh Mahay", role: "Head of Delegate Affairs", school: "Al Ittihad Private School", bio: "I'M A MF GABHRU.", image_url: `${IMG}/87cf9af4d_dhruv.jpg` },
  { number: "016", name: "Guney Kaya", role: "Head of Admins", school: "Sunmarke School", bio: "Admins about to perform peak crisis management.", image_url: `${IMG}/777f1459f_guney.jpg` },
  { number: "017", name: "Vedant Satalkar", role: "Head of Admins", school: "Ajman Academy", bio: "Great conferences don't just happen—they're engineered by the admin team.", image_url: `${IMG}/bd57474e6_vedant.jpg` },
  { number: "018", name: "Vidur Kumar", role: "Head of Finance", school: "Ras Al Khaimah Academy", bio: "Managing finance and budget responsibilities.", image_url: `${IMG}/211f8db70_vidur.jpg` },
  { number: "019", name: "Arush Malpute", role: "Head of Finance", school: "Mamzar Beach School", bio: "To be a star you must burn.", image_url: `${IMG}/d3915a01b_arush.jpg` },
  { number: "020", name: "Aditya Goel", role: "Jobless Guy", school: "Dubai English Speaking School", bio: "The more you sweat in practice, the less you bleed in battle.", image_url: `${IMG}/ee095e940_adityagoel.jpg` },
];

export default function Secretariat() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    TeamMemberEntity.list().then(setMembers).catch(() => {});
  }, []);

  const items = members.length > 0 ? members : FALLBACK;

  return (
    <>
      <TeamGallery />
      <section className="py-24 bg-black relative z-10 pt-32 overflow-hidden">
      <div className="tech-element" style={{ top: 40, right: 20, fontSize: "7rem" }}>0x20</div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal variant="label">
            <div className="text-xs font-mono text-white/50 mb-4 tracking-widest">[ PERSONNEL DATABASE ]</div>
          </Reveal>
          <Reveal variant="heading" delay={120}>
            <h1 className="section-title mb-6">SECRETARIAT</h1>
          </Reveal>
          <Reveal delay={220}>
            <div className="gradient-line center" />
          </Reveal>
          <Reveal variant="description" delay={320}>
            <p className="text-sm text-white/50 max-w-3xl mx-auto font-mono mt-6">
              &gt;&gt; THE DEDICATED TEAM BEHIND LIDMUN, COMMITTED TO CREATING AN EXCEPTIONAL MODEL UN EXPERIENCE
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map((m, i) => (
            <Reveal key={`${m.number}-${m.name}`} delay={(i % 3) * 80} className="h-full" variant="card">
              <TiltCard max={6} className="team-card-premium group h-full flex flex-col">
                <div className="team-number-watermark">[{m.number}]</div>
                <TiltLayer depth={18} className="team-img-wrap aspect-[4/5] bg-white/[0.02]">
                  {m.image_url ? (
                    <ImageReveal src={m.image_url} alt={m.name} className="team-img w-full h-full object-cover" delay={(i % 3) * 80} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl font-bold text-white/5" style={{ fontFamily: "'Orbitron', sans-serif" }}>{m.number}</span>
                    </div>
                  )}
                  <div className="team-role-overlay">
                    <span className="position-badge">{m.role}</span>
                  </div>
                </TiltLayer>
                <div className="p-6 relative z-10 flex-1 flex flex-col">
                  <TiltLayer depth={26} className="mb-2">
                    <h3 className="text-xl font-bold tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{m.name}</h3>
                  </TiltLayer>
                  <p className="text-xs text-white/50 font-mono leading-relaxed mb-2">{m.role}</p>
                  <div className="h-px w-8 bg-white/20 group-hover:w-full group-hover:bg-white/40 transition-all duration-500 mb-3" />
                  <p className="text-sm text-white/60 font-mono italic leading-relaxed">"{m.bio}"</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}