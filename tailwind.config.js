/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fffaf7",
        blush: "#fff0f5",
        beige: "#ead8c8",
        rose: {
          100: "#f8c8d8",
          400: "#ec7fa9",
          600: "#c94f7c",
        },
        ink: "#2b2226",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(83, 46, 58, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
