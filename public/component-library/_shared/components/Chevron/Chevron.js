import React from 'react';
import propTypes from 'prop-types';

const Chevron = ( { reverse, stroke } ) => (
  <span className="icon-svg" style={ reverse ? { transform: 'rotateX(180deg)' } : {} }>
    <svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
      <g stroke={ stroke } strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="square">
        <path d="M8.879 8.879L1.12 1.12M9 9l8-8" />
      </g>
    </svg>
  </span>
);

Chevron.propTypes = {
  reverse: propTypes.bool,
  stroke: propTypes.string,
};

Chevron.defaultProps = {
  stroke: '#B63031',
};

export default Chevron;
