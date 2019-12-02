import React from 'react';
import propTypes from 'prop-types';

const QuoteBox = ( { id } ) => <div>{ `Quote Box - ${id}` }</div>;

QuoteBox.propTypes = {
  id: propTypes.string
};

export default QuoteBox;
