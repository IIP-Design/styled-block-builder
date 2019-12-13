import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './Toggles.module.scss';

const CheckboxConditional = ( { callback, checked, children, label, name } ) => (
  <Fragment>
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
  </Fragment>
);

CheckboxConditional.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool,
  children: propTypes.node,
  label: propTypes.string,
  name: propTypes.string
};

export default CheckboxConditional;
