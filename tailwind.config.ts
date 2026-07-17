import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#3D2C29",
        rose: "#FFE8E0",
        peach: "#FFD4C4",
        cream: "#FAFAF8",
        accent: "#D97A5E",
        line: "#EBD5C8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
