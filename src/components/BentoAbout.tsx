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
    "Frontend Engineering": <Layers className="w-4 h-4 text-[#00f0ff]" />,
    "Backend & Systems": <Server className="w-4 h-4 text-[#fcee0a]" />,
    "Databases & Caching": <Database className="w-4 h-4 text-[#ff0055]" />,
    "DevOps & Core Principles": <Cpu className="w-4 h-4 text-[#00ff66]" />,
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="[ SEC_01 // SYSTEM ARCHITECTURE ]"
          badgeVariant="yellow"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="ENGINEERING PHILOSOPHY FOR"
          highlightedText="SCALE & SUB-SECOND SPEED"
          subtitle="Pairing reactive, accessible user interfaces with fault-tolerant, low-latency distributed backend infrastructure."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5 mb-16">
          {/* Card 1: Architectural Philosophy (Large 8 cols on desktop) */}
          <Card
            padding="lg"
            hudCorners={true}
            accent="yellow"
            className="md:col-span-2 lg:col-span-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#fcee0a]/10 border border-[#fcee0a]/30 text-[#fcee0a] cyber-cut-sm">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#fcee0a] tracking-widest uppercase">// MODULE_01</span>
                  <h3 className="text-xl font-bold font-mono text-white uppercase">Architectural Paradigm</h3>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{personal.bio[0]}</p>
                <p>{personal.bio[1]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-cyan-500/20 font-mono">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#fcee0a] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Server-Auth Logic
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#00ff66] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Transactional ACID
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#00f0ff] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Multi-Tenant RLS
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2: Academic Roots & Education (4 cols on desktop) */}
          <Card
            padding="md"
            hudCorners={true}
            accent="cyan"
            className="md:col-span-1 lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 cyber-cut-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">// ACADEMIC_CRED</span>
                  <h3 className="text-lg font-bold font-mono text-white uppercase">Education</h3>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white">{education.institution}</h4>
              <p className="text-xs text-[#00f0ff] font-mono font-medium mt-0.5">{education.degree}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2 mb-4 font-mono">
                <span>{education.period}</span>
                <span className="px-2 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-mono text-[11px]">
                  {education.grade}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                {education.highlights.map((h, i) => (
                  <p key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                    <span className="text-[#fcee0a] mt-0.5">›</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/20 text-[11px] text-cyan-400/80 font-mono">
              LOC: {education.location} [IN]
            </div>
          </Card>

          {/* Card 3: Real-Time & Caching Engine (4 cols) */}
          <Card padding="md" hudCorners={true} accent="yellow" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#fcee0a]/10 border border-[#fcee0a]/30 text-[#fcee0a] cyber-cut-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white uppercase">Real-Time Sync Mesh</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Sub-second data synchronization using <strong className="text-[#fcee0a]">Socket.IO</strong>,{" "}
              <strong className="text-[#00f0ff]">Redis Pub/Sub</strong>, and Web Push workers for live multi-device ordering states.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="yellow" size="sm">Socket.IO</Badge>
              <Badge variant="cyan" size="sm">Redis Pub/Sub</Badge>
              <Badge variant="subtle" size="sm">Web Push</Badge>
              <Badge variant="subtle" size="sm">Service Workers</Badge>
            </div>
          </Card>

          {/* Card 4: Database Modeling & Performance (4 cols) */}
          <Card padding="md" hudCorners={true} accent="cyan" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] cyber-cut-sm">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white uppercase">Data Schemas & ACID</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Type-safe relational database schemas with <strong className="text-[#00ff66]">PostgreSQL</strong> and{" "}
              <strong className="text-[#ff0055]">Drizzle ORM</strong>, optimizing compound indexes and cache invalidation.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="emerald" size="sm">PostgreSQL</Badge>
              <Badge variant="pink" size="sm">Drizzle ORM</Badge>
              <Badge variant="subtle" size="sm">MySQL</Badge>
              <Badge variant="subtle" size="sm">Redis Cache</Badge>
            </div>
          </Card>

          {/* Card 5: Modern Frontend & Next.js (4 cols) */}
          <Card padding="md" hudCorners={true} accent="yellow" className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 cyber-cut-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white uppercase">Reactive Interface</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Ultra-responsive web applications using <strong className="text-[#fcee0a]">Next.js App Router</strong>,{" "}
              <strong className="text-[#00f0ff]">TypeScript</strong>, and tailored HUD responsive layouts.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="yellow" size="sm">Next.js 15</Badge>
              <Badge variant="cyan" size="sm">TypeScript</Badge>
              <Badge variant="subtle" size="sm">Tailwind CSS</Badge>
              <Badge variant="subtle" size="sm">Server Components</Badge>
            </div>
          </Card>
        </div>

        {/* Categorized Skills Section */}
        <div id="skills" className="pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] font-mono text-[#fcee0a] tracking-widest uppercase">// INVENTORY</div>
              <h3 className="text-2xl font-black font-mono uppercase text-white">Technical Arsenal</h3>
              <p className="text-xs sm:text-sm text-slate-400">Languages, frameworks, databases, and architectural toolkits</p>
            </div>
            
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#070c18] p-1.5 border border-cyan-500/30 cyber-cut-sm w-fit">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  activeCategory === "All"
                    ? "bg-[#fcee0a] text-black shadow-[0_0_12px_rgba(252,238,10,0.5)]"
                    : "text-slate-300 hover:text-[#00f0ff]"
                }`}
              >
                [ All ]
              </button>
              {skills.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                    activeCategory === cat.title
                      ? "bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                      : "text-slate-300 hover:text-[#00f0ff]"
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
              .map((cat, idx) => (
                <Card
                  key={cat.title}
                  padding="md"
                  hudCorners={true}
                  accent={idx % 2 === 0 ? "cyan" : "yellow"}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
                    <div className="p-1.5 bg-[#03060f] border border-cyan-500/30 cyber-cut-sm">
                      {categoryIcons[cat.title] || <Code2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <h4 className="text-xs font-bold font-mono uppercase text-white tracking-wider">
                      {cat.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant={skill.highlight ? "yellow" : "subtle"}
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
