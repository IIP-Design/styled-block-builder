import React from 'react';
import ReactDOM from 'react-dom';

import Slides from 'library/Slides/Slides';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-slides"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Slides block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
