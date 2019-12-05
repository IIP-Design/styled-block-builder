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
        include: /\.module\.(sa|sc|c)ss$/,
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'gpalab-[local]-[hash:base64:5]',
                mode: 'local'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        exclude: /\.module\.(sa|sc|c)ss$/,
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
