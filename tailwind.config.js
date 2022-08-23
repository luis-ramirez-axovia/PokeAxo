/** @type {import('tailwindcss').Config} */
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
      }
    },
  },
  plugins: [],
}
