import React from 'react';
import propTypes from 'prop-types';

import './Toggles.module.scss';

const RadioConditional = ( { callback, checked, label, options } ) => (
  <div styleName="form-break">
    { label && <h4 styleName="toggle-header">{ label }</h4> }
    <div styleName="radio-wrapper">
      { options &&
        options.map( option => (
          <label
            htmlFor={ `radio-conditional-${option.value}` }
            key={ option.value }
            styleName="radio-label"
          >
            { option.label }
            <input
              checked={ option.value === checked }
              id={ `radio-conditional-${option.value}` }
              onChange={ e => callback( e ) }
              name={ option.name }
              value={ option.value }
              type="radio"
            />
          </label>
        ) ) }
    </div>
  </div>
);

RadioConditional.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool,
  label: propTypes.string,
  options: propTypes.array
};

export default RadioConditional;
