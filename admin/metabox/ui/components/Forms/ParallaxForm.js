import React, { Fragment, useContext } from 'react';
import ReactQuill from 'react-quill';

import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';
import { getModules } from 'metabox/utils/quill';

const ParallaxForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleQuill = value => {
    dispatch( { type: 'form-update', payload: { name: 'desc', value } } );
  };

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
        <ReactQuill
          id="parallax-text"
          modules={ getModules( ['align', 'lists'] ) }
          theme="snow"
          value={ formValues.desc || '' }
          onChange={ handleQuill }
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
