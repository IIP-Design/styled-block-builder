const path = require( 'path' );
const fs = require( 'fs' );

const appDirectory = fs.realpathSync( process.cwd() );
const resolveApp = (relativePath) => path.resolve( appDirectory, relativePath );

module.exports = {
  appDist: resolveApp( 'dist' ),
  appPackageJson: resolveApp( 'package.json' ),
  appPublic: resolveApp( 'public' ),
  animatedIndex: resolveApp( 'blocks/animated.js' ),
  blocksSrc: resolveApp( 'blocks' ),
  dotenv: resolveApp( '.env' )
};
