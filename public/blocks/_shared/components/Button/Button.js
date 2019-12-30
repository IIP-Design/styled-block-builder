import React from 'react';
import propTypes from 'prop-types';

import './Button.scss';

const Button = ({ buttonLink, buttonText, buttonStyle, buttonArrow }) => {
  return (
    <div>
      <a href={buttonLink}>
        <button className={`read-more ${buttonStyle}`} type="button">
          {buttonText}
          <span className={`arrow-${buttonArrow}`}>⟶</span>
        </button>
      </a>
    </div>
  );
};

Button.propTypes = {
  buttonLink: propTypes.string,
  buttonText: propTypes.string,
  buttonStyle: propTypes.string,
  buttonArrow: propTypes.string
};

export default Button;
