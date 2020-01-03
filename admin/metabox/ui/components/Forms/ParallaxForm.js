import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import ButtonForm from './ButtonForm/ButtonForm';
import FullWidthToggle from './Toggles/FullWidthToggle';

const ParallaxForm = ({ callback, meta }) => {
  const schema = {
    buttonArrow: meta.buttonArrow || '',
    buttonLink: meta.buttonLink || '',
    buttonStyle: meta.buttonStyle || '',
    buttonText: meta.buttonText || '',
    files: meta.files || [],
    fullWidth: meta.fullWidth || false,
    hasButton: meta.hasButton || false,
    subtitle: meta.subtitle || '',
    text: meta.text || '',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState(schema);

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect(() => {
    callback(formData);
  }, []);

  const updateState = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    callback({ ...formData, [name]: value });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const handleToggle = () => {
    const isChecked = !inputs.hasButton;

    updateState('hasButton', isChecked);
  };

  const handleWidth = e => {
    const { name } = e.target;
    const checked = !inputs[name];

    updateState([name], checked);
  };

  const handleFile = e => {
    const { name } = e.target;
    const file = e.target.files[0];

    const files = inputs.files.filter(f => f.name !== name);
    files.push({ name, file });

    updateState('files', files);
  };

  return (
    <Fragment>
      <FileUploader callback={handleFile} label="Add background image:" name="backgroundImage" />
      <label htmlFor="parallax-title">
        Add title (Optional):
        <input
          id="parallax-title"
          name="title"
          onChange={e => handleChange(e)}
          type="text"
          value={inputs.title}
        />
      </label>
      <label htmlFor="parallax-subtitle">
        Add sub-title (Optional):
        <input
          id="parallax-subtitle"
          name="subtitle"
          onChange={e => handleChange(e)}
          type="text"
          value={inputs.subtitle}
        />
      </label>
      <label htmlFor="parallax-text">
        Add description (Optional):
        <textarea
          id="parallax-text"
          name="text"
          onChange={e => handleChange(e)}
          rows="6"
          value={inputs.desc}
        />
      </label>
      <CheckboxConditional
        label="Add Button (Optional)"
        checked={inputs.hasButton}
        callback={handleToggle}
        name="add-button"
      >
        <ButtonForm callback={handleChange} inputs={inputs} />
      </CheckboxConditional>
      <FullWidthToggle callback={handleWidth} checked={inputs.fullWidth} />
    </Fragment>
  );
};

ParallaxForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default ParallaxForm;
