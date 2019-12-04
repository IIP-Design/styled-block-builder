const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const paths = require( './paths' );

module.exports = {
  entry: {
    // 'gut-highlight': `${paths.gutenbergBlocks}/highlight`,
    'quote-box': `${paths.blocksFrontend}/quote-box`,
    'template-admin': `${paths.metaboxUI}/index.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    filename: 'gpalab-[name].js',
    path: paths.pluginDist
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: 'gpalab-[name].css'
    } )
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
