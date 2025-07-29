/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
      "xl-md": "1600px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        "scroll-track-light": "#f1f1f1",
        "scroll-thumb-light": "#3b82f6", // blue-500
        "scroll-track-dark": "#2a2a2a",
        "scroll-thumb-dark": "#60a5fa", // blue-400
      },
    },
    variants: {
      extend: {
        scrollbar: ["rounded", "dark"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
