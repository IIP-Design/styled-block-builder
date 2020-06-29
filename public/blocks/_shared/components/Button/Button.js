import React from 'react';
import propTypes from 'prop-types';

import './Button.module.scss';

const Button = ( { arrow, border, color, link, text } ) => (
  <a href={ link } styleName="link">
    <button styleName={ `button ${color} ${border}` } type="button">
      { text }
      { arrow && arrow !== 'none' && (
        <span styleName={ `arrow arrow-${arrow}` }>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 985 512" role="presentation">
            <defs />
            <path styleName="svg" d="M688.939 48.406l36.644-36.644 244.047 244.047-36.644 36.643-244.047-244.047z" />
            <path styleName="svg" d="M688.858 463.533l244.047-244.047 36.644 36.643-244.047 244.047-36.644-36.644z" />
            <path styleName="svg" d="M25.911 230.089h880.971v51.822h-880.971v-51.822z" />
          </svg>
        </span>
      ) }
    </button>
  </a>
);

Button.propTypes = {
  arrow: propTypes.string,
  border: propTypes.string,
  color: propTypes.string,
  link: propTypes.string,
  text: propTypes.string,
};

export default Button;
