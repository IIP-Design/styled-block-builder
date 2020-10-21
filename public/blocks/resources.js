import React from 'react';
import ReactDOM from 'react-dom';

import Resources from 'library/Resources/Resources';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-resources"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assetsUrl } = window.gpalabBlockFront;

    ReactDOM.render(
      <Resources assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
