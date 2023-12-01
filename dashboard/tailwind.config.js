/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: {
          primary: "#212529",
          secondary: "#0D1013",
          trinary: "#495057",
        },
        blue: {
          default: "#017EA7",
          dark: "#003459",
          light: "#06B6D4",
          text: "#00A8E8",
        },

        white: "#FFFFFF",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
  },
  plugins: [],
};
