import React from 'react';
import ReactDOM from 'react-dom';

import LinkList from 'library/LinkList/LinkList';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-link-list"]' )];

if ( divs ) {
  divs.forEach( div => {
    const { assetsUrl } = window.gpalabBlockFront;

    ReactDOM.render(
      <LinkList assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id ) } />,
      div,
    );
  } );
}
