import React from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

const ArticleFeed = ( { id } ) => {
  const { meta } = window[`gpalabArticleFeed${id}`];

  if ( meta ) {
    return (
      <Normalizer>
        <CDPFeed id={ id } items={ meta.articles } />
      </Normalizer>
    );
  }

  return null;
};

ArticleFeed.propTypes = {
  id: propTypes.string
};

export default ArticleFeed;
