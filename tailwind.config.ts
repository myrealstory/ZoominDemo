import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      lightGrey: "#9E9E9E",
      black: "#000000",
      primaryGold: "#8D7A5B",
      deepPrimaryGold: "#705B38",
      primaryGold1: "#E8E4DE",
      primaryGold75: "rgba(141, 122, 91, 0.75)",
      primaryGold15: "#DDD7CE",
      primaryGold2: "#D1CABD",
      primaryGold3: "#BBAF9D",
      primaryGold4: "#A4957C",
      primaryGold05: "#F4F2EF",
      white: "#ffffff",
    },
    backgroundImage:{
      MainBG: "url('../../../images/bg.png')",
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
