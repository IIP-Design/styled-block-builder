const babel = require( './babel.js' );
const css = require( './css-modules' );

module.exports = require( 'babel-jest' ).createTransformer(
  babel.setBabelConfig( css.getCssModuleNames( 'production' ) ),
);
