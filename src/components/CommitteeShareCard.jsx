import { useRef, useState } from "react";
import { Share2, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { accentFor, ACCENTS, headChairLabel, coChairLabel, isCrisis } from "@/data/committees";

export default function CommitteeShareCard({ committee }) {
  const cardRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  const accent = accentFor(committee.category, committee.is_flagship);
  const crisis = isCrisis(committee.category);
  const hLabel = headChairLabel(committee.heads);
  const cLabel = coChairLabel(committee.coheads);
  const code = `COMMITTEE_${String(committee.number || "").padStart(2, "0")}`;
  const nameLen = (committee.name || "").length;
  const nameSize = nameLen > 11 ? 76 : nameLen > 8 ? 92 : 108;

  const generateImage = async () => {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        useCORS: true,
        allowTaint: false,
      });
      const link = document.createElement("a");
      link.download = `LIDMUN-${committee.slug || "committee"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const shareUrl = `https://lidmun.base44.app/committees/${committee.slug}`;
  const shareText = `Check out ${committee.name} at LIDMUN 2026 (Oct 9-11)! Apply here: ${shareUrl}`;

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `LIDMUN - ${committee.name}`, text: shareText, url: shareUrl });
      } catch (e) {}
    } else {
      navigator.clipboard?.writeText(shareText);
    }
  };

  const bracket = (pos) => ({
    position: "absolute",
    width: 44,
    height: 44,
    borderColor: accent,
    opacity: 0.55,
    ...pos,
  });

  return (
    <div>
      {/* Off-screen card for html2canvas capture */}
      <div style={{ position: "absolute", left: "-99999px", top: 0, pointerEvents: "none" }}>
        <div
          ref={cardRef}
          style={{
            width: 1080,
            height: 1920,
            background: "#000000",
            padding: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "'Inter', sans-serif",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid background */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }} />

          {/* Accent radial glow */}
          <div style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 900,
            background: `radial-gradient(circle, ${accent}22, transparent 60%)`,
            pointerEvents: "none",
          }} />

          {/* Corner brackets — accent framed */}
          <div style={{ ...bracket({ top: 40, left: 40, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }) }} />
          <div style={{ ...bracket({ top: 40, right: 40, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }) }} />
          <div style={{ ...bracket({ bottom: 40, left: 40, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }) }} />
          <div style={{ ...bracket({ bottom: 40, right: 40, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }) }} />

          {/* Top: Brand */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 56, fontWeight: 900, letterSpacing: 4, color: "#ffffff" }}>
                  LIDMUN
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: "rgba(255,255,255,0.5)", letterSpacing: 4, marginTop: 8, textTransform: "uppercase" }}>
                  Leaders in Diplomacy MUN
                </div>
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: accent, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
                2026
              </div>
            </div>
            <div style={{ height: 2, width: 140, background: accent, marginTop: 28 }} />
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, padding: "8px 20px", border: `1px solid ${accent}`, color: accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                {committee.category}
              </span>
              {committee.is_flagship && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, padding: "8px 20px", border: `1px solid ${ACCENTS.gold}`, color: ACCENTS.gold, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                  ★ Flagship
                </span>
              )}
            </div>
          </div>

          {/* Middle: Committee identity */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: accent, letterSpacing: 6, textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
              {code}
            </div>

            {committee.logo_url && (
              <div style={{
                width: 240,
                height: 240,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 36,
                background: committee.logoInvert ? "#ffffff" : "rgba(255,255,255,0.03)",
                border: committee.logoInvert ? "none" : `2px solid ${accent}55`,
                padding: 40,
                boxSizing: "border-box",
              }}>
                <img
                  src={committee.logo_url}
                  alt={committee.name}
                  crossOrigin="anonymous"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            )}

            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: nameSize, fontWeight: 900, lineHeight: 1, letterSpacing: 2, color: "#ffffff" }}>
              {committee.name}
            </div>

            <div style={{ height: 2, width: 120, background: accent, marginTop: 28, marginBottom: 28 }} />

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, letterSpacing: 1 }}>
              {committee.heads && <div><span style={{ color: "rgba(255,255,255,0.4)" }}>{hLabel}:</span> {committee.heads}</div>}
              {committee.coheads && <div><span style={{ color: "rgba(255,255,255,0.4)" }}>{cLabel}:</span> {committee.coheads}</div>}
            </div>

            {/* Agenda */}
            {crisis ? (
              <div style={{ marginTop: 32, padding: "20px 28px", border: `1px solid ${accent}`, textAlign: "center", width: "100%", boxSizing: "border-box" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, color: accent, fontWeight: 700, letterSpacing: 2 }}>
                  ⚠ AGENDA CLASSIFIED ⚠
                </div>
                {committee.agendaWarning && (
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "rgba(255,255,255,0.5)", letterSpacing: 2, marginTop: 10, textTransform: "uppercase" }}>
                    {committee.agendaWarning}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 32, padding: "22px 28px", borderLeft: `3px solid ${accent}`, background: "rgba(255,255,255,0.03)", textAlign: "left", width: "100%", boxSizing: "border-box" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: accent, letterSpacing: 4, marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>
                  Agenda
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
                  {committee.agendaTitle}
                </div>
              </div>
            )}
          </div>

          {/* Bottom: CTA */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, marginBottom: 28 }} />
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 26, color: "rgba(255,255,255,0.7)", marginBottom: 28, letterSpacing: 2, textAlign: "center" }}>
              LIDMUN 2026 · Oct 9-11 · Academic City, UAE
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "inline-block", padding: "20px 48px", background: "#ffffff", color: "#000000", fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3 }}>
                Apply → lidmun.base44.app
              </div>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: 6, textAlign: "center", marginTop: 24 }}>
              .-.. .. -.. -- ..- -.
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={generateImage} disabled={generating} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
          <Download className="w-3.5 h-3.5" /> {generating ? "GENERATING..." : "DOWNLOAD STORY CARD"}
        </button>
        <button onClick={nativeShare} className="btn-primary inline-flex items-center gap-2">
          <Share2 className="w-3.5 h-3.5" /> SHARE COMMITTEE
        </button>
      </div>
    </div>
  );
}