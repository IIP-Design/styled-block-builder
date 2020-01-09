const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const css = mode =>
  new MiniCssExtractPlugin({
    filename: mode === 'development' ? 'dev-[name].css' : 'gpalab-[name].css'
  });

const analyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  generateStatsFile: true,
  openAnalyzer: false,
  reportFilename: 'bundleStats.html',
  statsFilename: 'bundleStats.json'
});

const loadPlugins = mode => {
  if (mode === 'development') {
    return [css(mode)];
  }

  return [analyzer, css(mode)];
};

module.exports = {
  loadPlugins
};
