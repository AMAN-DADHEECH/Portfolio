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
  onClick,
  ...props
}) => {
  const handleLinkClick = onClick
    ? (e: React.MouseEvent<HTMLAnchorElement>) =>
        onClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
    : undefined;

  const baseStyles =
    "group relative inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3.5 h-9 gap-1.5",
    md: "text-sm px-5 h-11 gap-2",
    lg: "text-sm sm:text-[15px] px-6 sm:px-7 h-12 gap-2.5",
  };

  const solidLight =
    "bg-gilded-static text-black font-semibold shadow-[0_8px_30px_-10px_rgba(212,175,55,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] hover:brightness-110 hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.85),inset_0_1px_0_rgba(255,255,255,0.5)]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: solidLight,
    yellow: solidLight,
    glow: "bg-gilded text-canvas font-semibold shadow-[0_8px_30px_-10px_rgba(212,175,55,0.8)] hover:brightness-110",
    cyan: "bg-champagne text-canvas hover:brightness-110",
    pink: "bg-rose text-canvas hover:brightness-110",
    secondary:
      "glass text-ink hover:bg-surface-2 hover:border-line-strong",
    outline:
      "border border-line bg-transparent text-ink-muted hover:text-ink hover:border-line-strong hover:bg-surface",
    ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-surface",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0 inline-flex">{icon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && iconRight && (
        <span className="shrink-0 inline-flex transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
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
          onClick={handleLinkClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} download={download} className={combinedClasses} onClick={handleLinkClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || loading} onClick={onClick} {...props}>
      {content}
    </button>
  );
};
