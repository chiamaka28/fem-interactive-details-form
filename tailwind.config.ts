import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
      },
    },
   colors : {
    white : "hsl(0, 0%, 100%)",
    lightGrayishViolet : " hsl(270, 3%, 87%)",
    darkGrayishViolet : "hsl(279, 6%, 55%)",
    darkViolet : "hsl(278, 68%, 11%)",
    red : "hsl(0, 100%, 66%)",
    firstGradient : "hsl(249, 99%, 64%)",
    secondGradient : "hsl(278, 94%, 30%)"
   },
  },
  plugins: [],
};
export default config;
