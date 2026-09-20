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
  Sparkles,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { SectionHeading } from "./common/SectionHeading";

export const BentoAbout: React.FC = () => {
  const personal = portfolioService.getPersonalData();
  const skills = portfolioService.getSkills();
  const education = portfolioService.getEducation();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Frontend Engineering": <Layers className="w-4 h-4 text-indigo-400" />,
    "Backend & Systems": <Server className="w-4 h-4 text-cyan-400" />,
    "Databases & Caching": <Database className="w-4 h-4 text-purple-400" />,
    "DevOps & Core Principles": <Cpu className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="About & Core Philosophy"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="Engineering Systems for"
          highlightedText="Scale & Real-Time Speed"
          subtitle="A holistic approach to full-stack engineering: pairing reactive, accessible user interfaces with robust, fault-tolerant backend infrastructure."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5 mb-16">
          {/* Card 1: Architectural Philosophy (Large 8 cols on desktop) */}
          <Card padding="lg" className="md:col-span-2 lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Full-Stack Philosophy</h3>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{personal.bio[0]}</p>
                <p>{personal.bio[1]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Server-Authoritative Logic
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Transactional Integrity
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Multi-Tenant Isolation
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2: Academic Roots & Education (4 cols on desktop) */}
          <Card padding="md" className="md:col-span-1 lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Education</h3>
              </div>

              <h4 className="text-sm font-semibold text-slate-100">{education.institution}</h4>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">{education.degree}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2 mb-4">
                <span>{education.period}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  {education.grade}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                {education.highlights.map((h, i) => (
                  <p key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 font-mono">
              📍 {education.location}
            </div>
          </Card>

          {/* Card 3: Real-Time & Caching Engine (4 cols) */}
          <Card padding="md" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Real-Time Sync</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Pioneering sub-second data broadcasts using <strong className="text-indigo-300">Socket.IO</strong>,{" "}
              <strong className="text-cyan-300">Redis Pub/Sub</strong>, and Web Push service workers for synchronized multi-device roles.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="glow" size="sm">Socket.IO</Badge>
              <Badge variant="cyan" size="sm">Redis Pub/Sub</Badge>
              <Badge variant="subtle" size="sm">Web Push</Badge>
              <Badge variant="subtle" size="sm">Service Workers</Badge>
            </div>
          </Card>

          {/* Card 4: Database Modeling & Performance (4 cols) */}
          <Card padding="md" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Database Design</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Designing type-safe relational schemas with <strong className="text-emerald-300">PostgreSQL</strong> and{" "}
              <strong className="text-purple-300">Drizzle ORM</strong>, optimizing indexes, foreign constraints, and distributed cache layers.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="emerald" size="sm">PostgreSQL</Badge>
              <Badge variant="accent" size="sm">Drizzle ORM</Badge>
              <Badge variant="subtle" size="sm">MySQL</Badge>
              <Badge variant="subtle" size="sm">MongoDB</Badge>
            </div>
          </Card>

          {/* Card 5: Modern Frontend & Next.js (4 cols) */}
          <Card padding="md" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Modern Frontend</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Building dynamic, accessible, and ultra-fast web apps using <strong className="text-indigo-300">Next.js App Router</strong>,{" "}
              <strong className="text-cyan-300">TypeScript</strong>, and tailored responsive CSS.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="glow" size="sm">Next.js 14/15</Badge>
              <Badge variant="cyan" size="sm">TypeScript</Badge>
              <Badge variant="subtle" size="sm">Tailwind CSS</Badge>
              <Badge variant="subtle" size="sm">React Server Comp</Badge>
            </div>
          </Card>
        </div>

        {/* Categorized Skills Section */}
        <div id="skills" className="pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Technical Arsenal</h3>
              <p className="text-sm text-slate-400">Languages, frameworks, databases, and architectural toolkits</p>
            </div>
            
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 w-fit">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === "All"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Skills
              </button>
              {skills.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat.title
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills
              .filter((cat) => activeCategory === "All" || activeCategory === cat.title)
              .map((cat) => (
                <Card key={cat.title} padding="md" className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                      {categoryIcons[cat.title] || <Code2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{cat.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant={skill.highlight ? "glow" : "subtle"}
                        size="sm"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
