const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.test-test': {
          'backgroudColor': 'black',
        },
      })
    })
  ]
}