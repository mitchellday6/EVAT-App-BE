// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  animation: {
    'fade-in': 'fadeIn 0.4s ease-out',
    'fade-in-up': 'fadeInUp 0.5s ease-out',
    'slide-in-left': 'slideInLeft 0.3s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    fadeInUp: {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    slideInLeft: {
      '0%': { opacity: 0, transform: 'translateX(-100%)' },
      '100%': { opacity: 1, transform: 'translateX(0)' },
    },
  },
},
  },
  plugins: [],
};

export default config;
