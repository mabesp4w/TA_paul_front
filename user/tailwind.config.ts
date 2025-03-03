/** @format */

import type { Config } from "tailwindcss";
import colors from "./src/utils/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        linear:
          "linear-gradient(77deg, rgba(10,38,64,1) 16%, rgba(28,61,91,1) 79%)",
        "1": "url('/images/bg/1.png')",
        "2": "url('/images/bg/2.png')",
        "3": "url('/images/bg/3.png')",
        "4": "url('/images/bg/4.jpg')",
      },
      colors,
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
