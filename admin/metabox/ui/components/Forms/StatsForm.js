import React, { Fragment, useContext, useEffect } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

const StatsForm = () => {
  const { dispatch, state } = useContext(MetaboxContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize style options with default values if none are already selected.
  useEffect(() => {
    if (!state?.formData?.formValues?.textColor) {
      dispatch({ type: 'form-update', payload: { name: 'textColor', value: '#333333' } });
    }

    if (!state?.formData?.formValues?.backgroundType) {
      dispatch({ type: 'form-update', payload: { name: 'backgroundType', value: 'color' } });
    }

    if (!state?.formData?.formValues?.blockBackground) {
      dispatch({ type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } });
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    dispatch({ type: 'form-update', payload: { name: group, value } });
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

  if (formValues) {
    return (
      <Fragment>
        <RadioConditional
          callback={handleChange}
          checked={formValues.backgroundType}
          label="What type of background would you like to apply to this block?"
          options={blockBgType}
        />
        {formValues.backgroundType === 'color' && (
          <ColorPicker
            callback={handleColor}
            colors={blockBgOptions}
            label="Set block background color:"
            selected={formValues.blockBackground}
          />
        )}
        {formValues.backgroundType === 'image' && (
          <FileUploader
            callback={handleFile}
            label="Add background image:"
            name="backgroundImage"
          />
        )}
        <ColorPicker
          callback={handleColor}
          colors={textOptions}
          label="Set block text color:"
          selected={formValues.textColor}
        />
        <label htmlFor="stats-title">
          Add Stats block title:
          <input
            id="stats-title"
            name="title"
            type="text"
            value={formValues.title || ''}
            onChange={e => handleChange(e)}
          />
        </label>
        <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
        <TabbedForm fields={tabFields} group="stats" label="Stat" />
      </Fragment>
    );
  }

  return null;
};

export default StatsForm;
