"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, Sparkles } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { SectionHeading } from "./common/SectionHeading";

export const ExperienceSection: React.FC = () => {
  const experiences = portfolioService.getExperiences();

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="[ SEC_03 // OPERATIONAL TIMELINE ]"
          badgeVariant="yellow"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="CAREER TRAJECTORY &"
          highlightedText="ENGINEERING MILESTONES"
          subtitle="Mission-critical contributions to commercial SaaS platforms, production multi-tenancy, and agile development."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Circuit Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#fcee0a] via-[#00f0ff] to-[#ff0055] -translate-x-1/2 hidden sm:block shadow-[0_0_12px_rgba(0,240,255,0.4)]" />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Center Cyber Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#030712] border-2 border-[#fcee0a] shadow-[0_0_18px_rgba(252,238,10,0.7)] z-10 flex items-center justify-center hidden sm:flex cyber-cut-sm">
                    <div className="w-2.5 h-2.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse" />
                  </div>

                  {/* Card Content (half-width on desktop) */}
                  <div className="w-full sm:w-1/2 sm:px-8">
                    <Card
                      padding="lg"
                      hudCorners={true}
                      accent={idx === 0 ? "yellow" : "cyan"}
                      className="border border-cyan-500/30 hover:border-[#fcee0a]/60 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    >
                      {/* Company & Role Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-lg font-black font-mono uppercase text-white flex items-center gap-2 tracking-tight">
                              <Building2 className="w-4 h-4 text-[#fcee0a]" />
                              {exp.company}
                            </span>
                            <Badge variant={idx === 0 ? "yellow" : "subtle"} size="sm">
                              {exp.type}
                            </Badge>
                          </div>
                          <h4 className="text-sm font-bold font-mono text-[#00f0ff] uppercase tracking-wide">
                            {exp.role}
                          </h4>
                        </div>
                      </div>

                      {/* Period & Location Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-5 font-mono">
                        <span className="flex items-center gap-1.5 text-cyan-300/80">
                          <Calendar className="w-3.5 h-3.5 text-[#fcee0a]" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-[#ff0055]" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Responsibilities Bullets */}
                      <ul className="space-y-2.5 mb-5 font-mono text-xs sm:text-sm">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="subtle" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
