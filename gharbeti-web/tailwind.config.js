/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2c4e",
          dark: "#0e2f4f",
          light: "#2a3c5e",
        },
        brand: {
          green: "#27ae60",
          orange: "#F59A73",
          blue: "#3498db",
          red: "#e74c3c",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
