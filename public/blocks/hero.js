import React from 'react';
import ReactDOM from 'react-dom';

import Hero from 'library/Hero/Hero';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-hero"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Hero block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
