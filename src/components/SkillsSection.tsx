"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { portfolioService } from "@/services/portfolioService";
import { ChapterHeading, FadeIn } from "./motion/Motion";

/* Gem colour per category (sapphire, ruby, emerald, amethyst) */
const TONES = ["#6f9bff", "#f45b7a", "#34d399", "#a78bfa"];

type Tag = { name: string; cat: number; x: number; y: number; z: number };

/** Evenly spread points on a unit sphere (Fibonacci lattice) */
const fibonacciSphere = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
  });

const TagSphere: React.FC<{ tags: Tag[]; active: number | null }> = ({ tags, active }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLSpanElement | null)[]>([]);
  const target = useRef({ x: 0.0025, y: 0.004 }); // idle drift (radians/frame)

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // narrower radius on phones so long tags never run off-screen
    const fit = () => (el.clientWidth < 480 ? el.clientWidth / 3.4 : el.clientWidth / 2.25);
    let radius = fit();
    const ro = new ResizeObserver(() => (radius = fit()));
    ro.observe(el);

    const pts = tags.map((t) => ({ x: t.x, y: t.y, z: t.z }));
    const v = { x: 0, y: 0 };
    let frame = 0;

    const render = () => {
      v.x += (target.current.x - v.x) * 0.06;
      v.y += (target.current.y - v.y) * 0.06;
      const [cx, sx, cy, sy] = [Math.cos(v.x), Math.sin(v.x), Math.cos(v.y), Math.sin(v.y)];
      pts.forEach((p, i) => {
        // rotate around Y then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y1 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        p.x = x1;
        p.y = y1;
        p.z = z2;
        const node = items.current[i];
        if (!node) return;
        const depth = (z2 + 1.4) / 2.4; // 0.17 (back) → 1 (front)
        node.style.transform = `translate3d(${x1 * radius}px, ${y1 * radius}px, 0) translate(-50%, -50%) scale(${0.62 + depth * 0.5})`;
        node.style.opacity = String(Math.max(0.08, depth * depth * 1.05));
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.45 ? `blur(${(0.45 - depth) * 3}px)` : "none";
      });
      if (!reduce) frame = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [tags]);

  return (
    <div
      ref={wrap}
      className="relative isolate mx-auto aspect-square w-full max-w-[560px] select-none"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        target.current = { x: -ny * 0.03, y: nx * 0.03 };
      }}
      onPointerLeave={() => (target.current = { x: 0.0025, y: 0.004 })}
    >
      {/* orbit rings */}
      <div className="absolute inset-[8%] rounded-full border border-line" aria-hidden="true" />
      <div
        className="absolute inset-[8%] rounded-full border border-[rgb(var(--edge)/0.25)] [transform:rotateX(72deg)]"
        aria-hidden="true"
      />
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(var(--edge)/0.18),transparent_70%)] blur-2xl" aria-hidden="true" />

      <div className="absolute left-1/2 top-1/2">
        {tags.map((t, i) => {
          const on = active === null || active === t.cat;
          return (
            <span
              key={t.name}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="absolute left-0 top-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] sm:text-sm font-medium transition-[color,background-color,box-shadow] duration-500 will-change-transform"
              style={{
                color: on ? TONES[t.cat] : "rgba(169,162,147,0.45)",
                backgroundColor: on && active !== null ? `${TONES[t.cat]}1f` : "transparent",
                boxShadow: on && active !== null ? `0 0 0 1px ${TONES[t.cat]}55` : "none",
              }}
            >
              {t.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const skills = portfolioService.getSkills();
  const [active, setActive] = useState<number | null>(null);

  const tags = useMemo<Tag[]>(() => {
    const flat = skills.flatMap((c, cat) => c.skills.map((s) => ({ name: s.name, cat })));
    const pts = fibonacciSphere(flat.length);
    // interleave categories around the sphere for an even colour mix
    const order = [...flat].sort((a, b) => (flat.indexOf(a) % 4) - (flat.indexOf(b) % 4));
    return order.map((t, i) => ({ ...t, ...pts[i] }));
  }, [skills]);

  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterHeading
          index="02"
          label="Skills"
          title="A precious"
          highlight="toolkit"
          note="Move across the sphere to steer it. Pick a discipline to light up its tools."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Discipline list */}
          <ul className="lg:col-span-5 border-t border-line" onPointerLeave={() => setActive(null)}>
            {skills.map((cat, i) => (
              <FadeIn as="li" key={cat.title} delay={i * 0.08} className="border-b border-line">
                <button
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive((a) => (a === i ? null : i))}
                  aria-pressed={active === i}
                  className="group w-full flex items-center gap-4 py-5 text-left cursor-pointer"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-150"
                    style={{ backgroundColor: TONES[i], boxShadow: `0 0 14px ${TONES[i]}` }}
                  />
                  <span
                    className={`flex-1 font-display text-2xl sm:text-3xl transition-all duration-500 ${
                      active === i ? "translate-x-2 text-ink" : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {cat.title}
                  </span>
                  <span className="font-mono text-xs text-ink-dim">
                    {String(cat.skills.length).padStart(2, "0")}
                  </span>
                </button>
              </FadeIn>
            ))}
          </ul>

          {/* Sphere */}
          <FadeIn className="lg:col-span-7" delay={0.15}>
            <TagSphere tags={tags} active={active} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
