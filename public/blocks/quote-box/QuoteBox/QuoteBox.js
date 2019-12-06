import React from 'react';
import propTypes from 'prop-types';

import './QuoteBox.module.scss';

const QuoteBox = ( { id } ) => {
  const { meta } = window[`gpalabQuoteBox${id}`];

  if ( meta ) {
    const { description, quote, speaker, subtitle, title } = meta;

    return (
      <div styleName="content">
        { title && <h2 styleName="title">{ title }</h2> }
        { subtitle && <h3 styleName="subtitle">{ subtitle }</h3> }
        { description && <div styleName="text">{ description }</div> }
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
    );
  }

  return null;
};

QuoteBox.propTypes = {
  id: propTypes.string
};

export default QuoteBox;
