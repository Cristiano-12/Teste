import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#F6F8FB",
          surface: "#FFFFFF",
          subtle: "#F9FAFC",
          sidebar: "#111827",
          sidebarHover: "#1F2937",
          sidebarSelected: "#273449",
          text: "#111827",
          secondary: "#667085",
          muted: "#98A2B3",
          border: "#E5E7EB",
          separator: "#EEF0F3",
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          blueSoft: "#EFF6FF",
          positive: "#16A34A",
          positiveBg: "#F0FDF4",
          warning: "#D97706",
          warningBg: "#FFFBEB",
          critical: "#DC2626",
          criticalBg: "#FEF2F2",
          neutral: "#64748B"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.04)",
        drawer: "0 24px 48px rgba(15, 23, 42, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
