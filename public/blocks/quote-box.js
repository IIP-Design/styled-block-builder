import React from 'react';
import ReactDOM from 'react-dom';

import QuoteBox from 'library/QuoteBox/QuoteBox';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-quote-box"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <QuoteBox block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
