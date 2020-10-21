const EsmWebpackPlugin = require( '@purtuga/esm-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const babel = require( './babel' );
const css = require( './css-modules' );
const paths = require( './paths' );

module.exports = ( _, argv ) => {
  const cssModuleNames = css.getCssModuleNames( argv.mode );

  return {
    entry: {
      'component-library': paths.componentLibrary,
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
      filename: 'lab-blocks.js',
      library: 'gpalabBlocks',
      libraryTarget: 'var',
      path: `${paths.componentLibrary}/lib`,
    },
    plugins: [
      new EsmWebpackPlugin(),
      new MiniCssExtractPlugin( {
        filename: 'lab-blocks.css',
      } ),
    ],
    resolve: {
      extensions: [
        '*', '.js', '.jsx',
      ],
    },
  };
};
