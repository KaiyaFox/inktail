import type { Config } from "tailwindcss";
import {blackA, green, mauve, violet} from "@radix-ui/colors";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        // Define Radix-style size scale
        1: "4px",  // Radix size-1
        2: "8px",  // Radix size-2
        3: "12px", // Radix size-3
        4: "16px", // Radix size-4
        5: "20px", // Radix size-5
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
      },
    },
  },
  plugins: [],
};




export default config;
