import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Gradient hairline border on hover */
  glow?: boolean;
  /** Lift on hover */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  /** @deprecated kept for API compatibility; no visual effect in the Noir & Gold theme */
  hudCorners?: boolean;
  /** Soft tinted light in the top corner of the card */
  accent?: "gold" | "champagne" | "mint" | "cyan" | "yellow" | "pink" | "none";
  onClick?: () => void;
}

const accentGlow: Record<NonNullable<CardProps["accent"]>, string> = {
  gold: "rgba(212,175,55,0.14)",
  yellow: "rgba(212,175,55,0.14)",
  champagne: "rgba(241,223,174,0.12)",
  cyan: "rgba(241,223,174,0.12)",
  mint: "rgba(110,231,183,0.11)",
  pink: "rgba(253,164,175,0.12)",
  none: "transparent",
};

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = true,
  interactive = true,
  padding = "md",
  accent = "none",
  onClick,
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-4 sm:p-5",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`glass glass-card reveal ${interactive ? "is-interactive" : ""} ${
        glow ? "glow-border" : ""
      } ${paddingStyles[padding]} ${className}`}
      style={
        accent !== "none"
          ? {
              backgroundImage: `radial-gradient(120% 80% at 0% 0%, ${accentGlow[accent]}, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};
