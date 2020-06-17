import React from 'react';
import ReactDOM from 'react-dom';

import Metabox from './components/Metabox/Metabox';

// Run accessibility tests in development.
if ( process.env.NODE_ENV !== 'production' ) {
  // eslint-disable-next-line global-require
  const axe = require( 'react-axe' );

  axe( React, ReactDOM, 1000 );
}

ReactDOM.render( <Metabox />, document.getElementById( 'gpalab-blocks-metabox' ) );
