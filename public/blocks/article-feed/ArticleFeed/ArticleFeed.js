import React from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { backgroundStyle } from 'blocks/_shared/utils/background-style';

import './ArticleFeed.module.scss';

const ArticleFeed = ( { id } ) => {
  const { meta } = window[`gpalabArticleFeed${id}`];

  if ( meta ) {
    const { blockBackground, fullWidth, subtitle, textColor, title, articles } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ backgroundStyle( blockBackground ) } styleName="bg">
          <div styleName="content">
            { title && (
              <h2 style={ { color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            { subtitle && (
              <h3 style={ { color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <CDPFeed id={ id } items={ articles } />
          </div>
        </div>
      </Normalizer>
    );
  }

  return null;
};

ArticleFeed.propTypes = {
  id: propTypes.string,
};

export default ArticleFeed;
