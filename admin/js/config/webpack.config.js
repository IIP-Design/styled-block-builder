const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const paths = require( './paths' );

module.exports = {
  entry: {
    // admin: paths.interfaceIndex,
    // blockSettings: `${paths.interfaceSrc}/blockSettings.js`,
    // embeds: paths.embedsIndex,
    // front: `${paths.blocksSrc}/front.js`,
    animated: paths.animatedIndex
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: paths.appDist,
    publicPath: '/',
    filename: 'gcx-[name].min.js'
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: 'gcx-[name].min.css'
    } )
  ],
  resolve: {
    extensions: [
      '*', '.js', '.jsx'
    ]
  }
};
