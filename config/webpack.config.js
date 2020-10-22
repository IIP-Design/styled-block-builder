const css = require( './css-modules' );
const paths = require( './paths' );
const plugins = require( './plugins' );
const rules = require( './rules' );

module.exports = ( _, argv ) => {
  const cssModuleNames = css.getCssModuleNames( argv.mode );

  return {
    entry: {
      'block-frontend': paths.blocksFrontend,
      'block-admin': paths.metaboxUI,
      'site-state': [`${paths.siteSpecificStyles}/state.scss`],
    },
    module: {
      rules: rules.setRules( cssModuleNames ),
    },
    output: {
      filename: argv.mode === 'development' ? 'dev-[name].js' : 'gpalab-[name].js',
      path: paths.pluginDist,
    },
    plugins: plugins.loadPlugins( argv.mode ),
    resolve: rules.resolve,
  };
};
