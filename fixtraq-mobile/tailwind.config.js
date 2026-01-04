/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        slate: {
          900: "#0F172A",
        },
        primary: {
          DEFAULT: "#0F172A",
        },
        accent: "#06B6D4",
      },
      fontFamily: {
        sans: ["System"],
      },
      borderRadius: {
        xl: 16,
      },
      shadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};


