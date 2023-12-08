/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
    dropShadow: {
      gray: "0px 4px 4px rgba(159, 159, 159, 0.25)",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
