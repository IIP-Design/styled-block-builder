import React from 'react';
import ReactDOM from 'react-dom';

import Parallax from 'library/Parallax/Parallax';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-parallax"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Parallax block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
