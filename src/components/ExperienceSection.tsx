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
          badgeText="Career Journey & Roles"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="Professional"
          highlightedText="Experience & Milestones"
          subtitle="Proven track record in engineering production features for enterprise SaaS and agile web applications."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500/40 to-cyan-500/10 -translate-x-1/2 hidden sm:block" />

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
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#080b12] border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 flex items-center justify-center hidden sm:flex">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Card Content (half-width on desktop) */}
                  <div className="w-full sm:w-1/2 sm:px-8">
                    <Card
                      padding="lg"
                      className="border border-white/10 hover:border-indigo-500/40 shadow-xl"
                    >
                      {/* Company & Role Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-lg font-bold text-white flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-indigo-400" />
                              {exp.company}
                            </span>
                            <Badge variant={idx === 0 ? "glow" : "subtle"} size="sm">
                              {exp.type}
                            </Badge>
                          </div>
                          <h4 className="text-sm font-semibold text-cyan-300">{exp.role}</h4>
                        </div>
                      </div>

                      {/* Period & Location Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-5 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Responsibilities Bullets */}
                      <ul className="space-y-2.5 mb-5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
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
