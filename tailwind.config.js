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
      "dark-background": "#282B38",
      "dark-primary": "#A0A9CF",
      "dark-secondary": "#313545",
      "dark-tertiary": "#E5DADA",
      "white": "#FFFFFF",
      "red": "#DF066F",
      "green": "#517E59"
    },
    extend: {},
  },
  plugins: [],
}