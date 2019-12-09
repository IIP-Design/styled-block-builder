import React from 'react';
import propTypes from 'prop-types';

import './Button.scss';

const Button = ( { link, text, style, arrow } ) => {
  return (
    <div>
      <a href={ link }>
        <button className={ `read-more ${style}` } type="button">
          { text }
          <span className={ `arrow-${arrow}` }>⟶</span>
        </button>
      </a>
    </div>
  );
};

Button.propTypes = {
  link: propTypes.string,
  text: propTypes.string,
  style: propTypes.string,
  arrow: propTypes.string
};

export default Button;
