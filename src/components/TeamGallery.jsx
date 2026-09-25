import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";

const IMG = "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb";

const TEAM = [
  { name: "Ananya Rawat", role: "Secretary General", image_url: `${IMG}/3a8b530a3_ananya.webp` },
  { name: "Samarendu Muhury", role: "Secretary General", image_url: `${IMG}/494c4ac32_samarendu.webp` },
  { name: "Amit Ashok", role: "Deputy Secretary General", image_url: `${IMG}/5503286af_amit.webp` },
  { name: "Kavish Gehani", role: "Under Secretary General", image_url: `${IMG}/e6856da96_kasish.webp` },
  { name: "Amaan Mohtasham", role: "Head of Public Relations", image_url: `${IMG}/d1de50af6_amaan.webp` },
  { name: "Rudraditya Bisen", role: "Head of Media", image_url: `${IMG}/689f0ed47_rudraditya.webp` },
  { name: "Anwesha Sahoo", role: "Media Member", image_url: `${IMG}/99871678a_anwesha.webp` },
  { name: "Tejasvini Yogesh", role: "Media Member", image_url: `${IMG}/5d6d3db49_tejaswini.webp` },
  { name: "Aehyut Jithesh", role: "Media Member", image_url: `${IMG}/9538569d2_achyut.webp` },
  { name: "Gopal Patil", role: "Head of Chairs", image_url: `${IMG}/8b8d43591_gopal.webp` },
  { name: "Arshiya Jainee", role: "Co-head of Chairs", image_url: `${IMG}/15231abb6_jainee.webp` },
  { name: "Kanishka Senthil", role: "Head of Chairs", image_url: `${IMG}/f4f716027_kaniska.webp` },
];

const COLS = 3;
const SPREAD = 0.45;

export default function TeamGallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const lightImgWrapRef = useRef(null);
  const sourceTileRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;
    const tiles = Array.from(grid.querySelectorAll(".sgs-tile"));
    if (!tiles.length) return;

    function layout() {
      const h = window.innerHeight || 800;
      tiles.forEach((tile, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const dir = col % 2 === 0 ? -1 : 1;
        const dy = dir * h * SPREAD * (1 + row * 0.1);
        const dx = (col - (COLS - 1) / 2) * 90;
        tile.style.setProperty("--sgs-dx", dx.toFixed(1) + "px");
        tile.style.setProperty("--sgs-dy", dy.toFixed(1) + "px");
      });
    }

    function progress() {
      const rect = section.getBoundingClientRect();
      const runway = section.offsetHeight - window.innerHeight;
      if (runway <= 0) return 1;
      return Math.max(0, Math.min(1, -rect.top / runway));
    }

    function update() {
      section.style.setProperty("--sgs-p", progress().toFixed(4));
    }

    let rafId = 0;
    let safety = 0;
    function flush() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      if (safety) { clearTimeout(safety); safety = 0; }
      update();
    }
    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { rafId = 0; flush(); });
      safety = setTimeout(flush, 250);
    }
    function onResize() { layout(); update(); }

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const updateTimer = setTimeout(update, 300);

    let arrived = false;
    function arrive() {
      if (arrived) return;
      arrived = true;
      section.classList.add("sgs-seen");
    }
    const arriveFallback = setTimeout(arrive, 1500);
    let enterIO = null;
    if ("IntersectionObserver" in window) {
      enterIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          clearTimeout(arriveFallback);
          arrive();
          enterIO.disconnect();
        });
      }, { threshold: 0.05 });
      enterIO.observe(section);
    } else {
      arrive();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(updateTimer);
      clearTimeout(arriveFallback);
      if (safety) clearTimeout(safety);
      if (rafId) cancelAnimationFrame(rafId);
      if (enterIO) enterIO.disconnect();
    };
  }, []);

  function flipOnto(fromEl, toEl) {
    if (!fromEl || !toEl) return null;
    const from = fromEl.getBoundingClientRect();
    const to = toEl.getBoundingClientRect();
    if (!to.width || !to.height) return null;
    return `translate(${(from.left - to.left).toFixed(1)}px, ${(from.top - to.top).toFixed(1)}px) scale(${(from.width / to.width).toFixed(4)}, ${(from.height / to.height).toFixed(4)})`;
  }

  useEffect(() => {
    if (!lightbox.open) return;
    const container = lightImgWrapRef.current;
    if (!container) return;
    const raf = requestAnimationFrame(() => {
      container.classList.add("sgs-flip-instant");
      container.classList.remove("sgs-flip-run");
      container.style.setProperty("--sgs-flip", "none");
      void container.offsetWidth;
      const start = flipOnto(sourceTileRef.current, container);
      if (start) container.style.setProperty("--sgs-flip", start);
      void container.offsetWidth;
      container.classList.remove("sgs-flip-instant");
      requestAnimationFrame(() => container.classList.add("sgs-flip-run"));
    });
    return () => cancelAnimationFrame(raf);
  }, [lightbox.open]);

  function openLight(tileEl, member) {
    sourceTileRef.current = tileEl;
    setLightbox({ open: true, src: member.image_url, alt: member.name });
  }

  function closeLight() {
    const container = lightImgWrapRef.current;
    if (container && sourceTileRef.current) {
      const back = flipOnto(sourceTileRef.current, container);
      if (back) container.style.setProperty("--sgs-flip", back);
      container.classList.remove("sgs-flip-run");
    }
    setLightbox((prev) => ({ ...prev, open: false }));
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && lightbox.open) closeLight();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  return (
    <section ref={sectionRef} className="sgs-section">
      <div className="sgs-stage">
        <div className="sgs-head">
          <p className="sgs-sub">LIDMUN 2026 — Personnel Database</p>
          <h2 className="sgs-title">The Secretariat</h2>
        </div>

        <div className="sgs-grid" ref={gridRef}>
          {TEAM.map((m) => (
            <button key={m.name} className="sgs-tile" type="button" onClick={(e) => openLight(e.currentTarget, m)}>
              <Image src={m.image_url} fittingType="fill" alt={m.name} className="block w-full h-full" />
            </button>
          ))}
        </div>

        <div className="sgs-foot">
          <span>Scroll to assemble</span>
          <span>12 members</span>
        </div>
      </div>

      <div
        className={`sgs-light ${lightbox.open ? "sgs-light-open" : ""}`}
        tabIndex={-1}
        aria-hidden={!lightbox.open}
        onClick={closeLight}
      >
        <button
          className="sgs-light-close"
          type="button"
          onClick={(e) => { e.stopPropagation(); closeLight(); }}
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px]" />
        </button>
        <div ref={lightImgWrapRef} className="sgs-light-img-container">
          {lightbox.src && (
            <Image src={lightbox.src} fittingType="fit" alt={lightbox.alt} className="block w-full h-full" />
          )}
        </div>
      </div>
    </section>
  );
}