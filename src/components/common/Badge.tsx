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
  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 rounded-sm font-mono tracking-wide gap-1",
    md: "text-xs px-3 py-1 rounded-sm font-mono tracking-wider uppercase gap-1.5",
  };

  const variantStyles = {
    glow: "bg-[#fcee0a]/10 text-[#fcee0a] border border-[#fcee0a]/40 shadow-[0_0_12px_rgba(252,238,10,0.35)]",
    yellow:
      "bg-[#fcee0a]/10 text-[#fcee0a] border border-[#fcee0a]/40 shadow-[0_0_12px_rgba(252,238,10,0.35)]",
    cyan: "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.35)]",
    pink: "bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/40 shadow-[0_0_12px_rgba(255,0,85,0.35)]",
    accent:
      "bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/40 shadow-[0_0_12px_rgba(255,0,85,0.3)]",
    emerald:
      "bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/40 shadow-[0_0_12px_rgba(0,255,102,0.3)]",
    amber:
      "bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.25)]",
    hud: "bg-[#040814] text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)]",
    outline:
      "bg-[#070c18]/80 text-slate-300 border border-cyan-500/30 hover:border-cyan-400 hover:text-white",
    subtle:
      "bg-cyan-950/25 text-slate-300 border border-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-200",
  };

  return (
    <span
      className={`inline-flex items-center justify-center transition-all duration-200 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
