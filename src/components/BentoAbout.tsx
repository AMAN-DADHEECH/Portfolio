"use client";

import React, { useState } from "react";
import {
  Code2,
  Database,
  Layers,
  Server,
  Cpu,
  GraduationCap,
  Workflow,
  Zap,
  ShieldCheck,
  Globe,
  Radio,
} from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { SectionHeading } from "./common/SectionHeading";

const IconTile: React.FC<{ children: React.ReactNode; tone: "gold" | "champagne" | "mint" | "rose" }> = ({
  children,
  tone,
}) => {
  const tones = {
    gold: "bg-gold/10 text-gold ring-gold/20",
    champagne: "bg-champagne/10 text-champagne ring-champagne/20",
    mint: "bg-mint/10 text-mint ring-mint/20",
    rose: "bg-rose/10 text-rose ring-rose/20",
  };
  return (
    <span className={`grid place-items-center h-10 w-10 shrink-0 rounded-xl ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
};

export const BentoAbout: React.FC = () => {
  const personal = portfolioService.getPersonalData();
  const skills = portfolioService.getSkills();
  const education = portfolioService.getEducation();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Frontend Engineering": <Layers className="w-4 h-4" />,
    "Backend & Systems": <Server className="w-4 h-4" />,
    "Databases & Caching": <Database className="w-4 h-4" />,
    "DevOps & Core Principles": <Cpu className="w-4 h-4" />,
  };
  const categoryTones = ["gold", "champagne", "mint", "rose"] as const;

  const focusCards = [
    {
      icon: <Radio className="w-5 h-5" />,
      tone: "gold" as const,
      title: "Real-time sync",
      body: (
        <>
          Sub-second updates across devices with <span className="text-ink">Socket.IO</span>,{" "}
          <span className="text-ink">Redis Pub/Sub</span> and Web Push workers.
        </>
      ),
      tags: ["Socket.IO", "Redis Pub/Sub", "Web Push", "Service Workers"],
    },
    {
      icon: <Database className="w-5 h-5" />,
      tone: "mint" as const,
      title: "Data & integrity",
      body: (
        <>
          Type-safe relational schemas with <span className="text-ink">PostgreSQL</span> and{" "}
          <span className="text-ink">Drizzle ORM</span>, tuned indexes and cache invalidation.
        </>
      ),
      tags: ["PostgreSQL", "Drizzle ORM", "MySQL", "Redis Cache"],
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      tone: "champagne" as const,
      title: "Modern interfaces",
      body: (
        <>
          Fast, accessible apps with the <span className="text-ink">Next.js App Router</span>,{" "}
          <span className="text-ink">TypeScript</span> and responsive, considered layouts.
        </>
      ),
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Server Components"],
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="About"
          title="Engineering for"
          highlightedText="scale & speed"
          subtitle="Pairing responsive, accessible interfaces with fault-tolerant, low-latency backend infrastructure."
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-20 md:mb-24">
          {/* Philosophy */}
          <Card padding="lg" accent="gold" className="md:col-span-6 lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <IconTile tone="gold">
                  <Workflow className="w-5 h-5" />
                </IconTile>
                <div>
                  <div className="eyebrow">Approach</div>
                  <h3 className="text-xl font-semibold text-ink tracking-tight">How I build</h3>
                </div>
              </div>
              <div className="space-y-4 text-ink-muted text-[15px] sm:text-base leading-relaxed text-pretty">
                <p>{personal.bio[0]}</p>
                <p>{personal.bio[1]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 mt-7 pt-6 border-t border-line">
              {[
                { icon: <Zap className="w-4 h-4 text-gold" />, label: "Server-side logic" },
                { icon: <ShieldCheck className="w-4 h-4 text-mint" />, label: "ACID transactions" },
                { icon: <Globe className="w-4 h-4 text-champagne" />, label: "Multi-tenant RLS" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-sm text-ink">
                  {p.icon}
                  {p.label}
                </div>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card padding="md" accent="champagne" className="md:col-span-6 lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <IconTile tone="champagne">
                  <GraduationCap className="w-5 h-5" />
                </IconTile>
                <div>
                  <div className="eyebrow">Education</div>
                  <h3 className="text-lg font-semibold text-ink tracking-tight">Academic roots</h3>
                </div>
              </div>

              <h4 className="text-[15px] font-medium text-ink">{education.institution}</h4>
              <p className="text-sm text-champagne mt-0.5">{education.degree}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink-dim mt-3 mb-5">
                <span>{education.period}</span>
                <Badge variant="emerald" size="sm">{education.grade}</Badge>
              </div>

              <ul className="space-y-2 text-sm text-ink-muted">
                {education.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 rounded-full bg-champagne shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-line text-xs text-ink-dim">{education.location}</div>
          </Card>

          {/* Focus areas */}
          {focusCards.map((c) => (
            <Card
              key={c.title}
              padding="md"
              accent={c.tone}
              className="md:col-span-3 lg:col-span-4 last:md:col-span-6 last:lg:col-span-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <IconTile tone={c.tone}>{c.icon}</IconTile>
                <h3 className="text-base font-semibold text-ink tracking-tight">{c.title}</h3>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed mb-5">{c.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Badge key={t} variant="subtle" size="sm">{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Skills */}
        <div id="skills">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div>
              <div className="eyebrow mb-2">Skills</div>
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-soft-gradient">
                Technical <span className="font-display italic font-normal text-gilded">toolkit</span>
              </h3>
              <p className="text-sm sm:text-base text-ink-muted mt-2">
                Languages, frameworks, databases and the principles behind them.
              </p>
            </div>

            {/* Filter chips — scroll horizontally on small screens instead of overflowing */}
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
              <div className="inline-flex gap-1 rounded-full border border-line bg-surface p-1" role="tablist">
                {["All", ...skills.map((s) => s.title)].map((title) => (
                  <button
                    key={title}
                    role="tab"
                    aria-selected={activeCategory === title}
                    onClick={() => setActiveCategory(title)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                      activeCategory === title
                        ? "bg-gilded-static text-black font-medium shadow-[0_4px_18px_-6px_rgba(217,180,90,0.7)]"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {title === "All" ? "All" : title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills
              .filter((cat) => activeCategory === "All" || activeCategory === cat.title)
              .map((cat) => {
                const tone = categoryTones[skills.indexOf(cat) % categoryTones.length];
                return (
                  <Card key={cat.title} padding="md" className="flex flex-col">
                    <div className="flex items-center gap-3 mb-5">
                      <IconTile tone={tone}>
                        {categoryIcons[cat.title] || <Code2 className="w-4 h-4" />}
                      </IconTile>
                      <h4 className="text-sm font-semibold text-ink leading-snug">{cat.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <Badge key={skill.name} variant={skill.highlight ? "glow" : "subtle"} size="sm">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
