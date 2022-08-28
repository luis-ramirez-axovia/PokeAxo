/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#919191'
      },
      fontFamily: {
        'exo2': ['Exo2', 'sans-serif'],
        'silkscreen': ['Silkscreen', 'cursive']
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      flex: {
        '100': '1 1 100%',
        '1-0-50': '1 0 50%'
      },
    },
  },
  plugins: [
    require('./plugin/tagsColors.js'),
  ],
}
