"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed page backdrop whose colour glides between deep jewel tones as you scroll.
 * Each section id below has a base colour + a glow colour; the backdrop blends
 * continuously between neighbouring sections based on the viewport centre.
 * Also publishes --edge / --edge-light / --edge-deep on <html> so borders follow the same palette.
 * Writes straight to element styles inside rAF — no React re-renders.
 */

type RGB = [number, number, number];

type Palette = {
  bg: RGB; // page background
  glow: RGB; // soft spotlight
  edge: RGB; // main border colour
  edgeLight: RGB; // bright highlight that travels around flowing borders
  edgeDeep: RGB; // dark tail of the border gradient
};

const STOPS: ({ id: string } & Palette)[] = [
  // black + gold
  { id: "home", bg: [0, 0, 0], glow: [217, 180, 90], edge: [217, 180, 90], edgeLight: [255, 244, 207], edgeDeep: [138, 106, 31] },
  // deep navy + sapphire
  { id: "about", bg: [11, 21, 58], glow: [80, 125, 255], edge: [110, 150, 255], edgeLight: [225, 233, 255], edgeDeep: [40, 64, 160] },
  // deep emerald
  { id: "projects", bg: [4, 40, 28], glow: [20, 200, 140], edge: [52, 211, 153], edgeLight: [214, 255, 236], edgeDeep: [6, 110, 75] },
  // deep burgundy + ruby
  { id: "experience", bg: [50, 8, 20], glow: [235, 45, 85], edge: [244, 80, 110], edgeLight: [255, 220, 228], edgeDeep: [140, 20, 50] },
  // back to black + gold
  { id: "contact", bg: [0, 0, 0], glow: [217, 180, 90], edge: [217, 180, 90], edgeLight: [255, 244, 207], edgeDeep: [138, 106, 31] },
];
const KEYS = ["bg", "glow", "edge", "edgeLight", "edgeDeep"] as const;

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const mixPalette = (a: Palette, b: Palette, t: number): Palette =>
  Object.fromEntries(KEYS.map((k) => [k, mix(a[k], b[k], t)])) as Palette;
const smooth = (t: number) => t * t * (3 - 2 * t);

export const ScrollTint: React.FC = () => {
  const baseRef = useRef<HTMLDivElement>(null);
  const glowTopRef = useRef<HTMLDivElement>(null);
  const glowBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastKey = "";

    const update = () => {
      frame = 0;
      const vc = window.innerHeight / 2;
      const centres = STOPS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });

      // find the pair of sections the viewport centre sits between
      const valid = STOPS.map((s, i) => ({ ...s, c: centres[i] })).filter(
        (s): s is (typeof STOPS)[number] & { c: number } => s.c !== null
      );
      let p: Palette = STOPS[0];
      if (valid.length) {
        if (vc <= valid[0].c) p = valid[0];
        else if (vc >= valid[valid.length - 1].c) p = valid[valid.length - 1];
        else {
          for (let i = 0; i < valid.length - 1; i++) {
            const a = valid[i];
            const b = valid[i + 1];
            if (vc >= a.c && vc < b.c) {
              p = mixPalette(a, b, smooth((vc - a.c) / (b.c - a.c)));
              break;
            }
          }
        }
      }

      const key = KEYS.map((k) => p[k].join(",")).join("|");
      if (key === lastKey) return;
      lastKey = key;
      const g = p.glow.join(",");
      if (baseRef.current) baseRef.current.style.backgroundColor = `rgb(${p.bg.join(",")})`;
      if (glowTopRef.current)
        glowTopRef.current.style.background = `radial-gradient(closest-side, rgba(${g},0.2), transparent)`;
      if (glowBottomRef.current)
        glowBottomRef.current.style.background = `radial-gradient(closest-side, rgba(${g},0.12), transparent)`;

      // Border colours as space-separated RGB channels → used as rgb(var(--edge) / <alpha>) in CSS
      const root = document.documentElement.style;
      root.setProperty("--edge", p.edge.join(" "));
      root.setProperty("--edge-light", p.edgeLight.join(" "));
      root.setProperty("--edge-deep", p.edgeDeep.join(" "));
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div className="scroll-tint" aria-hidden="true">
      <div ref={baseRef} className="scroll-tint-base" />
      <div ref={glowTopRef} className="scroll-tint-glow-top" />
      <div ref={glowBottomRef} className="scroll-tint-glow-bottom" />
      <div className="scroll-tint-grid" />
      <div className="scroll-tint-vignette" />
    </div>
  );
};
