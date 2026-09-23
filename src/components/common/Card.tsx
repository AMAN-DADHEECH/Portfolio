import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  hudCorners?: boolean;
  accent?: "cyan" | "yellow" | "pink" | "none";
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = true,
  interactive = true,
  padding = "md",
  hudCorners = true,
  accent = "cyan",
  onClick,
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-7",
    lg: "p-8 md:p-10",
  };

  const cornerClasses = hudCorners
    ? accent === "yellow"
      ? "hud-frame hud-frame-yellow"
      : "hud-frame"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bento-card relative rounded-xl ${cornerClasses} ${
        glow ? "bento-glow" : ""
      } ${interactive ? "cursor-default" : ""} ${paddingStyles[padding]} ${className}`}
    >
      {/* Top cyber scan/highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
