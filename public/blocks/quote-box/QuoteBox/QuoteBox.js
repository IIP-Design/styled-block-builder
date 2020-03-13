import React from 'react';
import propTypes from 'prop-types';

import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import {
  backgroundStyle,
  setBackgroundImage,
  setText
} from 'blocks/_shared/utils/background-style';

import './QuoteBox.module.scss';

const QuoteBox = ({ id }) => {
  const { meta } = window[`gpalabQuoteBox${id}`];

  if (meta) {
    const {
      backgroundType,
      blockBackground,
      desc,
      files,
      fullWidth,
      quote,
      quoteBackground,
      speaker,
      subtitle,
      textColor,
      title
    } = meta;

    const bg =
      backgroundType === 'image' ? setBackgroundImage(files) : backgroundStyle(blockBackground);

    return (
      <Normalizer fullWidth={fullWidth}>
        <div style={bg} styleName="box-bg">
          <Gradient off={backgroundType !== 'image'}>
            <div styleName="container">
              <div styleName="content">
                {title && (
                  <h2 style={{ color: textColor }} styleName="title">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <h3 style={{ color: textColor }} styleName="subtitle">
                    {subtitle}
                  </h3>
                )}
                {desc && (
                  <p style={{ color: textColor }} styleName="text">
                    {desc}
                  </p>
                )}
                {quote && (
                  <div style={backgroundStyle(quoteBackground)} styleName="quote">
                    <p style={{ color: setText(quoteBackground) }} styleName="quote-text">
                      {quote}
                      <br />
                      <br />
                      {speaker && `– ${speaker}`}
                    </p>
                  </div>
                )}
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
  id: propTypes.string
};

export default QuoteBox;
