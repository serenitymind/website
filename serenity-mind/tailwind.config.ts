import type { Config } from "tailwindcss";

/**
 * Tailwind config — V2 purple/lilac palette
 * Matches the Serenity Mind V2 Pencil design
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* V2 color palette — purple/lilac + clean whites */
      colors: {
        bg: {
          primary: "#FFFFFF",
          secondary: "#F9F7FE",     /* soft lavender tint */
          card: "#F5F0FF",          /* light purple card bg */
          dark: "#5B21B6",          /* deep purple for CTA */
        },
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#9CA3AF",
          "on-dark": "#FFFFFF",
        },
        accent: {
          DEFAULT: "#7C3AED",       /* primary purple */
          hover: "#6D28D9",
          soft: "#F5F0FF",
          light: "#E9D5FF",         /* lighter purple for subtle fills */
        },
        border: {
          DEFAULT: "#E5E7EB",
          purple: "#EDE9F6",        /* subtle purple border */
        },
      },
      /* Font families — same as V1 */
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
