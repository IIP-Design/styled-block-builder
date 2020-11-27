import React from 'react';
import propTypes from 'prop-types';

const BlockHeading = ( { className, primary, text, ...rest } ) => {
  const classes = className ? `gpalab-site-specific ${className}` : 'gpalab-site-specific';

  if ( primary ) {
    return (
      <h1 className={ classes } { ...rest }>
        { text }
      </h1>
    );
  }

  return (
    <h2 className={ classes } { ...rest }>
      { text }
    </h2>
  );
};

BlockHeading.propTypes = {
  className: propTypes.string,
  primary: propTypes.bool,
  text: propTypes.string,
};

export default BlockHeading;
