import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';

const StatsForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    statOneNumber: meta.statOneNumber || '',
    statOneText: meta.statOneText || '',
    statTwoNumber: meta.statTwoNumber || '',
    statTwoText: meta.statTwoText || '',
    statThreeNumber: meta.statThreeNumber || '',
    statThreeText: meta.statThreeText || '',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

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

  return (
    <form className="gpalab-modal-form">
      <h3 className="gpalab-modal-form-title">Configure Your Stats Block:</h3>
      <label htmlFor="stats-background">
        Add Background Image URL:
        <input
          id="stats-background"
          name="background"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.background }
        />
      </label>
      <label htmlFor="stats-title">
        Add title:
        <input
          id="stats-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.title }
        />
      </label>
      <label htmlFor="stats-statOneNumber">
        Add Stat One Number:
        <input
          id="stats-statOneNumber"
          name="statOneNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statOneNumber }
        />
      </label>
      <label htmlFor="stats-statOneText">
        Add Stat One Text:
        <input
          id="stats-statOneText"
          name="statOneText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statOneText }
        />
      </label>
      <label htmlFor="stats-statTwoNumber">
        Add Stat Two Number:
        <input
          id="stats-statTwoNumber"
          name="statTwoNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statTwoNumber }
        />
      </label>
      <label htmlFor="stats-statTwoText">
        Add Stat Two Text:
        <input
          id="stats-statTwoText"
          name="statTwoText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statTwoText }
        />
      </label>
      <label htmlFor="stats-statThreeNumber">
        Add Stat Three Number:
        <input
          id="stats-statThreeNumber"
          name="statThreeNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statThreeNumber }
        />
      </label>
      <label htmlFor="stats-statThreeText">
        Add Stat Three Text:
        <input
          id="stats-statThreeText"
          name="statThreeText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ meta.statThreeText }
        />
      </label>
    </form>
  );
};

StatsForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default StatsForm;
