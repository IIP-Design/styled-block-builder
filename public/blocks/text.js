import React from 'react';
import ReactDOM from 'react-dom';

import Text from 'library/Text/Text';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-text"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Text block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
