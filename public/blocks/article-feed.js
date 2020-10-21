import React from 'react';
import ReactDOM from 'react-dom';

import ArticleFeed from 'library/ArticleFeed/ArticleFeed';

import { getBlockById } from './utils/blocks';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-article-feed"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render(
      <ArticleFeed block={ getBlockById( div.dataset.id ) } id={ div.dataset.id } />,
      div,
    );
  } );
}
