/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F7",
        ink: "#222222",
        muted: "#666666",
        powder: "#D8B7AB",
        beige: "#E8DCCB",
        line: "#E7E0D8",
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "Instrument Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(42, 34, 28, 0.06)",
      },
    },
  },
  plugins: [],
};
