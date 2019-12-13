import React from 'react';
import propTypes from 'prop-types';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './QuoteBox.module.scss';

const QuoteBox = ( { id } ) => {
  const { meta } = window[`gpalabQuoteBox${id}`];

  if ( meta ) {
    const { desc, fullWidth, quote, speaker, subtitle, title } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div styleName="content">
          { title && <h2 styleName="title">{ title }</h2> }
          { subtitle && <h3 styleName="subtitle">{ subtitle }</h3> }
          { desc && <div styleName="text">{ desc }</div> }
          { quote && (
            <div styleName="quote">
              <p styleName="quote-text">
                { quote }
                <br />
                <br />
                { speaker && `– ${speaker}` }
              </p>
            </div>
          ) }
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
