const path = require('path')

module.exports = {
  entry: "./app.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  watch: true
}
