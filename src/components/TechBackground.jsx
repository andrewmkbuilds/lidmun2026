export default function TechBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Tech elements */}
      <div className="tech-element" style={{ top: "15%", left: "5%", fontSize: "4rem" }}>[ ]</div>
      <div className="tech-element" style={{ top: "35%", right: "10%", fontSize: "3rem" }}>&lt; &gt;</div>
      <div className="tech-element" style={{ top: "65%", left: "15%", fontSize: "5rem" }}>{`{ }`}</div>
      <div className="tech-element" style={{ top: "85%", right: "15%", fontSize: "2rem" }}>0x00</div>

      {/* Data streams */}
      <div className="data-stream" style={{ left: "10%" }} />
      <div className="data-stream" style={{ left: "30%", animationDelay: "1s" }} />
      <div className="data-stream" style={{ left: "50%", animationDelay: "0.5s" }} />
      <div className="data-stream" style={{ left: "70%", animationDelay: "1.5s" }} />
      <div className="data-stream" style={{ left: "90%", animationDelay: "2s" }} />
    </div>
  );
}