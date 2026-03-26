import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08080F",
        surface: "#0F0F1A",
        border: "#1E1E2E",
        primary: "#7C3AED",
        "primary-light": "#8B5CF6",
        cyan: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        text: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #7C3AED, 0 0 10px #7C3AED" },
          "100%": {
            boxShadow:
              "0 0 10px #7C3AED, 0 0 30px #7C3AED, 0 0 60px #7C3AED",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

