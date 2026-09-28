/**
 * HomeCardFX — Home-page-only card overlay.
 *  - subtle grayscale shine/light sweep (plays on group hover)
 *  - reduced corner highlight accents (brighten + grow on hover)
 * Scopes: only rendered inside Home page cards. Does not alter existing
 * layout, typography, colors, or animations.
 */
export default function HomeCardFX() {
  return (
    <>
      <span className="home-shine" aria-hidden="true" />
      <span className="home-corner tl" aria-hidden="true" />
      <span className="home-corner tr" aria-hidden="true" />
      <span className="home-corner bl" aria-hidden="true" />
      <span className="home-corner br" aria-hidden="true" />
    </>
  );
}