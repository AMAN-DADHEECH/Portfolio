"use client";

import React from "react";
import { portfolioService } from "@/services/portfolioService";
import { ChapterHeading, ScrollWords, DrawLine, FadeIn } from "./motion/Motion";

const principles = [
  {
    title: "Real-time sync",
    body: "Sub-second updates across every screen with Socket.IO, Redis Pub/Sub and Web Push workers.",
  },
  {
    title: "Data & integrity",
    body: "Type-safe PostgreSQL schemas with Drizzle ORM, ACID transactions and tenant-isolated rows.",
  },
  {
    title: "Modern interfaces",
    body: "Fast, accessible products on the Next.js App Router and TypeScript — considered down to the pixel.",
  },
];

export const AboutSection: React.FC = () => {
  const education = portfolioService.getEducation();

  const facts = [
    { label: "Now building", value: "Restroeye", sub: "Multi-tenant SaaS · Idea2Reality" },
    { label: "Education", value: "B.Tech CSE", sub: `${education.institution} · ${education.period}` },
    { label: "Based in", value: "Jaipur, India", sub: "IST · UTC+5:30 · Remote-friendly" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterHeading
          index="01"
          label="About"
          title="Engineering for"
          highlight="scale & speed"
          note="Pairing responsive, accessible interfaces with fault-tolerant, low-latency backend infrastructure."
        />

        {/* Manifesto — words light up as you scroll */}
        <ScrollWords
          className="font-display text-[1.9rem] leading-[1.2] sm:text-5xl sm:leading-[1.15] lg:text-[3.6rem] text-ink max-w-5xl"
          text="I build *multi-tenant* SaaS platforms and *real-time* systems — bridging pixel-perfect interfaces with resilient, distributed backends, so products feel *instant* and stay *trustworthy* as they scale."
        />

        {/* Principles */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <DrawLine className="bg-gradient-to-r from-[rgb(var(--edge))] to-transparent mb-6" delay={i * 0.12} />
              <div className="font-mono text-xs text-[rgb(var(--edge))] mb-4">0{i + 1}</div>
              <h3 className="font-display text-3xl text-ink mb-3">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
            </FadeIn>
          ))}
        </div>

        {/* Facts */}
        <dl className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line">
          {facts.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.1} className="py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0">
              <dt className="eyebrow mb-3">{f.label}</dt>
              <dd className="font-display text-4xl text-gilded leading-none">{f.value}</dd>
              <dd className="mt-3 text-sm text-ink-muted">{f.sub}</dd>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
};
