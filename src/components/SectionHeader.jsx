import Reveal from "@/components/Reveal";

/**
 * SectionHeader — cinematic label → heading → line → description sequence.
 * Each element enters with its own variant + staggered delay, exactly once.
 */
export default function SectionHeader({ label, title, subtitle, center }) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <Reveal variant="label">
          <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] mb-4 uppercase">
            {label}
          </div>
        </Reveal>
      )}
      <Reveal variant="heading" delay={120}>
        <h1 className="section-title mb-6">{title}</h1>
      </Reveal>
      <Reveal delay={220}>
        <div className={`gradient-line ${center ? "center" : ""}`} />
      </Reveal>
      {subtitle && (
        <Reveal variant="description" delay={320}>
          <p className="text-sm text-white/50 font-mono mt-6 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}