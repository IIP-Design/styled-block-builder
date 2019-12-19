import React from 'react';
import propTypes from 'prop-types';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { backgroundImage, backgroundStyle, setText } from 'blocks/_shared/utils/background-style';

import './QuoteBox.module.scss';

const QuoteBox = ( { id } ) => {
  const { assets } = window.gpalabTemplateFront;
  const { meta } = window[`gpalabQuoteBox${id}`];

  if ( meta ) {
    const {
      backgroundType,
      blockBackground,
      desc,
      fullWidth,
      quote,
      quoteBackground,
      speaker,
      subtitle,
      textColor,
      title
    } = meta;

    const bg =
      backgroundType === 'image'
        ? backgroundImage( blockBackground, assets )
        : backgroundStyle( blockBackground, assets );

    const quoteBg = backgroundStyle( quoteBackground, assets );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ bg } styleName="bg">
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
            { desc && (
              <div style={ { color: textColor } } styleName="text">
                { desc }
              </div>
            ) }
            { quote && (
              <div style={ quoteBg } styleName="quote">
                <p style={ { color: setText( quoteBackground ) } } styleName="quote-text">
                  { quote }
                  <br />
                  <br />
                  { speaker && `– ${speaker}` }
                </p>
              </div>
            ) }
          </div>
        </div>
      </Normalizer>
    );
  }

  return null;
};

QuoteBox.propTypes = {
  id: propTypes.string
};

export default QuoteBox;
