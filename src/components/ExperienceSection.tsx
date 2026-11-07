"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MapPin } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { ChapterHeading, FadeIn } from "./motion/Motion";

const yearOf = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export const ExperienceSection: React.FC = () => {
  const experiences = portfolioService.getExperiences();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterHeading
          index="04"
          label="Experience"
          title="Where I've"
          highlight="shipped"
          note="Contributions to commercial SaaS platforms, production multi-tenancy and agile product teams."
        />

        <ol ref={ref} className="relative">
          {/* rail: faint track + gold line that draws with the scroll */}
          <span className="absolute top-0 bottom-0 left-[7px] lg:left-[calc(33.333%-1px)] w-px bg-line" aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: draw }}
            className="absolute top-0 bottom-0 left-[7px] lg:left-[calc(33.333%-1px)] w-px origin-top bg-gradient-to-b from-[rgb(var(--edge-light))] via-[rgb(var(--edge))] to-[rgb(var(--edge-deep))] shadow-[0_0_12px_rgb(var(--edge)/0.7)]"
          />

          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 pb-20 last:pb-0 pl-10 lg:pl-0">
              {/* node */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-35% 0px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="absolute left-0 lg:left-[calc(33.333%-8px)] top-3 h-[15px] w-[15px] rounded-full border-2 border-[rgb(var(--edge))] bg-black shadow-[0_0_16px_rgb(var(--edge)/0.8)]"
              />

              {/* year + period */}
              <FadeIn className="lg:pr-14 lg:text-right">
                <div className="font-display text-7xl sm:text-8xl leading-none text-outline">{yearOf(exp.period)}</div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">{exp.period}</div>
                {i === 0 && (
                  <span className="mt-4 inline-flex items-center gap-2 text-xs text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> Current role
                  </span>
                )}
              </FadeIn>

              {/* details */}
              <FadeIn className="lg:col-span-2 lg:pl-14" delay={0.1}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-4xl sm:text-5xl text-ink">{exp.company}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">{exp.type}</span>
                </div>
                <p className="mt-2 text-lg text-[rgb(var(--edge-light))]">{exp.role}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-dim">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </p>

                <ul className="mt-7 space-y-4">
                  {exp.description.map((item, j) => (
                    <FadeIn as="li" key={j} delay={0.05 * j} y={14} className="flex gap-4 text-[15px] leading-relaxed text-ink-muted">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-[rgb(var(--edge))]" />
                      <span>{item}</span>
                    </FadeIn>
                  ))}
                </ul>

                <p className="mt-7 font-mono text-xs leading-relaxed text-ink-dim">{exp.skills.join("  ·  ")}</p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
