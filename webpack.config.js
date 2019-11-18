module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  watch: true
}
