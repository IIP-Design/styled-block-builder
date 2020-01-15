import React from 'react';
import propTypes from 'prop-types';

import './Gradient.scss';

const Gradient = ({ children, off }) => (
  <div className={off ? 'gpalab-gradient off' : 'gpalab-gradient'}>{children}</div>
);

Gradient.propTypes = {
  children: propTypes.element,
  off: propTypes.bool
};

Gradient.defaultProps = {
  off: false
};

export default Gradient;
