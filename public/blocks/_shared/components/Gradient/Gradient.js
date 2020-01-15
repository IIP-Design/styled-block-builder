import React from 'react';
import propTypes from 'prop-types';

import './Gradient.scss';

const Gradient = ({ children }) => <div className="gpalab-gradient">{children}</div>;

Gradient.propTypes = {
  children: propTypes.element
};

export default Gradient;
