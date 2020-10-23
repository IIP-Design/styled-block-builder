import React from 'react';
import propTypes from 'prop-types';

import CDPFeed from '../_shared/components/CDPFeed/CDPFeed';
import Normalizer from '../_shared/components/Normalizer/Normalizer';

import { backgroundStyle } from '../_shared/utils/background-style';

import './ArticleFeed.module.scss';

const ArticleFeed = ( { block, id } ) => {
  if ( block ) {
    const {
      articles,
      blockBackground,
      fullWidth,
      subtitle,
      textColor,
      title,
    } = block;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ backgroundStyle( blockBackground ) } styleName="bg">
          <div styleName="content">
            { title && (
              <h2 className="gpalab-site-specific" style={ { color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            { subtitle && (
              <h3 className="gpalab-site-specific" style={ { color: textColor } } styleName="subtitle">
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
  block: propTypes.shape( {
    articles: propTypes.array,
    blockBackground: propTypes.string,
    fullWidth: propTypes.bool,
    subtitle: propTypes.string,
    textColor: propTypes.string,
    title: propTypes.string,
  } ),
  id: propTypes.string,
};

export default ArticleFeed;
