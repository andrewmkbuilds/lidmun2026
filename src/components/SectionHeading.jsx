import Reveal from "@/components/Reveal";

/**
 * SectionHeading — inline (h2) section header with the same cinematic
 * label → heading → line sequence. Used by Home's inline section blocks.
 */
export default function SectionHeading({ label, title, center, className = "" }) {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {label && (
        <Reveal variant="label">
          <div className="text-xs font-mono text-white/50 mb-4 tracking-widest">
            {label}
          </div>
        </Reveal>
      )}
      <Reveal variant="heading" delay={120}>
        <h2 className="section-title mb-6">{title}</h2>
      </Reveal>
      <Reveal delay={220}>
        <div className={`gradient-line ${center ? "center" : ""}`} />
      </Reveal>
    </div>
  );
}