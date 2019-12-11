const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const babel = require( './babel' );
const paths = require( './paths' );

module.exports = ( _, argv ) => {
  const cssModuleNames =
    argv.mode === 'development' ? '[name]-[local]' : 'gpalab-[local]-[hash:base64:5]';

  return {
    entry: {
      // 'gut-highlight': `${paths.gutenbergBlocks}/highlight`,
      'template-frontend': `${paths.blocksFrontend}/blocks`,
      'template-admin': paths.metaboxUI
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babel.setBabelConfig( cssModuleNames )
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
                  localIdentName: cssModuleNames,
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
      filename: argv.mode === 'development' ? 'dev-[name].js' : 'gpalab-[name].js',
      path: paths.pluginDist
    },
    plugins: [
      new MiniCssExtractPlugin( {
        filename: argv.mode === 'development' ? 'dev-[name].css' : 'gpalab-[name].css'
      } )
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx']
    }
  };
};
