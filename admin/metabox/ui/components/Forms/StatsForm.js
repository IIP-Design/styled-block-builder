import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import TabbedForm from './TabbedForm/TabbedForm';

import './Forms.scss';

const StatsForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    stats: meta.stats || [],
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const tabStateFunc = ( group, clone ) => {
    setInputs( { ...inputs, [group]: clone } );
    callback( { ...formData, [group]: clone } );
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setInputs( { ...inputs, [name]: value } );
    callback( { ...formData, [name]: value } );
  };

  const tabFields = [
    { label: 'Add stat title:', name: 'title', type: 'text' },
    { label: 'Add stat value:', name: 'number', type: 'text' }
  ];

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
      <TabbedForm
        fields={ tabFields }
        group="stats"
        inputs={ inputs }
        label="Stat"
        stateFunc={ tabStateFunc }
      />
    </form>
  );
};

StatsForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default StatsForm;
