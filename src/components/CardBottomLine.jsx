/**
 * CardBottomLine — thin architectural accent pinned to the card's bottom edge.
 *  - 1px technical line, spans the card's inner width (tiny inset to clear corners)
 *  - draws in left→right on first reveal (ancestor `.is-revealed`)
 *  - stretches to full + brightens on group hover
 *  - grayscale, pointer-events none; preserves the EdgeLight system
 */
export default function CardBottomLine({ className = "" }) {
  return <div className={`card-bottom-line ${className}`} aria-hidden="true" />;
}