import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';
import CheckboxConditional from './Toggles/CheckboxConditional';

const HeroForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    buttonArrow: meta.buttonArrow || '',
    buttonLink: meta.buttonLink || '',
    buttonStyle: meta.buttonStyle || '',
    buttonText: meta.buttonText || '',
    description: meta.description || '',
    subtitle: meta.subtitle || '',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

  const [hasButton, setHasButton] = useState( false );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const handleChange = e => {
    const { name, value } = e.target;

    setInputs( { ...inputs, [name]: value } );
    callback( { ...formData, [name]: value } );
  };

  const handleToggle = () => {
    const isChecked = !hasButton;

    setHasButton( isChecked );
  };

  return (
    <Fragment>
      <label htmlFor="hero-background">
        Add URL for Background Image:
        <input
          id="hero-background"
          name="background"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.background }
        />
      </label>
      <label htmlFor="hero-title">
        Add Title:
        <input
          id="hero-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="hero-subtitle">
        Add Subtitle:
        <input
          id="hero-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <label htmlFor="hero-description">
        Add main content area text:
        <textarea
          id="hero-description"
          name="description"
          onChange={ e => handleChange( e ) }
          type="text"
          rows="6"
          value={ inputs.description }
        />
      </label>
      <CheckboxConditional
        label="Add Button (Optional)"
        checked={ hasButton }
        callback={ inputs }
        name="add-button"
      >
        <label htmlFor="hero-buttonLink">
          Add button link:
          <input
            id="hero-buttonLink"
            name="buttonLink"
            onChange={ e => handleChange( e ) }
            type="text"
            value={ inputs.buttonLink }
          />
        </label>
        <label htmlFor="hero-buttonText">
          Add button text:
          <input
            id="hero-buttonText"
            name="buttonText"
            onChange={ e => handleChange( e ) }
            type="text"
            value={ inputs.buttonText }
          />
        </label>
        <label htmlFor="hero-buttonStyle">
          Select Button Style:
          <select
            id="hero-buttonStyle"
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
        <label htmlFor="hero-buttonColor">
          Select Button Arrow Color:
          <select
            id="hero-buttonColor"
            name="buttonColor"
            onChange={ e => handleChange( e ) }
            type="select"
            value={ inputs.buttonColor }
          >
            <option value="white">White</option>
            <option value="red">Red</option>
          </select>
        </label>
      </CheckboxConditional>
    </Fragment>
  );
};

HeroForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default HeroForm;
