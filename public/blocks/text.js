import React from 'react';
import ReactDOM from 'react-dom';

import Text from 'library/Text/Text';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-text"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assetsUrl } = window.gpalabBlockFront;

    ReactDOM.render(
      <Text assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
