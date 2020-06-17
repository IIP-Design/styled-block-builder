import React, { Fragment, useContext } from 'react';

import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';

const HeroForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const options = [
    { label: 'Text', name: 'type', value: 'text' },
    { label: 'Animated lines', name: 'type', value: 'lines' },
  ];

  const tabFields = [{ label: 'Add Animated line:', name: 'text', tabTitle: true, type: 'text' }];

  return (
    <Fragment>
      <FileUploader label="Add background image:" name="backgroundImage" />
      <label htmlFor="hero-title">
        Add Title (Optional):
        <input
          id="hero-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="hero-subtitle">
        Add Subtitle (Optional):
        <input
          id="hero-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <RadioConditional
        checked={ formValues.type }
        label="What type of block would you like?"
        options={ options }
      />
      { formValues.type === 'text' && (
        <label htmlFor="hero-description">
          Add main content area text:
          <textarea
            id="hero-description"
            name="description"
            rows="6"
            type="text"
            value={ formValues.description || '' }
            onChange={ e => handleChange( e, dispatch ) }
          />
        </label>
      ) }
      { formValues.type === 'lines'
        && <TabbedForm fields={ tabFields } group="lines" label="Line" maxTabs={ 10 } /> }
      <CheckboxConditional
        checked={ formValues.hasButton }
        label="Add Button (Optional):"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
    </Fragment>
  );
};

export default HeroForm;
