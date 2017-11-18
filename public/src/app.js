module.exports = {
  entry: {
    app: './public/src/app.js'
  },
  output: {
    filename: '[name].dist.js',
    path: './public/build/'
  },
  module: {
    loader: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          preset: 'es2015'
        }
      }
    ]
  }
}