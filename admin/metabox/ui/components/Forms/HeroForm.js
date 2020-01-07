import React, { Fragment, useContext } from 'react';

import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

const HeroForm = () => {
  const { dispatch, state } = useContext(MetaboxContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleFile = e => {
    const { name } = e.target;
    const file = e.target.files[0];

    dispatch({ type: 'file-add', file, name });
  };

  const handleToggle = e => {
    const { name } = e.target;
    const isChecked = formValues[name] || false;

    dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
  };

  const options = [
    { label: 'Text', name: 'type', value: 'text' },
    { label: 'Animated lines', name: 'type', value: 'lines' }
  ];

  const tabFields = [{ label: 'Add Animated line:', name: 'text', tabTitle: true, type: 'text' }];

  return (
    <Fragment>
      <FileUploader callback={handleFile} label="Add background image:" name="backgroundImage" />
      <label htmlFor="hero-title">
        Add Title:
        <input
          id="hero-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="hero-subtitle">
        Add Subtitle:
        <input
          id="hero-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <RadioConditional
        callback={handleChange}
        checked={formValues.type}
        label="What type of block would you like?"
        options={options}
      />
      {formValues.type === 'text' && (
        <label htmlFor="hero-description">
          Add main content area text:
          <textarea
            id="hero-description"
            name="description"
            rows="6"
            type="text"
            value={formValues.description || ''}
            onChange={e => handleChange(e)}
          />
        </label>
      )}
      {formValues.type === 'lines' && (
        <TabbedForm fields={tabFields} group="lines" label="Line" maxTabs={10} />
      )}
      <CheckboxConditional
        callback={handleToggle}
        checked={formValues.hasButton}
        label="Add Button (Optional)"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
    </Fragment>
  );
};

export default HeroForm;
