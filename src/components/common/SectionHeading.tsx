import React from "react";
import { Badge, BadgeVariant } from "./Badge";

interface SectionHeadingProps {
  badgeText: string;
  badgeVariant?: BadgeVariant;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  badgeVariant = "glow",
  badgeIcon,
  title,
  highlightedText,
  subtitle,
  align = "center",
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? "text-center max-w-2xl mx-auto" : "max-w-2xl"
      } ${className}`}
    >
      <div className={`mb-3 inline-block ${isCenter ? "mx-auto" : ""}`}>
        <Badge variant={badgeVariant} size="md" icon={badgeIcon}>
          {badgeText}
        </Badge>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}{" "}
        {highlightedText && (
          <span className="gradient-text-accent">{highlightedText}</span>
        )}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
