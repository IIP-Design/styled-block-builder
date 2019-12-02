const paths = require( './paths' );

module.exports = {
  entry: `${paths.blocksFrontend}/quote-box`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: 'quote-box.js',
    path: paths.pluginDist
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
