import React from 'react';
import ReactDOM from 'react-dom';

import Hero from 'library/Hero/Hero';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-hero"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assetsUrl } = window.gpalabBlockFront;

    ReactDOM.render(
      <Hero assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
