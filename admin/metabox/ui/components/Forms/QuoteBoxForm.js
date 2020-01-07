import React, { Fragment, useContext, useEffect } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import FullWidthToggle from './Toggles/FullWidthToggle';
import RadioConditional from './Toggles/RadioConditional';

const QuoteBoxForm = () => {
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

    if (!state?.formData?.formValues?.quoteBackground) {
      dispatch({ type: 'form-update', payload: { name: 'quoteBackground', value: '#ffffff' } });
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

  const quoteBgOptions = {
    group: 'quoteBackground',
    options: defaultBackgrounds
  };

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
          label="Add background image URL:"
          name="backgroundImage"
        />
      )}
      <ColorPicker
        callback={handleColor}
        colors={textOptions}
        label="Set block text color:"
        selected={formValues.textColor}
      />
      <label htmlFor="quote-box-title">
        Add title:
        <input
          id="quote-box-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add sub-title:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add description:
        <textarea
          id="quote-box-desc"
          name="desc"
          rows="6"
          value={formValues.desc || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <ColorPicker
        callback={handleColor}
        colors={quoteBgOptions}
        label="Set quote background color:"
        selected={formValues.quoteBackground}
      />
      <label htmlFor="quote-box-quote">
        Add quote:
        <textarea
          id="quote-box-quote"
          name="quote"
          rows="6"
          value={formValues.quote || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="quote-box-speaker">
        Add speaker:
        <input
          id="quote-box-speaker"
          name="speaker"
          type="text"
          value={formValues.speaker || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default QuoteBoxForm;
