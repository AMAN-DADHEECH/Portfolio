import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = true,
  interactive = true,
  padding = "md",
  onClick,
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-7",
    lg: "p-8 md:p-10",
  };

  return (
    <div
      onClick={onClick}
      className={`bento-card relative rounded-2xl ${
        glow ? "bento-glow" : ""
      } ${interactive ? "cursor-default" : ""} ${paddingStyles[padding]} ${className}`}
    >
      {/* Subtle top reflection accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
