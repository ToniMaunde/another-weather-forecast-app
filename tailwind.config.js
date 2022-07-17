module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "body": ["\"Inter Regular\""]
    },
    colors: {
      "light-background": "#FBFCF8",
      "light-primary": "#0D101F",
      "light-secondary": "#784F41",
      "light-tertiary": "#02040F",
      "dark-background": "#02040F",
      "dark-primary": "#FFD059",
      "dark-secondary": "#0D101F",
      "dark-tertiary": "#E5DADA",
      "white": "#FFFFFF",
      "red": "#DF066F",
      "green": "#6B8F71"
    },
    extend: {},
  },
  plugins: [],
}