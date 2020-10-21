import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from 'library/Navigation/Navigation';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-navigation"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Navigation block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
