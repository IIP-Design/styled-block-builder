import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Enable React-Axe accessibility testing when the ENABLE_AXE constant is set to true and the build is not in production mode.
 *
 * @param {boolean} ENABLE_AXE   Whether or not to use React-Axe when compiling the bundle.
 */
export const axeInit = ENABLE_AXE => {
  if ( ENABLE_AXE && process.env.NODE_ENV !== 'production' ) {
    import( /* webpackChunkName: 'react-axe' */ '@axe-core/react' ).then( axe => {
      axe( React, ReactDOM, 1000 );
    } );
  }
};
