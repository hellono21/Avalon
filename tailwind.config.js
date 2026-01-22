/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f4c025",
        "primary-dark": "#cda11d",
        "primary-hover": "#d9a818",
        evil: "#ef4444",
        good: "#258cf4",
        success: "#0df20d",
        "background-light": "#f8f8f5",
        "background-dark": "#181611",
        "surface-dark": "#221e10",
        "stone-dark": "#1a1814",
      },
      fontFamily: {
        display: ["Noto Serif SC", "Plus Jakarta Sans", "serif"],
        sans: ["Noto Sans SC", "Plus Jakarta Sans", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(244, 192, 37, 0.2)",
        "glow-blue": "0 0 30px -5px rgba(37, 140, 244, 0.5)",
        "glow-red": "0 0 30px -5px rgba(239, 68, 68, 0.5)",
        "glow-green": "0 0 40px -10px rgba(13, 242, 13, 0.5)",
      },
      backgroundImage: {
        "stone-texture":
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6KuKORaHMiOSPgMYm7aKtNHIjs-1T-E4dJQD5V--24HwuUwfwHjfbhUWOswYg3O3FSGIlfCB4ua6vP7Tw3b_sauFc25yFhxSjbJOpOUfWfkJva9IlrztGRe9-zdtGF_nsLFBqtTpipHhDlz40Y91B_pibK-9gjtyUgpok8OPPEgYE9hf_HHo2PvdgRXFo2nyh3HCn8aZVpJNIJ6XFJfVl5Ng_E6spJmd8Z4WIGeT_VI5-KKwY6JgiTmpr8cc176TAKJv6MPm1B4TT')",
      },
    },
  },
  plugins: [],
}