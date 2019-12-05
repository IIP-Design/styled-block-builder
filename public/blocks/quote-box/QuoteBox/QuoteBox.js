import React from 'react';
import propTypes from 'prop-types';

import './QuoteBox.module.scss';
import mockData from './mockdata';

const QuoteBox = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { description, quote, speaker, subtitle, title } = mockData;

  return (
    <div styleName="content">
      <h2 styleName="title">{ title }</h2>
      <h3 styleName="subtitle">{ subtitle }</h3>
      <div styleName="text">{ description }</div>
      <div styleName="quote">
        <p styleName="quote-text">
          { quote }
          <br />
          <br />
          { `– ${speaker}` }
        </p>
      </div>
    </div>
  );
};

QuoteBox.propTypes = {
  id: propTypes.string
};

export default QuoteBox;
