import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#050509",
        foreground: "#f9fafb",
        muted: {
          DEFAULT: "#111827",
          foreground: "#9ca3af",
        },
        border: "#1f2933",
        input: "#111827",
        ring: "#ff5b2e",
        primary: {
          DEFAULT: "#ff5b2e", // neon orange
          foreground: "#050509",
        },
        secondary: {
          DEFAULT: "#00e0ff", // neon cyan
          foreground: "#050509",
        },
        accent: {
          DEFAULT: "#ff2eb8", // hot pink
          foreground: "#050509",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f9fafb",
        },
      },
      borderRadius: {
        lg: "1.25rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.sans],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 91, 46, 0.45)",
      },
      backgroundImage: {
        "noise-soft":
          "radial-gradient(circle at top, rgba(255,91,46,0.18), transparent 55%), radial-gradient(circle at bottom, rgba(0,224,255,0.18), transparent 55%), radial-gradient(circle at left, rgba(255,46,184,0.18), transparent 55%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
