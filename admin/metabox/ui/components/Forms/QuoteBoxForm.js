import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import FullWidthToggle from './Toggles/FullWidthToggle';
import RadioConditional from './Toggles/RadioConditional';

const QuoteBoxForm = ( { callback, meta } ) => {
  const schema = {
    backgroundType: meta.backgroundType || 'color',
    backgroundImage: meta.backgroundImage || '',
    blockBackground: meta.blockBackground || '#ffffff',
    desc: meta.desc || '',
    fullWidth: meta.fullWidth || false,
    quote: meta.quote || '',
    quoteBackground: meta.quoteBackground || '#ffffff',
    speaker: meta.speaker || '',
    subtitle: meta.subtitle || '',
    textColor: meta.textColor || '#333333',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const updateState = ( name, value ) => {
    setInputs( { ...inputs, [name]: value } );
    callback( { ...formData, [name]: value } );
  };

  const handleChange = e => {
    const { name, value } = e.target;

    updateState( name, value );
  };

  const handleToggle = e => {
    const { name } = e.target;
    const checked = !inputs.fullWidth;

    updateState( name, checked );
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    updateState( group, value );
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
        callback={ handleChange }
        checked={ inputs.backgroundType }
        label="What type of background would you like to apply to this block?"
        options={ blockBgType }
      />
      { inputs.backgroundType === 'color' && (
        <ColorPicker
          callback={ handleColor }
          colors={ blockBgOptions }
          label="Set block background color:"
          selected={ inputs.blockBackground }
        />
      ) }
      { inputs.backgroundType === 'image' && (
        <label htmlFor="quote-box-image">
          Add background image URL:
          <input
            id="quote-box-image"
            name="backgroundImage"
            onChange={ e => handleChange( e ) }
            type="text"
            value={ inputs.backgroundImage }
          />
        </label>
      ) }
      <ColorPicker
        callback={ handleColor }
        colors={ textOptions }
        label="Set block text color:"
        selected={ inputs.textColor }
      />
      <label htmlFor="quote-box-title">
        Add title:
        <input
          id="quote-box-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add sub-title:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add description:
        <textarea
          id="quote-box-desc"
          name="desc"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.desc }
        />
      </label>
      <ColorPicker
        callback={ handleColor }
        colors={ quoteBgOptions }
        label="Set quote background color:"
        selected={ inputs.quoteBackground }
      />
      <label htmlFor="quote-box-quote">
        Add quote:
        <textarea
          id="quote-box-quote"
          name="quote"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.quote }
        />
      </label>
      <label htmlFor="quote-box-speaker">
        Add speaker:
        <input
          id="quote-box-speaker"
          name="speaker"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.speaker }
        />
      </label>
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </Fragment>
  );
};

QuoteBoxForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default QuoteBoxForm;
