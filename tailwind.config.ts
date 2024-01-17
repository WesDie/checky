import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      red: "#cf0000",
      green: "#017d01",

      dark: "var(--dark-color)",
      white: "var(--white-color)",

      "primary-bg": "var(--primary-bg-color)",
      "secondary-bg": "var(--secondary-bg-color)",
      "tertiary-bg": "var(--tertiary-bg-color)",
      "quaternary-bg": "var(--quaternary-bg-color)",

      "text-color": "var(--text-color)",
      "secondary-text": "var(--secondary-text-color)",

      "highlight-color": "var(--highlight-color)",
      "highlight-dark": "var(--highlight-dark-color)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
