import React from 'react';
import ReactDOM from 'react-dom';

import Hero from './Hero/Hero';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-hero"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Hero id={ div.dataset.id } />, div );
  } );
}
