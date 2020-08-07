const path = require('path')

module.exports = {
  plugins: {
    'postcss-prepend-imports': {
      files: [path.join(__dirname, 'src', 'styles', 'vars.css')]
    },
    'postcss-import': {
      path: path.join(__dirname, 'src')
    },
    'postcss-nested-ancestors': {},
    'postcss-nested': {},
    'postcss-extend': {},
    'postcss-preset-env': { stage: 0 },
    'postcss-reporter': {},
    'postcss-browser-reporter': {}
  }
}
