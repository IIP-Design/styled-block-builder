import React from 'react';
import ReactDOM from 'react-dom';

import Slides from './Slides/Slides';

// Run accessibility tests in development.
if ( process.env.NODE_ENV !== 'production' ) {
  // eslint-disable-next-line global-require
  const axe = require( 'react-axe' );

  axe( React, ReactDOM, 1000 );
}

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-slides"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Slides id={ div.dataset.id } />, div );
  } );
}
