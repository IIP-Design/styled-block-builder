import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation/Navigation';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-navigation"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Navigation id={ div.dataset.id } />, div );
  } );
}
