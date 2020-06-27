const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const analyzer = new BundleAnalyzerPlugin( {
  analyzerMode: 'static',
  generateStatsFile: true,
  openAnalyzer: false,
  reportFilename: 'bundleStats.html',
  statsFilename: 'bundleStats.json',
} );

const css = mode => new MiniCssExtractPlugin( {
  filename: mode === 'development' ? 'dev-[name].css' : 'gpalab-[name].css',
} );

const fixStyle = new FixStyleOnlyEntriesPlugin();

const loadPlugins = mode => {
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
