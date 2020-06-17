import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { handleToggle } from 'metabox/utils/event-handlers';

import './Toggles.module.scss';

const FullWidthToggle = ( { checked } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const values = state?.formData?.formValues ? state.formData.formValues : {};

  return (
    <div>
      <label htmlFor="full-width-toggle" styleName="toggle-label">
        Make this block full-page width?
        <input
          checked={ checked }
          id="full-width-toggle"
          name="fullWidth"
          styleName="toggle-checkbox"
          type="checkbox"
          onChange={ e => handleToggle( e, dispatch, values ) }
        />
      </label>
    </div>
  );
};

FullWidthToggle.propTypes = {
  checked: propTypes.bool,
};

FullWidthToggle.defaultProps = {
  checked: false,
};

export default FullWidthToggle;
