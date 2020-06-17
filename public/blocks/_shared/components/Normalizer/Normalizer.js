import React from 'react';
import propTypes from 'prop-types';

const Normalizer = ( { children, fullWidth } ) => {
  const classes = fullWidth ? 'gpalab-normalizer full-width' : 'gpalab-normalizer';

  return <div className={ classes }>{ children }</div>;
};

Normalizer.propTypes = {
  children: propTypes.element,
  fullWidth: propTypes.bool,
};

export default Normalizer;
