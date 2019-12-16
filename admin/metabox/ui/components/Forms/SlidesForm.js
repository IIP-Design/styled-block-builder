import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import TabbedForm from './TabbedForm/TabbedForm';

import './Forms.scss';

const SlidesForm = ( { callback, meta } ) => {
  // Set an initial object to load in the form,
  // populated with either values passed from parent or empty values
  const schema = {
    title: meta.title || '',
    slides: meta.slides || []
  };

  const [inputs, setInputs] = useState( schema );

  // Intermediate variable because state mutations are asynchronous
  // and can't be depended upon to update immediately
  const formData = { ...inputs };

  // Initialize the state on first render, otherwise
  // it will submit empty values if saved without making changes
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
    { label: 'Add slide subtitle:', name: 'subtitle', tabTitle: true, type: 'text' },
    { label: 'Add slide background:', name: 'background', type: 'text' },
    { label: 'Add slide text:', name: 'text', type: 'textarea' }
  ];

  return (
    <Fragment>
      <label htmlFor="slides-title">
        Add title:
        <input
          id="slides-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <TabbedForm
        fields={ tabFields }
        group="slides"
        inputs={ inputs }
        label="Slides"
        stateFunc={ tabStateFunc }
      />
    </Fragment>
  );
};

SlidesForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default SlidesForm;
