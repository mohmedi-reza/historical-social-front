/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yekan: ["Yekan Bakh NoEn", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2563eb",
          "primary-content": "#ffffff",

          secondary: "#bfdbfe",
          "secondary-content": "#1e3a8a",

          accent: "#1d4ed8",
          "accent-content": "#ffffff",

          neutral: "#f3f4f6",
          "neutral-content": "#1f2937",

          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "base-content": "#1f2937",

          info: "#0ea5e9",
          "info-content": "#ffffff",

          success: "#059669",
          "success-content": "#ffffff",

          warning: "#f59e0b",
          "warning-content": "#ffffff",

          error: "#f43f5e",
          "error-content": "#ffffff",
        },
      },
      {
        dark: {
          primary: "#1e40af",
          "primary-content": "#f3f4f6",

          secondary: "#1e3a8a",
          "secondary-content": "#bfdbfe",

          accent: "#2563eb",
          "accent-content": "#f3f4f6",

          neutral: "#1f2937",
          "neutral-content": "#f3f4f6",

          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#e5e7eb",

          info: "#38bdf8",
          "info-content": "#f3f4f6",

          success: "#10b981",
          "success-content": "#f3f4f6",

          warning: "#facc15",
          "warning-content": "#1f2937",

          error: "#ef4444",
          "error-content": "#f3f4f6",
        },
      },
    ],
  },
  plugins: [require("daisyui","tailwind-scrollbar-hide")],
};
