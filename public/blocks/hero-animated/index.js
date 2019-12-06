import React from 'react';
import ReactDOM from 'react-dom';

import HeroAnimated from './HeroAnimated/HeroAnimated';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-hero-animated"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <HeroAnimated id={ div.dataset.id } />, div );
  } );
}
