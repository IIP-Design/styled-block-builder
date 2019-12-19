import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CheckboxConditional from './Toggles/CheckboxConditional';
import RadioConditional from './Toggles/RadioConditional';
import TabbedForm from './TabbedForm/TabbedForm';

const HeroForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    buttonArrow: meta.buttonArrow || '',
    buttonLink: meta.buttonLink || '',
    buttonStyle: meta.buttonStyle || '',
    buttonText: meta.buttonText || '',
    description: meta.description || '',
    hasButton: meta.hasButton || false,
    lines: meta.lines || [],
    subtitle: meta.subtitle || '',
    title: meta.title || '',
    type: meta.type || ''
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

  const options = [
    { label: 'Text', name: 'type', value: 'text' },
    { label: 'Animated lines', name: 'type', value: 'lines' }
  ];

  const tabFields = [{ label: 'Add Animated line:', name: 'text', tabTitle: true, type: 'text' }];

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
      <RadioConditional
        callback={ handleChange }
        checked={ inputs.type }
        label="What type of block would you like?"
        options={ options }
      />
      { inputs.type === 'text' && (
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
      ) }
      { inputs.type === 'lines' && (
        <TabbedForm
          fields={ tabFields }
          group="lines"
          inputs={ inputs }
          label="Line"
          maxTabs={ 10 }
          stateFunc={ updateState }
        />
      ) }
      <CheckboxConditional
        label="Add Button (Optional)"
        checked={ inputs.hasButton }
        callback={ handleToggle }
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
        <label htmlFor="hero-buttonArrow">
          Select Button Arrow Color:
          <select
            id="hero-buttonArrow"
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
    </Fragment>
  );
};

HeroForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default HeroForm;