import React, { Fragment, useContext } from 'react';

import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';

const ParallaxForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  return (
    <Fragment>
      <FileUploader label="Add background image:" name="backgroundImage" />
      <label htmlFor="parallax-title">
        Add Title:
        <input
          id="parallax-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="parallax-subtitle">
        Add Subtitle:
        <input
          id="parallax-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="parallax-text">
        Add Description:
        <textarea
          id="parallax-text"
          name="desc"
          rows="6"
          value={ formValues.desc || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <CheckboxConditional
        checked={ formValues.hasButton }
        label="Add Button:"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default ParallaxForm;
