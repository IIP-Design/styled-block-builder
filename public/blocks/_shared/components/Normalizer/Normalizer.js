import React from 'react';
import propTypes from 'prop-types';

import './Normalizer.module.scss';

const Normalizer = ( { children } ) => <div styleName="normalizer">{ children }</div>;

Normalizer.propTypes = {
  children: propTypes.element
};

export default Normalizer;
