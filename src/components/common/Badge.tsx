import React from "react";

export type BadgeVariant = "glow" | "accent" | "cyan" | "emerald" | "amber" | "outline" | "subtle";
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
    sm: "text-xs px-2.5 py-0.5 rounded-full font-medium gap-1",
    md: "text-xs md:text-sm px-3.5 py-1 rounded-full font-medium gap-1.5",
  };

  const variantStyles = {
    glow: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.25)]",
    accent: "bg-violet-500/10 text-violet-300 border border-violet-500/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    outline: "bg-transparent text-slate-300 border border-white/10 hover:border-white/20",
    subtle: "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10",
  };

  return (
    <span
      className={`inline-flex items-center justify-center transition-colors duration-200 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
