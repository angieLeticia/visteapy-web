import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#FAF7F2",
        ink: "#0F0F0F",
        fog: "#E8E4DD",
        violet: "#7C3AED",
        "violet-dark": "#5B21B6",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      lineHeight: {
        editorial: "1.7",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
export default config;
