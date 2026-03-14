import type { Config } from "tailwindcss";

/**
 * Tailwind config — neutral monochrome palette
 * Clean grays + charcoal accents
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* Neutral monochrome palette — true blacks + warm grays */
      colors: {
        bg: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5",     /* light warm gray */
          card: "#F0F0F0",          /* neutral card bg */
          dark: "#171717",          /* true dark — no blue tint */
        },
        text: {
          primary: "#0A0A0A",       /* near-black — no blue tint */
          secondary: "#525252",     /* neutral gray */
          muted: "#A3A3A3",         /* neutral mid-gray */
          "on-dark": "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0A0A0A",       /* near-black — monochrome accent */
          hover: "#333333",
          soft: "#F5F5F5",
          light: "#E5E5E5",         /* neutral light gray */
        },
        border: {
          DEFAULT: "#E5E5E5",
          subtle: "#EBEBEB",        /* soft neutral border */
        },
      },
      /* Font families — same as V1 */
      fontFamily: {
        heading: ['"Sora"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
