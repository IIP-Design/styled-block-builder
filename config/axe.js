import React from 'react';
import ReactDOM from 'react-dom';

export const axeInit = ENABLE_AXE => {
  if ( ENABLE_AXE && process.env.NODE_ENV !== 'production' ) {
  // eslint-disable-next-line global-require, node/global-require
    const axe = require( '@axe-core/react' );

    axe( React, ReactDOM, 1000 );
  }
/* eslint-enable import/no-unassigned-import */
};
