import React, { useContext, useEffect } from 'react';

import { AdminContext } from 'metabox/context/adminContext';

import './ButtonForm.module.scss';

const ButtonForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize button style options with default values if none are already selected.
  useEffect( () => {
    if ( !state?.formData?.formValues?.buttonStyle ) {
      dispatch( { type: 'form-update', payload: { name: 'buttonStyle', value: 'minimal' } } );
    }

    if ( !state?.formData?.formValues?.buttonArrow ) {
      dispatch( { type: 'form-update', payload: { name: 'buttonArrow', value: 'white' } } );
    }
  }, [dispatch, state] );

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch( { type: 'form-update', payload: { name, value } } );
  };

  if ( formValues ) {
    return (
      <div styleName="form">
        <label htmlFor="button-text">
          Add button text:
          <input
            id="button-text"
            name="buttonText"
            type="text"
            value={ formValues.buttonText || '' }
            onChange={ e => handleChange( e ) }
          />
        </label>

        <label htmlFor="button-link">
          Add button link:
          <input
            id="button-link"
            name="buttonLink"
            type="text"
            value={ formValues.buttonLink || '' }
            onChange={ e => handleChange( e ) }
          />
        </label>

        <label htmlFor="button-color">
          Select text color:
          <select
            id="button-color"
            name="buttonColor"
            type="select"
            value={ formValues.buttonColor }
            onBlur={ e => handleChange( e ) }
            onChange={ e => handleChange( e ) }
          >
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </label>

        <label htmlFor="button-border">
          Select border style:
          <select
            id="button-border"
            name="buttonBorder"
            type="select"
            value={ formValues.buttonBorder }
            onBlur={ e => handleChange( e ) }
            onChange={ e => handleChange( e ) }
          >
            <option value="plain">Plain</option>
            <option value="rounded">Rounded</option>
            <option value="none">None</option>
          </select>
        </label>

        <label htmlFor="arrow-color">
          Select arrow color:
          <select
            id="arrow-color"
            name="buttonArrow"
            type="select"
            value={ formValues.buttonArrow }
            onBlur={ e => handleChange( e ) }
            onChange={ e => handleChange( e ) }
          >
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="gold">Gold</option>
            <option value="red">Red</option>
            <option value="none">None</option>
          </select>
        </label>
      </div>
    );
  }

  return null;
};

export default ButtonForm;
