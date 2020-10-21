import React from 'react';
import ReactDOM from 'react-dom';

import LinkList from 'library/LinkList/LinkList';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-link-list"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <LinkList block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
