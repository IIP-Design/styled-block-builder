import React from 'react';
import ReactDOM from 'react-dom';

import Resources from './Resources/Resources';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-resources"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Resources id={ div.dataset.id } />, div );
  } );
}
