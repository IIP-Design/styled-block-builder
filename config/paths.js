const path = require( 'path' );
const fs = require( 'fs' );

// Gets the root directory for the plugin
const pluginDirectory = fs.realpathSync( process.cwd() );

// Resolves relative paths from the plugin root
const resolvePlugin = relativePath => path.resolve( pluginDirectory, relativePath );

module.exports = {
  blocksFrontend: resolvePlugin( 'public/blocks' ),
  gutenbergBlocks: resolvePlugin( 'admin/gut-blocks' ),
  metaboxUI: resolvePlugin( 'admin/metabox/ui' ),
  pluginAdmin: resolvePlugin( 'admin' ),
  pluginAssets: resolvePlugin( 'static/assets' ),
  pluginDist: resolvePlugin( 'dist' ),
  pluginHTML: resolvePlugin( 'static/index.html' ),
  pluginPackage: resolvePlugin( 'package.json' ),
  pluginRoot: resolvePlugin( './' ),
  siteSpecificStyles: resolvePlugin( 'styles/sites' ),
};
