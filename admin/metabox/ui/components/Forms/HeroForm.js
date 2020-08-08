import React, { Fragment, useContext } from 'react';
import ReactQuill from 'react-quill';

import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';
import { getModules } from 'metabox/utils/quill';

const HeroForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleQuill = value => {
    dispatch( { type: 'form-update', payload: { name: 'description', value } } );
  };

  const optionsAlign = [
    { label: 'Left', name: 'align', value: 'left' },
    { label: 'Center Title', name: 'align', value: 'title' },
    { label: 'Center All', name: 'align', value: 'center' },
  ];

  const options = [
    { label: 'Text', name: 'type', value: 'text' },
    { label: 'Animated lines', name: 'type', value: 'lines' },
  ];

  const tabFields = [{ label: 'Add Animated line:', name: 'text', tabTitle: true, type: 'text' }];

  return (
    <Fragment>
      <FileUploader label="Add background image:" name="backgroundImage" />
      <label htmlFor="hero-title">
        Add Title:
        <input
          id="hero-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="hero-subtitle">
        Add Subtitle:
        <input
          id="hero-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <RadioConditional
        checked={ formValues.align }
        label="Choose a block alignment:"
        options={ optionsAlign }
      />
      <RadioConditional
        checked={ formValues.type }
        label="What type of block would you like?"
        options={ options }
      />
      { formValues.type === 'text' && (
        <label htmlFor="hero-description">
          Add main content area text:
          <ReactQuill
            id="hero-description"
            modules={ getModules( ['lists'] ) }
            theme="snow"
            value={ formValues.description || '' }
            onChange={ handleQuill }
          />
        </label>
      ) }
      { formValues.type === 'lines'
        && <TabbedForm fields={ tabFields } group="lines" label="Line" maxTabs={ 10 } /> }
      <ButtonForm />
    </Fragment>
  );
};

export default HeroForm;
