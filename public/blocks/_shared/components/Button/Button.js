import React from 'react';
import propTypes from 'prop-types';

import './Button.module.scss';

const Button = ( { config } ) => {
  const {
    addPrefix,
    buttonArrow: arrow,
    buttonBorder: border,
    buttonColor: color,
    buttonLink: link,
    buttonPrefix: prefix,
    buttonText: text,
  } = config;

  return (
    <a href={ link } styleName={ `button ${color} ${border}` }>
      { addPrefix && prefix && (
        <div>
          { prefix }
        </div>
      ) }
      <div>
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
      </div>
    </a>
  );
};

Button.propTypes = {
  config: propTypes.shape( {
    addPrefix: propTypes.bool,
    buttonArrow: propTypes.string,
    buttonBorder: propTypes.string,
    buttonColor: propTypes.string,
    buttonLink: propTypes.string,
    buttonPrefix: propTypes.string,
    buttonText: propTypes.string,
  } ),
};

export default Button;
