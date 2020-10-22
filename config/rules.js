const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const babel = require( './babel' );

/**
 * Determines loaders for JavaScript files.
 *
 * @param {string} cssModuleNames   The desired scoped CSS class name format.
 * @returns {Object}                A ruleset for JS files.
 */
const js = cssModuleNames => ( {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: babel.setBabelConfig( cssModuleNames ),
  },
} );

/**
 * Determines loaders for CSS module files.
 *
 * @param {string} cssModuleNames   The desired scoped CSS class name format.
 * @returns {Object}                A ruleset for CSS module files.
 */
const cssModules = cssModuleNames => ( {
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
} );

/**
 * Determines loaders for regular CSS files.
 *
 * @var {Object} css A ruleset for CSS module files.
 */
const css = {
  exclude: /\.module\.(sa|sc|c)ss$/,
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
  ],
};

/**
 * Combines the file-type specific rulesets into a rules array.
 *
 * @returns {Object} A ruleset for all file types.
 */
const setRules = cssModuleNames => ( [
  js( cssModuleNames ), cssModules( cssModuleNames ), css,
] );

/**
 * Determines the resolve field in the Webpack config.
 *
 * @returns {Object} A list of file extensions to attempt to resolve.
 */
const resolve = {
  extensions: [
    '*', '.js', '.jsx',
  ],
};

module.exports = {
  resolve,
  setRules,
};
