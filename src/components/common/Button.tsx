import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "glow" | "secondary" | "outline" | "ghost" | "cyan";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  download?: boolean | string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  download,
  icon,
  iconRight,
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-600 hover:to-indigo-700 active:scale-[0.98]",
    glow:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98]",
    cyan:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-600 hover:to-blue-700 active:scale-[0.98]",
    secondary:
      "bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:bg-slate-700/80 hover:text-white hover:border-slate-600 active:scale-[0.98]",
    outline:
      "bg-transparent text-slate-200 border border-white/15 hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0 transition-transform group-hover:-translate-y-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && iconRight && (
        <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download={download}
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} download={download} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};
