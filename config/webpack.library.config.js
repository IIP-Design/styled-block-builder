const css = require( './css-modules' );
const paths = require( './paths' );
const plugins = require( './plugins' );
const rules = require( './rules' );

module.exports = ( _, argv ) => {
  const cssModuleNames = css.getCssModuleNames( argv.mode );

  return {
    entry: {
      'component-library': paths.componentLibrary,
    },
    module: {
      rules: rules.setRules( cssModuleNames ),
    },
    output: {
      filename: 'lab-blocks.js',
      library: 'gpalabBlocks',
      libraryTarget: 'var',
      path: `${paths.componentLibrary}/lib`,
    },
    plugins: plugins.loadPlugins( argv.mode, 'library' ),
    resolve: rules.resolve,
  };
};
