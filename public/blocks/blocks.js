import React from 'react';
import ReactDOM from 'react-dom';

// Normalizer CSS should be included first to ensure a proper cascade
import './_shared/components/Normalizer/Normalizer.scss';
import 'styles/quill.scss';

/* eslint-disable import/no-unassigned-import */
// Blocks
import './article-feed';
import './hero';
import './navigation';
import './parallax';
import './quote-box';
import './resources';
import './slides';
import './stats';
import './text';
import './timeline';


// Run accessibility tests in development.
const ENABLE_AXE = false;

if ( ENABLE_AXE && process.env.NODE_ENV !== 'production' ) {
  // eslint-disable-next-line global-require, node/global-require
  const axe = require( '@axe-core/react' );

  axe( React, ReactDOM, 1000 );
}
/* eslint-enable import/no-unassigned-import */
