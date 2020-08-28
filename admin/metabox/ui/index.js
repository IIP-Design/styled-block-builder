import React from 'react';
import ReactDOM from 'react-dom';

import Metabox from './components/Metabox/Metabox';

import 'react-quill/dist/quill.snow.css';
import 'styles/quill.scss';

// Run accessibility tests in development.
// if ( process.env.NODE_ENV !== 'production' ) {
//   // eslint-disable-next-line global-require
//   const axe = require( 'react-axe' );

//   axe( React, ReactDOM, 1000 );
// }

ReactDOM.render( <Metabox />, document.getElementById( 'gpalab-blocks-metabox' ) );
