import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { handleToggle } from 'metabox/utils/event-handlers';

import './Toggles.module.scss';

const CheckboxConditional = ({ callback, checked, children, label, name }) => {
  const { dispatch, state } = useContext(AdminContext);
  const values = state?.formData?.formValues ? state.formData.formValues : {};

  /**
   * Function to be run on change, either the default handleToggle function or a custom callback function if provided.
   *
   * @param {Object} e An event object.
   */
  const handleChange = e => {
    if (callback) {
      callback(e);
    }

    handleToggle(e, dispatch, values);
  };

  return (
    <div styleName="form-break">
      <label htmlFor={`conditional-rendering-${name}`} styleName="toggle-label">
        {label && label}
        <input
          checked={checked}
          id={`conditional-rendering-${name}`}
          name={name}
          styleName="toggle-checkbox"
          type="checkbox"
          onChange={e => handleChange(e)}
        />
      </label>
      {checked && children}
    </div>
  );
};
CheckboxConditional.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool,
  children: propTypes.node,
  label: propTypes.string,
  name: propTypes.string
};

CheckboxConditional.defaultProps = {
  checked: false
};

export default CheckboxConditional;
