export interface ThemeConfig {
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    surfaceGlass: string;
    border: string;
    borderHighlight: string;
    primary: string;
    primaryGlow: string;
    secondary: string;
    accent: string;
    accentGlow: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    success: string;
    warning: string;
  };
}

export const defaultTheme: ThemeConfig = {
  name: "Aurora Glass",
  colors: {
    background: "#07070d",
    surface: "rgba(255, 255, 255, 0.035)",
    surfaceHover: "rgba(255, 255, 255, 0.06)",
    surfaceGlass: "rgba(11, 11, 20, 0.7)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHighlight: "rgba(255, 255, 255, 0.16)",
    primary: "#a78bfa", // Violet
    primaryGlow: "rgba(167, 139, 250, 0.25)",
    secondary: "#7dd3fc", // Sky
    accent: "#6ee7b7", // Mint
    accentGlow: "rgba(110, 231, 183, 0.3)",
    textPrimary: "#ecebf5",
    textSecondary: "#a3a3b8",
    textMuted: "#6e6e85",
    success: "#6ee7b7",
    warning: "#fcd34d",
  },
};

export const themeService = {
  getTheme: () => defaultTheme,
  
  getAccentGradient: () => "linear-gradient(100deg, #a78bfa 0%, #7dd3fc 50%, #6ee7b7 100%)",
  
  getGlowStyle: (color: string = "rgba(167, 139, 250, 0.15)") => ({
    boxShadow: `0 0 24px ${color}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
  }),

  getGlassClasses: () => 
    "backdrop-blur-xl bg-[var(--surface-glass)] border border-[var(--border-color)] shadow-2xl",
};
