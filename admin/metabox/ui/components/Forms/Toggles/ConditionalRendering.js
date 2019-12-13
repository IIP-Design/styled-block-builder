import React from 'react';
import propTypes from 'prop-types';

import './Toggles.module.scss';

const ConditionalRendering = ( { callback, checked, children, label, name } ) => (
  <div>
    <label htmlFor="conditional-rendering" styleName="toggle-label">
      { label }
      <input
        checked={ checked }
        id="conditional-rendering"
        onChange={ () => callback() }
        name={ name }
        styleName="toggle-checkbox"
        type="checkbox"
      />
    </label>
    { checked && children }
  </div>
);

ConditionalRendering.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool,
  children: propTypes.node,
  label: propTypes.string,
  name: propTypes.string
};

export default ConditionalRendering;
