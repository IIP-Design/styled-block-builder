import React from 'react';
import ReactDOM from 'react-dom';

import Stats from './Stats/Stats';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-stats"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Stats id={ div.dataset.id } />, div );
  } );
}
