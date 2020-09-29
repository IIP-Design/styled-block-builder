import React from 'react';
import ReactDOM from 'react-dom';

import LinkList from './LinkList/LinkList';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-link-list"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <LinkList id={ div.dataset.id } />, div );
  } );
}
