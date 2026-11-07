import React from "react";

export type BadgeVariant =
  | "glow"
  | "accent"
  | "cyan"
  | "emerald"
  | "amber"
  | "outline"
  | "subtle"
  | "yellow"
  | "pink"
  | "gold"
  | "hud";
export type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "subtle",
  size = "md",
  className = "",
  icon,
}) => {
  const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  const gold = "bg-gold/10 text-gold border-gold/25";
  const variantStyles: Record<BadgeVariant, string> = {
    glow: "bg-gold/10 text-champagne border-gold/30",
    gold,
    yellow: gold,
    accent: "bg-rose/10 text-rose border-rose/25",
    pink: "bg-rose/10 text-rose border-rose/25",
    cyan: "bg-champagne/10 text-champagne border-champagne/25",
    hud: "bg-champagne/10 text-champagne border-champagne/25",
    emerald: "bg-mint/10 text-mint border-mint/25",
    amber: "bg-amber/10 text-amber border-amber/25",
    outline: "bg-transparent text-ink-muted border-line-strong",
    subtle: "bg-surface text-ink-muted border-line",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap transition-colors duration-200 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
