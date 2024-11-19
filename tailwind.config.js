/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#006CFA",
        "light-gray": "#E9E9E9",
        "charcoal": "#262626",
        "medium-gray": "#ABABAB",
        "dark-charcoal": "#191919",
        "almost-black": "#0C0C0C",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
