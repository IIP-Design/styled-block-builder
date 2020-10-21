import React from 'react';
import propTypes from 'prop-types';

import Background from 'library/_shared/components/Background/Background';
import CDPFeed from 'library/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'library/_shared/components/Normalizer/Normalizer';

import { backgroundStyle, setLightClass, setTextColor } from 'library/_shared/utils/background-style';

import './QuoteBox.module.scss';

const QuoteBox = ( { block, id } ) => {
  if ( block ) {
    const {
      articles,
      backgroundGradient,
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
    } = block;

    const quoteColor = setTextColor( quoteBackground );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' && backgroundGradient !== 'off' }
        >
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
              { desc && (
                <div
                  className={ setLightClass( textColor ) }
                  dangerouslySetInnerHTML={ { __html: desc } }
                  style={ { color: textColor } }
                  styleName="text"
                />
              ) }
              { quote && (
                <div style={ backgroundStyle( quoteBackground ) } styleName="quote">
                  <div
                    className={ setLightClass( quoteColor ) }
                    dangerouslySetInnerHTML={ { __html: quote } }
                    style={ { color: quoteColor } }
                    styleName="quote-text"
                  />
                </div>
              ) }
              { articles && <CDPFeed id={ id } items={ articles } /> }
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

QuoteBox.propTypes = {
  block: propTypes.shape( {
    articles: propTypes.array,
    backgroundGradient: propTypes.string,
    backgroundType: propTypes.string,
    blockBackground: propTypes.string,
    desc: propTypes.string,
    files: propTypes.array,
    fullWidth: propTypes.bool,
    quote: propTypes.string,
    quoteBackground: propTypes.string,
    subtitle: propTypes.string,
    textColor: propTypes.string,
    title: propTypes.string,
  } ),
  id: propTypes.string,
};

export default QuoteBox;
