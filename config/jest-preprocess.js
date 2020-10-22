const babel = require( './babel.js' );
const css = require( './css-modules' );

/**
 * Transforms CSS classnames in Jest mocked renders to match those expected in production.
 */
module.exports = require( 'babel-jest' ).createTransformer(
  babel.setBabelConfig( css.getCssModuleNames( 'production' ) ),
);
