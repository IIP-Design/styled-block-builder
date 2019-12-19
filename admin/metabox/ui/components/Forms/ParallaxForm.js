import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FullWidthToggle from './Toggles/FullWidthToggle';

const ParallaxForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    buttonArrow: meta.buttonArrow || '',
    buttonLink: meta.buttonLink || '',
    buttonStyle: meta.buttonStyle || '',
    buttonText: meta.buttonText || '',
    fullWidth: meta.fullWidth || false,
    hasButton: meta.hasButton || false,
    subtitle: meta.subtitle || '',
    text: meta.text || '',
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

  const handleToggle = () => {
    const isChecked = !inputs.hasButton;

    updateState( 'hasButton', isChecked );
  };

  const handleWidth = e => {
    const { name } = e.target;
    const checked = !inputs[name];

    updateState( [name], checked );
  };

  return (
    <Fragment>
      <label htmlFor="parallax-background">
        Add background image URL (Required):
        <input
          id="parallax-background"
          name="background"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.background }
        />
      </label>
      <label htmlFor="parallax-title">
        Add title (Optional):
        <input
          id="parallax-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="parallax-subtitle">
        Add sub-title (Optional):
        <input
          id="parallax-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <label htmlFor="parallax-text">
        Add description (Optional):
        <textarea
          id="parallax-text"
          name="text"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.desc }
        />
      </label>
      <CheckboxConditional
        label="Add Button (Optional)"
        checked={ inputs.hasButton }
        callback={ handleToggle }
        name="add-button"
      >
        <label htmlFor="parallax-buttonLink">
          Add button link:
          <input
            id="parallax-buttonLink"
            name="buttonLink"
            onChange={ e => handleChange( e ) }
            type="text"
            value={ inputs.buttonLink }
          />
        </label>
        <label htmlFor="parallax-buttonText">
          Add button text:
          <input
            id="parallax-buttonText"
            name="buttonText"
            onChange={ e => handleChange( e ) }
            type="text"
            value={ inputs.buttonText }
          />
        </label>
        <label htmlFor="parallax-buttonStyle">
          Select Button Style:
          <select
            id="parallax-buttonStyle"
            name="buttonStyle"
            onChange={ e => handleChange( e ) }
            type="select"
            value={ inputs.buttonStyle }
          >
            <option value="minimal">Minimal</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </label>
        <label htmlFor="parallax-buttonArrow">
          Select Button Arrow Color:
          <select
            id="parallax-buttonArrow"
            name="buttonArrow"
            onChange={ e => handleChange( e ) }
            type="select"
            value={ inputs.buttonArrow }
          >
            <option value="white">White</option>
            <option value="red">Red</option>
          </select>
        </label>
      </CheckboxConditional>
      <FullWidthToggle callback={ handleWidth } checked={ inputs.fullWidth } />
    </Fragment>
  );
};

ParallaxForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default ParallaxForm;
