import React from 'react';
import ReactDOM from 'react-dom';

export const axeInit = ENABLE_AXE => {
  if ( ENABLE_AXE && process.env.NODE_ENV !== 'production' ) {
    import( /* webpackChunkName: 'react-axe' */ '@axe-core/react' ).then( axe => {
      axe( React, ReactDOM, 1000 );
    } );
  }
};
