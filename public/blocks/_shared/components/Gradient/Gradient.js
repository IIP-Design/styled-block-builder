import React from 'react';
import propTypes from 'prop-types';

import './Gradient.scss';

const Gradient = ( { children } ) => {
  return <div className="gpalab-gradient">{ children }</div>;
};

Gradient.propTypes = {
  children: propTypes.element
};

export default Gradient;
