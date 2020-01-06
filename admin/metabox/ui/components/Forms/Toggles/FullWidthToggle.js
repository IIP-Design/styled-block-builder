import React from 'react';
import propTypes from 'prop-types';

import './Toggles.module.scss';

const FullWidthToggle = ({ callback, checked }) => (
  <div>
    <label htmlFor="full-width-toggle" styleName="toggle-label">
      Make this block full-page width?
      <input
        checked={checked}
        id="full-width-toggle"
        name="fullWidth"
        styleName="toggle-checkbox"
        type="checkbox"
        onChange={e => callback(e)}
      />
    </label>
  </div>
);

FullWidthToggle.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool
};

FullWidthToggle.defaultProps = {
  checked: false
};

export default FullWidthToggle;
