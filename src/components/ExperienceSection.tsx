"use client";

import React from "react";
import { Calendar, MapPin, Check } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { SectionHeading } from "./common/SectionHeading";

export const ExperienceSection: React.FC = () => {
  const experiences = portfolioService.getExperiences();

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Experience"
          title="Where I've"
          highlightedText="shipped"
          subtitle="Contributions to commercial SaaS platforms, production multi-tenancy and agile product teams."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Rail: left on mobile, centred on md+ */}
          <div
            className="absolute top-2 bottom-2 left-[11px] md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-gold/60 via-champagne/40 to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-8 md:space-y-14">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isCurrent = idx === 0;

              return (
                <li
                  key={exp.id}
                  className={`relative pl-10 md:pl-0 md:flex ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Node */}
                  <span
                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 grid place-items-center h-[23px] w-[23px] rounded-full bg-canvas border border-line-strong"
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isCurrent ? "bg-gilded shadow-[0_0_12px_rgba(212,175,55,0.8)]" : "bg-ink-dim"
                      }`}
                    />
                  </span>

                  <div className="w-full md:w-1/2 md:px-10">
                    <Card padding="md" accent={isCurrent ? "gold" : "none"}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold tracking-tight text-ink">{exp.company}</h3>
                        <Badge variant={isCurrent ? "emerald" : "subtle"} size="sm">
                          {exp.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gold mb-3">{exp.role}</p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-dim mb-5">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-2.5 mb-5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                            <span className="mt-1 grid place-items-center h-4 w-4 rounded-full bg-mint/15 shrink-0">
                              <Check className="w-2.5 h-2.5 text-mint" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-line flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="subtle" size="sm">{skill}</Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
