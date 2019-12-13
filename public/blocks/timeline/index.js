import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from './Timeline/Timeline';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-timeline"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Timeline id={ div.dataset.id } />, div );
  } );
}
