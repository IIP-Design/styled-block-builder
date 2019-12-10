import React from 'react';
import propTypes from 'prop-types';

const Normalizer = ( { children } ) => <div className="gpalab-normalizer">{ children }</div>;

Normalizer.propTypes = {
  children: propTypes.element
};

export default Normalizer;
