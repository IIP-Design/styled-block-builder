import React from 'react';
import propTypes from 'prop-types';

import './Button.scss';

const Button = ({ arrow, link, text, style }) => (
  <div>
    <a href={link}>
      <button className={`read-more ${style}`} type="button">
        {text}
        <span className={`arrow-${arrow}`}>⟶</span>
      </button>
    </a>
  </div>
);

Button.propTypes = {
  arrow: propTypes.string,
  link: propTypes.string,
  style: propTypes.string,
  text: propTypes.string
};

export default Button;
