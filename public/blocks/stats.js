import React from 'react';
import ReactDOM from 'react-dom';

import Stats from 'library/Stats/Stats';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-stats"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assetsUrl } = window.gpalabBlockFront;

    ReactDOM.render(
      <Stats assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
