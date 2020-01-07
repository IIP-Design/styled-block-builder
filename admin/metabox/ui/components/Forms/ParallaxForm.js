import React, { Fragment, useContext } from 'react';

import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import { AdminContext } from 'metabox/context/adminContext';
import ButtonForm from './ButtonForm/ButtonForm';
import FullWidthToggle from './Toggles/FullWidthToggle';

const ParallaxForm = () => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleToggle = e => {
    const { name } = e.target;
    const isChecked = formValues[name] || false;

    dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
  };

  return (
    <Fragment>
      <FileUploader label="Add background image:" name="backgroundImage" />
      <label htmlFor="parallax-title">
        Add title (Optional):
        <input
          id="parallax-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="parallax-subtitle">
        Add sub-title (Optional):
        <input
          id="parallax-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="parallax-text">
        Add description (Optional):
        <textarea
          id="parallax-text"
          name="text"
          rows="6"
          value={formValues.desc || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <CheckboxConditional
        callback={handleToggle}
        checked={formValues.hasButton}
        label="Add Button (Optional)"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default ParallaxForm;
