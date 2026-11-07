"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Words rise up out of a mask, one after another                             */
/* -------------------------------------------------------------------------- */
export const MaskWords: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = "",
  delay = 0,
}) => (
  <>
    {text.split(" ").map((w, i) => (
      <React.Fragment key={i}>
        <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>{" "}
      </React.Fragment>
    ))}
  </>
);

/* -------------------------------------------------------------------------- */
/* Simple fade + rise on enter                                                */
/* -------------------------------------------------------------------------- */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "p";
}> = ({ children, className = "", delay = 0, y = 28, as = "div" }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
};

/* -------------------------------------------------------------------------- */
/* A hairline that draws itself from left to right                            */
/* -------------------------------------------------------------------------- */
export const DrawLine: React.FC<{ className?: string; delay?: number }> = ({ className = "", delay = 0 }) => (
  <motion.span
    aria-hidden="true"
    className={`block h-px origin-left ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: "-5% 0px" }}
    transition={{ duration: 1.2, ease: EASE, delay }}
  />
);

/* -------------------------------------------------------------------------- */
/* Paragraph whose words light up as it scrolls through the viewport          */
/* Wrap words in *asterisks* to render them as gold italic accents.            */
/* -------------------------------------------------------------------------- */
const ScrollWord: React.FC<{
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  accent: boolean;
}> = ({ progress, range, children, accent }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "italic text-gilded" : ""}>
        {children}
      </motion.span>{" "}
    </>
  );
};

export const ScrollWords: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*") || raw.endsWith("*") || raw.endsWith("*,") || raw.endsWith("*.");
        const w = raw.replace(/\*/g, "");
        return (
          <ScrollWord
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={accent}
          >
            {w}
          </ScrollWord>
        );
      })}
    </p>
  );
};

/* -------------------------------------------------------------------------- */
/* Magnetic: element leans toward the cursor while hovered                    */
/* -------------------------------------------------------------------------- */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Chapter heading: "02 — Skills" label + big serif title + side note         */
/* -------------------------------------------------------------------------- */
export const ChapterHeading: React.FC<{
  index: string;
  label: string;
  title: string;
  highlight?: string;
  note?: string;
}> = ({ index, label, title, highlight, note }) => (
  <div className="mb-14 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
    <div className="lg:col-span-8">
      <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[rgb(var(--edge))]">
        <span>{index}</span>
        <DrawLine className="w-10 sm:w-16 bg-[rgb(var(--edge))]" />
        <span>{label}</span>
      </div>
      <h2 className="mt-5 font-display text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-[5.2rem] tracking-[-0.01em]">
        <MaskWords text={title} className="text-soft-gradient" />
        {highlight && <MaskWords text={highlight} className="italic text-gilded" delay={0.15} />}
      </h2>
    </div>
    {note && (
      <FadeIn className="lg:col-span-4 text-ink-muted text-[15px] sm:text-base leading-relaxed lg:pb-3" delay={0.2}>
        {note}
      </FadeIn>
    )}
  </div>
);
