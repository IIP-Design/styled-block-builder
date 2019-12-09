import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';

const StatsForm = ( { callback, meta } ) => {
  const [background, setBackground] = useState( meta.background || '' );
  const [statOneNumber, setStatOneNumber] = useState( meta.statOneNumber || '' );
  const [statOneText, setStatOneText] = useState( meta.statOneText || '' );
  const [statTwoNumber, setStatTwoNumber] = useState( meta.statTwoNumber || '' );
  const [statTwoText, setStatTwoText] = useState( meta.statTwoText || '' );
  const [statThreeNumber, setStatThreeNumber] = useState( meta.statThreeNumber || '' );
  const [statThreeText, setStatThreeText] = useState( meta.statThreeText || '' );
  const [title, setTitle] = useState( meta.title || '' );

  const formData = {
    background,
    statOneNumber,
    statOneText,
    statTwoNumber,
    statTwoText,
    statThreeNumber,
    statThreeText,
    title
  };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const handleChange = e => {
    const { name, value } = e.target;

    switch ( name ) {
      case 'background':
        setBackground( value );
        callback( { ...formData, background: value } );
        break;
      case 'statOneNumber':
        setStatOneNumber( value );
        callback( { ...formData, statOneNumber: value } );
        break;
      case 'statOneText':
        setStatOneText( value );
        callback( { ...formData, statOneText: value } );
        break;
      case 'statTwoNumber':
        setStatTwoNumber( value );
        callback( { ...formData, statTwoNumber: value } );
        break;
      case 'statTwoText':
        setStatTwoText( value );
        callback( { ...formData, statTwoText: value } );
        break;
      case 'statThreeNumber':
        setStatThreeNumber( value );
        callback( { ...formData, statThreeNumber: value } );
        break;
      case 'statThreeText':
        setStatThreeText( value );
        callback( { ...formData, statThreeText: value } );
        break;
      case 'title':
        setTitle( value );
        callback( { ...formData, title: value } );
        break;
      default:
    }
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
          value={ background }
        />
      </label>
      <label htmlFor="stats-title">
        Add title:
        <input
          id="stats-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ title }
        />
      </label>
      <label htmlFor="stats-statOneNumber">
        Add Stat One Number:
        <input
          id="stats-statOneNumber"
          name="statOneNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statOneNumber }
        />
      </label>
      <label htmlFor="stats-statOneText">
        Add Stat One Text:
        <input
          id="stats-statOneText"
          name="statOneText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statOneText }
        />
      </label>
      <label htmlFor="stats-statTwoNumber">
        Add Stat Two Number:
        <input
          id="stats-statTwoNumber"
          name="statTwoNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statTwoNumber }
        />
      </label>
      <label htmlFor="stats-statTwoText">
        Add Stat Two Text:
        <input
          id="stats-statTwoText"
          name="statTwoText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statTwoText }
        />
      </label>
      <label htmlFor="stats-statThreeNumber">
        Add Stat Three Number:
        <input
          id="stats-statThreeNumber"
          name="statThreeNumber"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statThreeNumber }
        />
      </label>
      <label htmlFor="stats-statThreeText">
        Add Stat Three Text:
        <input
          id="stats-statThreeText"
          name="statThreeText"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ statThreeText }
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
