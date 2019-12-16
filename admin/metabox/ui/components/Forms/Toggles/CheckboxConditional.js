import React from 'react';
import propTypes from 'prop-types';

import './Toggles.module.scss';

const CheckboxConditional = ( { callback, checked, children, label, name } ) => (
  <div styleName="form-break">
    <label htmlFor="conditional-rendering" styleName="toggle-label">
      { label && label }
      <input
        checked={ checked }
        id="conditional-rendering"
        name={ name }
        onChange={ e => callback( e ) }
        styleName="toggle-checkbox"
        type="checkbox"
      />
    </label>
    { checked && children }
  </div>
);

CheckboxConditional.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool,
  children: propTypes.node,
  label: propTypes.string,
  name: propTypes.string
};

export default CheckboxConditional;
