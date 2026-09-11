/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        folha: {
          50: "#eef6f1",
          200: "#bcdcc9",
          500: "#2e7d4f",
          700: "#1d5c3a",
          900: "#123a25",
        },
      },
    },
  },
  plugins: [],
};
