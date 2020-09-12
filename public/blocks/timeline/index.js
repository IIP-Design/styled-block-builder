import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from './Timeline/Timeline';

// Run accessibility tests in development.
if ( process.env.NODE_ENV !== 'production' ) {
  // eslint-disable-next-line global-require, node/global-require
  const axe = require( 'react-axe' );

  axe( React, ReactDOM, 1000 );
}

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-timeline"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Timeline id={ div.dataset.id } />, div );
  } );
}
