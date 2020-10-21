import React from 'react';
import ReactDOM from 'react-dom';

import Resources from 'library/Resources/Resources';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-resources"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assets } = window.gpalabBlockFront;

    ReactDOM.render(
      <Resources assets={ assets } block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
