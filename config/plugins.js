const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const EsmWebpackPlugin = require( '@purtuga/esm-webpack-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * Configures the Webpack bundle analyzer reports.
 *
 * @returns {BundleAnalyzerPlugin} A configured instance of the Webpack bundle analyzer plugin.
 */
const analyzer = new BundleAnalyzerPlugin( {
  analyzerMode: 'static',
  generateStatsFile: true,
  openAnalyzer: false,
  reportFilename: 'bundleStats.html',
  statsFilename: 'bundleStats.json',
} );

/**
 * Provides appropriate prefix to bundled CSS file depending on environment.
 *
 * @param {string} mode   One of 'production' or 'development' depending on what type of build is run.
 * @param {string} config Optional flag for special configuration types.
 * @returns {MiniCssExtractPlugin} An instance of the CSS extract plugin with the expect filename setting.
 */
const css = ( mode, config ) => {
  if ( config === 'library' ) {
    return new MiniCssExtractPlugin( {
      filename: 'lab-blocks.css',
    } );
  }

  return new MiniCssExtractPlugin( {
    filename: mode === 'development' ? 'dev-[name].css' : 'gpalab-[name].css',
  } );
};

/**
 * Outputs bundle as an ESM library.
 */
const esm = new EsmWebpackPlugin();

/**
 * Deletes unneeded JavaScript bundle for CSS-only builds.
 */
const fixStyle = new FixStyleOnlyEntriesPlugin();

/**
 * Loads the appropriate Webpack plugins depending on the build environment.
 *
 * @param {string} mode   One of 'production' or 'development' depending on what type of build is run.
 * @param {string} config Optional flag for special configuration types.
 * @returns {Array}      A list of configured Webpack plugin instances.
 */
const loadPlugins = ( mode, config ) => {
  if ( config === 'library' ) {
    return [
      analyzer, css( mode, config ), esm,
    ];
  }

  if ( mode === 'development' ) {
    return [css( mode ), fixStyle];
  }

  return [
    analyzer, css( mode ), fixStyle,
  ];
};

module.exports = {
  loadPlugins,
};
