import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from 'library/Timeline/Timeline';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-timeline"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <Timeline block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
