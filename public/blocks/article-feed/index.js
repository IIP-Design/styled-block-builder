import React from 'react';
import ReactDOM from 'react-dom';

import ArticleFeed from './ArticleFeed/ArticleFeed';

const divs = [...document.querySelectorAll( 'div[data-type="gpalab-article-feed"]' )];

if ( divs ) {
  divs.forEach( div => {
    ReactDOM.render( <ArticleFeed id={ div.dataset.id } />, div );
  } );
}
