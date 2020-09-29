import React from 'react';
import ReactDOM from 'react-dom';

import Slides from './Slides/Slides';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-slides"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Slides id={ div.dataset.id } />, div );
  } );
}
