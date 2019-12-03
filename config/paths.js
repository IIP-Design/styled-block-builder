const path = require( 'path' );
const fs = require( 'fs' );

// Gets the root directory for the plugin
const pluginDirectory = fs.realpathSync( process.cwd() );

// Resolves relative paths from the Pluginlication root
const resolvePlugin = relativePath => path.resolve( pluginDirectory, relativePath );

module.exports = {
  pluginAdmin: resolvePlugin( 'admin' ),
  pluginAssets: resolvePlugin( 'static/assets' ),
  pluginDist: resolvePlugin( 'dist' ),
  pluginHTML: resolvePlugin( 'static/index.html' ),
  pluginPackage: resolvePlugin( 'package.json' ),
  blocksFrontend: resolvePlugin( 'public/blocks' ),
  gutenbergBlocks: resolvePlugin( 'admin/js/blocks' )
};
