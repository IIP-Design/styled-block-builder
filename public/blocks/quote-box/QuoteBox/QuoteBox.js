import React from 'react';
import propTypes from 'prop-types';

import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import {
  backgroundStyle,
  setBackgroundImage,
  setText,
} from 'blocks/_shared/utils/background-style';

import './QuoteBox.module.scss';

const QuoteBox = ( { id } ) => {
  const { meta } = window[`gpalabQuoteBox${id}`];

  if ( meta ) {
    const {
      alt,
      backgroundType,
      blockBackground,
      desc,
      files,
      fullWidth,
      quote,
      quoteBackground,
      subtitle,
      textColor,
      title,
    } = meta;

    const bg
      = backgroundType === 'image' ? setBackgroundImage( files ) : backgroundStyle( blockBackground );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ bg } styleName="box-bg">
          <span role="img" aria-label={ alt } />
          <Gradient off={ backgroundType !== 'image' }>
            <div styleName="container">
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
                { desc && <div dangerouslySetInnerHTML={ { __html: desc } } style={ { color: textColor } } styleName="text" /> }
                { quote && (
                  <div style={ backgroundStyle( quoteBackground ) } styleName="quote">
                    <div dangerouslySetInnerHTML={ { __html: quote } } style={ { color: setText( quoteBackground ) } } styleName="quote-text" />
                  </div>
                ) }
              </div>
            </div>
          </Gradient>
        </div>
      </Normalizer>
    );
  }

  return null;
};

QuoteBox.propTypes = {
  id: propTypes.string,
};

export default QuoteBox;
