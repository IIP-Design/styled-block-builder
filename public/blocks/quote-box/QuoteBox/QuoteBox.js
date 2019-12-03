import React from 'react';
import propTypes from 'prop-types';

import './QuoteBox.scss';
import mockData from './mockdata';

const QuoteBox = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { description, quote, speaker, subtitle, title } = mockData;

  return (
    <div className="gpalab-temp-qb-content">
      <h2 className="gpalab-temp-qb-title">{ title }</h2>
      <h3 className="gpalab-temp-qb-subtitle">{ subtitle }</h3>
      <div className="gpalab-temp-qb-text">{ description }</div>
      <div className="gpalab-temp-qb-quote">
        <p className="gpalab-temp-qb-quote-text">
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
