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
  name: "Obsidian Neon Glow",
  colors: {
    background: "#07090e",
    surface: "#0e131f",
    surfaceHover: "#151d30",
    surfaceGlass: "rgba(14, 19, 31, 0.72)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHighlight: "rgba(99, 102, 241, 0.35)",
    primary: "#6366f1", // Indigo
    primaryGlow: "rgba(99, 102, 241, 0.25)",
    secondary: "#06b6d4", // Cyan
    accent: "#8b5cf6", // Violet
    accentGlow: "rgba(139, 92, 246, 0.3)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
  },
};

export const themeService = {
  getTheme: () => defaultTheme,
  
  getAccentGradient: () => "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
  
  getGlowStyle: (color: string = "rgba(99, 102, 241, 0.15)") => ({
    boxShadow: `0 0 24px ${color}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
  }),

  getGlassClasses: () => 
    "backdrop-blur-xl bg-[var(--surface-glass)] border border-[var(--border-color)] shadow-2xl",
};
