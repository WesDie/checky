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
      white: "#FFF",
      dark: "#000",
      "primary-bg": "#1B1B1B",
      "secondary-bg": "#131313",
      "tertiary-bg": "#363636",
      "quaternary-bg": "#252525",
      "secondary-text": "#595959",
      "highlight-color": "#FF6B00",
      "highlight-dark": "#6C4521",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
