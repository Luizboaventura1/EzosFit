/** @type {import('tailwindcss').Config} */
export default {
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
        "charcoal": "#303030",
        "medium-gray": "#ABABAB",
        "charcoal-gray": "#484848",
        "dark-charcoal": "#191919",
        "almost-black": "#0C0C0C",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
