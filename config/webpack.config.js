const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const babel = require( './babel' );
const paths = require( './paths' );
const plugins = require( './plugins' );

module.exports = ( _, argv ) => {
  const cssModuleNames
    = argv.mode === 'development' ? '[name]-[local]' : 'gpalab-[local]-[hash:base64:5]';

  return {
    entry: {
      'block-frontend': `${paths.blocksFrontend}/blocks`,
      'block-admin': paths.metaboxUI,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babel.setBabelConfig( cssModuleNames ),
          },
        },
        {
          include: /\.module\.(sa|sc|c)ss$/,
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: cssModuleNames,
                  mode: 'local',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          exclude: /\.module\.(sa|sc|c)ss$/,
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
          ],
        },
      ],
    },
    output: {
      filename: argv.mode === 'development' ? 'dev-[name].js' : 'gpalab-[name].js',
      path: paths.pluginDist,
    },
    plugins: plugins.loadPlugins( argv.mode ),
    resolve: {
      extensions: [
        '*', '.js', '.jsx',
      ],
    },
  };
};
