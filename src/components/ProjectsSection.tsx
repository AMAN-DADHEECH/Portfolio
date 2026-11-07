"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { portfolioService } from "@/services/portfolioService";
import { Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { ChapterHeading, FadeIn } from "./motion/Motion";

const splitTitle = (title: string) => {
  const [main, ...rest] = title.split(" — ");
  return { main, sub: rest.join(" — ") };
};

export const ProjectsSection: React.FC = () => {
  const projects = portfolioService.getAllProjects();
  const [open, setOpen] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // cursor-following preview with spring + velocity-based 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 160, damping: 20, mass: 0.4 });
  const vx = useMotionValue(0);
  const vy = useMotionValue(0);
  const rotateY = useSpring(useTransform(vx, [-40, 40], [-18, 18]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(vy, [-40, 40], [14, -14]), { stiffness: 120, damping: 14 });

  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = hovered !== null ? projects[hovered] : null;

  return (
    <section id="projects" className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterHeading
          index="03"
          label="Work"
          title="Selected"
          highlight="creations"
          note="Multi-tenant SaaS, real-time transactional workflows and high-performance full-stack applications."
        />

        <ul
          className="border-t border-line"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            vx.set(e.clientX - mx.get());
            vy.set(e.clientY - my.get());
            mx.set(e.clientX);
            my.set(e.clientY);
            // relax the tilt back to flat once the mouse pauses
            if (settle.current) clearTimeout(settle.current);
            settle.current = setTimeout(() => {
              vx.set(0);
              vy.set(0);
            }, 90);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {projects.map((p, i) => {
            const { main, sub } = splitTitle(p.title);
            const isOn = hovered === i;
            return (
              <FadeIn as="li" key={p.id} delay={i * 0.06} className="relative border-b border-line">
                {/* hover fill line */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gradient-to-r from-[rgb(var(--edge))] via-[rgb(var(--edge-light))] to-transparent transition-transform duration-700 ${
                    isOn ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <button
                  onClick={() => setOpen(p)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="group w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-7 sm:py-10 text-left cursor-pointer focus-visible:outline-none"
                >
                  <span className="font-mono text-xs sm:text-sm text-ink-dim self-start mt-2 sm:mt-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block font-display text-[1.9rem] leading-[1.05] sm:text-4xl lg:text-[3.3rem] transition-all duration-500 ${
                        isOn ? "translate-x-3 text-gilded italic" : "text-ink"
                      }`}
                    >
                      {main}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                      {sub && <span>{sub}</span>}
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--edge))]">
                        {p.category}
                        {p.badge ? ` · ${p.badge}` : ""}
                      </span>
                    </span>
                    {/* touch / small screens: inline details instead of the floating preview */}
                    <span className="mt-3 block text-sm text-ink-muted leading-relaxed lg:hidden">{p.tagline}</span>
                    <span className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-muted">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span
                    className={`grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full border transition-all duration-500 ${
                      isOn
                        ? "border-[rgb(var(--edge))] bg-[rgb(var(--edge))] text-black rotate-45"
                        : "border-line-strong text-ink"
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </button>
              </FadeIn>
            );
          })}
        </ul>
      </div>

      {/* Floating 3D preview (desktop, mouse only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block [perspective:900px]"
        style={{ x, y }}
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotateY, rotateX }}
              className="glass flow-border relative ml-8 -mt-24 w-[340px] rounded-3xl bg-black/70 p-6 [transform-style:preserve-3d]"
            >
              <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgb(var(--edge)/0.35),transparent_65%)] blur-2xl" />
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--edge))]">
                {current.badge ?? current.category}
              </div>
              <p className="mt-3 font-display text-2xl leading-snug text-ink">{current.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {current.technologies.slice(0, 6).map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-xs text-ink-dim">Click to open the case study →</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={open} isOpen={!!open} onClose={() => setOpen(null)} />
    </section>
  );
};
