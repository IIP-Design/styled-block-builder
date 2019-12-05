import React from 'react';

import './Button.scss';

const Button = ({ link, text, style, arrow }) => {
  return (
    <div>
      <a href={link}>
        <button class={`read-more ${style}`}>
          {text}
          <span class={`arrow-${arrow}`}>⟶</span>
        </button>
      </a>
    </div>
  );
};

export default Button;
