/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Geist", "Microsoft YaHei", "PingFang SC", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "SFMono-Regular", "monospace"]
      },
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#101010",
          800: "#161616",
          700: "#222222",
          600: "#303030"
        },
        signal: {
          blue: "#0099ff",
          blueSoft: "rgba(0,153,255,0.16)",
          lime: "#cbff00"
        }
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0,0,0,0.46)",
        blue: "0 0 0 1px rgba(0,153,255,0.24), 0 22px 70px rgba(0,153,255,0.12)"
      }
    }
  },
  plugins: []
};
