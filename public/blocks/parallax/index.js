import React from 'react';
import ReactDOM from 'react-dom';

import Parallax from './Parallax/Parallax';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-parallax"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <Parallax id={ div.dataset.id } />, div );
  } );
}
