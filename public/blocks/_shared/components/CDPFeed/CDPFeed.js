import React from 'react';
import propTypes from 'prop-types';

import CDPFeedItem from './CDPFeedItem';

import './CDPFeed.scss';

const CDPFeed = ( { id, items } ) => {
  let feedType = '';
  if ( items.length === 1 ) {
    feedType = 'single';
  }

  if ( items.length === 3 ) {
    feedType = 'three';
  }

  return (
    <div className="cdp-feed-container">
      <div className={ `cdp-feed ${feedType}` } id={ `cdp-feed-${id}` }>
        { items.map( item => (
          <CDPFeedItem id={ item.id } key={ item.id } source={ item.source } />
        ) ) }
      </div>
    </div>
  );
};

CDPFeed.propTypes = {
  id: propTypes.string,
  items: propTypes.array
};

export default CDPFeed;
