import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/component/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      lightGrey: "#9E9E9E",
      black: "#000000",
      dark: "#262626",
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
      primaryColor: "#59e4a8",
      secondaryColor: "#13a164",
      thirdColor: "#75f5be",
      secondaryBlue: "#2C6EEF",
      secondaryGreen: "#32AB78",
      secondaryRed: "#BC434A",
      brighterBlue:"#79A6FF",
      brighterGreen:"#7DEDB2",
      brighterRed:"#FF7A85",
      primary:"#6A7BFF",
      secondary:"#008cba",
      blue200:"rgb(191 219 254)",
      pink200:"rgb(255 191 219)",
      contentBG: "#f7efcc", 
      offStatus:"#ffa500",
      darkBlue:"#052331",
      transparent: "rgba(0,0,0,0)",
    },
    backgroundImage: {
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
