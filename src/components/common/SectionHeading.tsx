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
  badgeVariant = "subtle",
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
      className={`reveal mb-10 sm:mb-14 ${
        isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
      } ${className}`}
    >
      <div className="mb-4 inline-flex">
        <Badge variant={badgeVariant} size="md" icon={badgeIcon}>
          {badgeText}
        </Badge>
      </div>

      <h2 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight text-soft-gradient mb-4 text-balance">
        {title}{" "}
        {highlightedText && (
          <span className="font-display italic font-normal text-gilded">
            {highlightedText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-ink-muted text-[15px] sm:text-lg leading-relaxed text-pretty ${
            isCenter ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
