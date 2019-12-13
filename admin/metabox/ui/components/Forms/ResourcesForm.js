import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import FullWidthToggle from './FullWidthToggle/FullWidthToggle';
import TabbedForm from './TabbedForm/TabbedForm';

const ResourcesForm = ( { callback, meta } ) => {
  // Set an initial object to load in the form,
  // populated with either values passed from parent or empty values
  const schema = {
    fullWidth: meta.fullWidth || false,
    resources: meta.resources || [],
    subtitle: meta.subtitle || '',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

  // Intermediate variable because state mutations are asynchronous
  // and can't be depended upon to update immediately
  const formData = { ...inputs };

  // Initialize the state on first render, otherwise
  // it will submit empty values if saved without making changes
  useEffect( () => {
    callback( inputs );
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

  const handleToggle = () => {
    const checked = !inputs.fullWidth;

    setInputs( { ...inputs, fullWidth: checked } );
    callback( { ...formData, fullWidth: checked } );
  };

  const tabFields = [
    { label: 'Add section text:', name: 'text', type: 'textarea' },
    { label: 'Add section title:', name: 'title', type: 'text' },
    { label: 'Add video url:', name: 'video', type: 'text' }
  ];

  return (
    <form className="gpalab-modal-form">
      <h3 className="gpalab-modal-form-title">Configure Your Resources Block:</h3>
      <label htmlFor="resources-title">
        Add title:
        <input
          id="resources-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="resources-subtitle">
        Add sub-title:
        <input
          id="resources-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <TabbedForm
        fields={ tabFields }
        group="resources"
        inputs={ inputs }
        label="Resource"
        stateFunc={ tabStateFunc }
      />
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </form>
  );
};

ResourcesForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default ResourcesForm;
