import React from 'react';
import ReactDOM from 'react-dom';

import QuoteBox from './QuoteBox/QuoteBox';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-quote-box"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <QuoteBox id={ div.dataset.id } />, div );
  } );
}
