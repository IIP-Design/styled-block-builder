import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/dispatch-helpers';

import './Toggles.module.scss';

const RadioConditional = ({ checked, label, options }) => {
  const { dispatch } = useContext(AdminContext);

  return (
    <div styleName="form-break">
      {label && <h4 styleName="toggle-header">{label}</h4>}
      <div styleName="radio-wrapper">
        {options &&
          options.map(option => (
            <label
              key={option.value}
              htmlFor={`radio-conditional-${option.value}`}
              styleName="radio-label"
            >
              {option.label}
              <input
                checked={option.value === checked}
                id={`radio-conditional-${option.value}`}
                name={option.name}
                type="radio"
                value={option.value}
                onChange={e => handleChange(e, dispatch)}
              />
            </label>
          ))}
      </div>
    </div>
  );
};

RadioConditional.propTypes = {
  checked: propTypes.string,
  label: propTypes.string,
  options: propTypes.array
};

export default RadioConditional;
