import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import TabbedForm from './TabbedForm/TabbedForm';
import FullWidthToggle from './Toggles/FullWidthToggle';
import RadioConditional from './Toggles/RadioConditional';

const StatsForm = ({ callback, meta }) => {
  const schema = {
    background: meta.background || '',
    backgroundType: meta.backgroundType || 'color',
    blockBackground: meta.blockBackground || '#ffffff',
    files: meta.files || [],
    fullWidth: meta.fullWidth || false,
    stats: meta.stats || [],
    textColor: meta.textColor || '#333333',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState(schema);

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect(() => {
    callback(formData);
  }, []);

  const updateState = (group, val) => {
    setInputs({ ...inputs, [group]: val });
    callback({ ...formData, [group]: val });
  };

  const tabStateFunc = (group, clone) => {
    setInputs({ ...inputs, [group]: clone });
    callback({ ...formData, [group]: clone });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    updateState(name, value);
  };

  const handleToggle = e => {
    const { name } = e.target;
    const checked = !inputs[name];

    updateState(name, checked);
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    updateState(group, value);
  };

  const handleFile = e => {
    const { name } = e.target;
    const file = e.target.files[0];

    const files = inputs.files.filter(f => f.name !== name);
    files.push({ name, file });

    updateState('files', files);
  };

  const blockBgOptions = {
    group: 'blockBackground',
    options: defaultBackgrounds
  };

  const blockBgType = [
    { label: 'Color', name: 'backgroundType', value: 'color' },
    { label: 'Image', name: 'backgroundType', value: 'image' }
  ];

  const textOptions = {
    group: 'textColor',
    options: defaultText
  };

  const tabFields = [
    { label: 'Add stat title:', name: 'title', tabTitle: true, type: 'text' },
    { label: 'Add stat value:', name: 'number', type: 'text' }
  ];

  return (
    <Fragment>
      <RadioConditional
        callback={handleChange}
        checked={inputs.backgroundType}
        label="What type of background would you like to apply to this block?"
        options={blockBgType}
      />
      {inputs.backgroundType === 'color' && (
        <ColorPicker
          callback={handleColor}
          colors={blockBgOptions}
          label="Set block background color:"
          selected={inputs.blockBackground}
        />
      )}
      {inputs.backgroundType === 'image' && (
        <FileUploader callback={handleFile} label="Add background image:" name="backgroundImage" />
      )}
      <ColorPicker
        callback={handleColor}
        colors={textOptions}
        label="Set block text color:"
        selected={inputs.textColor}
      />
      <label htmlFor="stats-title">
        Add Stats block title:
        <input
          id="stats-title"
          name="title"
          onChange={e => handleChange(e)}
          type="text"
          value={meta.title}
        />
      </label>
      <FullWidthToggle callback={handleToggle} checked={inputs.fullWidth} />
      <TabbedForm
        fields={tabFields}
        group="stats"
        inputs={inputs}
        label="Stat"
        stateFunc={tabStateFunc}
      />
    </Fragment>
  );
};

StatsForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default StatsForm;
