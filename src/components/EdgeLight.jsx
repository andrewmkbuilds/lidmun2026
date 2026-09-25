/**
 * EdgeLight — signature thin white traveling edge highlight.
 * Place inside any `relative` container that also has the `group` class.
 *  - On first reveal (ancestor `.is-revealed`): a thin light sweeps across the
 *    top edge once.
 *  - On group hover: a soft perimeter light traces the border.
 * Monochrome, pointer-events none, GPU-friendly.
 */
export default function EdgeLight({ className = "" }) {
  return (
    <div className={`edge-light ${className}`} aria-hidden="true">
      <span className="edge-light-top" />
      <span className="edge-light-perim" />
    </div>
  );
}