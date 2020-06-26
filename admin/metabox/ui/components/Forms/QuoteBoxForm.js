import React, { Fragment, useContext, useEffect } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { handleChange } from 'metabox/utils/event-handlers';

const QuoteBoxForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize style options with default values if none are already selected.
  useEffect( () => {
    if ( !state?.formData?.formValues?.textColor ) {
      dispatch( { type: 'form-update', payload: { name: 'textColor', value: '#333333' } } );
    }

    if ( !state?.formData?.formValues?.backgroundType ) {
      dispatch( { type: 'form-update', payload: { name: 'backgroundType', value: 'color' } } );
    }

    if ( !state?.formData?.formValues?.blockBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } } );
    }

    if ( !state?.formData?.formValues?.quoteBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'quoteBackground', value: '#ffffff' } } );
    }
  }, [] );

  const blockBgOptions = {
    group: 'blockBackground',
    options: defaultBackgrounds,
  };

  const blockBgType = [
    { label: 'Color', name: 'backgroundType', value: 'color' },
    { label: 'Image', name: 'backgroundType', value: 'image' },
  ];

  const textOptions = {
    group: 'textColor',
    options: defaultText,
  };

  const quoteBgOptions = {
    group: 'quoteBackground',
    options: defaultBackgrounds,
  };

  return (
    <Fragment>
      <RadioConditional
        checked={ formValues.backgroundType }
        label="What type of background would you like to apply to this block?"
        options={ blockBgType }
      />
      { formValues.backgroundType === 'color' && (
        <ColorPicker
          colors={ blockBgOptions }
          label="Set block background color:"
          selected={ formValues.blockBackground }
        />
      ) }
      { formValues.backgroundType === 'image'
        && <FileUploader label="Add background image URL:" name="backgroundImage" /> }
      <ColorPicker
        colors={ textOptions }
        label="Set block text color:"
        selected={ formValues.textColor }
      />
      <label htmlFor="quote-box-title">
        Add Title:
        <input
          id="quote-box-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add Subtitle:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add Description:
        <textarea
          id="quote-box-desc"
          name="desc"
          rows="6"
          value={ formValues.desc || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <ColorPicker
        colors={ quoteBgOptions }
        label="Set quote background color:"
        selected={ formValues.quoteBackground }
      />
      <label htmlFor="quote-box-quote">
        Add Quote:
        <textarea
          id="quote-box-quote"
          name="quote"
          rows="6"
          value={ formValues.quote || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="quote-box-speaker">
        Add Speaker:
        <input
          id="quote-box-speaker"
          name="speaker"
          type="text"
          value={ formValues.speaker || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default QuoteBoxForm;
