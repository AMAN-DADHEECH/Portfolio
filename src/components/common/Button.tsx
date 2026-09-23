import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "glow"
  | "secondary"
  | "outline"
  | "ghost"
  | "cyan"
  | "yellow"
  | "pink";
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
    "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden cyber-cut-sm";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5 font-mono",
    md: "text-xs sm:text-sm px-5 py-2.5 gap-2 font-mono uppercase tracking-wider",
    lg: "text-sm sm:text-base px-7 py-3.5 gap-2.5 font-bold uppercase tracking-wider",
  };

  const variantStyles = {
    primary:
      "bg-[#fcee0a] text-black font-extrabold shadow-[0_0_20px_rgba(252,238,10,0.4)] hover:shadow-[0_0_30px_rgba(252,238,10,0.7)] hover:bg-[#ffe600] active:scale-[0.98]",
    yellow:
      "bg-[#fcee0a] text-black font-extrabold shadow-[0_0_20px_rgba(252,238,10,0.4)] hover:shadow-[0_0_30px_rgba(252,238,10,0.7)] hover:bg-[#ffe600] active:scale-[0.98]",
    glow:
      "bg-gradient-to-r from-[#fcee0a] via-[#00f0ff] to-[#ff0055] text-black font-extrabold shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_35px_rgba(252,238,10,0.6)] hover:brightness-110 active:scale-[0.98]",
    cyan:
      "bg-[#00f0ff] text-black font-extrabold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:bg-[#33f3ff] active:scale-[0.98]",
    pink:
      "bg-[#ff0055] text-white font-extrabold shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.7)] hover:bg-[#ff1a6b] active:scale-[0.98]",
    secondary:
      "bg-[#0c1527] text-cyan-300 border border-cyan-500/40 hover:bg-[#121f38] hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-[0.98]",
    outline:
      "bg-[#060b17]/80 text-slate-200 border border-cyan-500/30 hover:border-[#fcee0a] hover:text-[#fcee0a] hover:shadow-[0_0_18px_rgba(252,238,10,0.3)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-300 hover:text-[#00f0ff] hover:bg-cyan-500/10 active:scale-[0.98]",
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
