import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const DirectionalIcon = ( { direction, fill, height, width } ) => (
  <Fragment>
    { direction && direction === 'up' && (
      <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        width={ width }
        role="img"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={ fill } d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
      </svg>
    ) }

    { direction && direction === 'down' && (
      <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        width={ width }
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path fill={ fill } d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
      </svg>
    ) }
  </Fragment>
);

DirectionalIcon.propTypes = {
  direction: propTypes.string,
  fill: propTypes.string,
  height: propTypes.string,
  width: propTypes.string,
};

DirectionalIcon.defaultProps = {
  fill: '#333333',
  height: '20px',
  width: '20px',
};


export default DirectionalIcon;
