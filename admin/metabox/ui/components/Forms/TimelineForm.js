import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import TabbedForm from './TabbedForm/TabbedForm';
import FullWidthToggle from './Toggles/FullWidthToggle';

const TimelineForm = ( { callback, meta } ) => {
  // Set an initial object to load in the form,
  // populated with either values passed from parent or empty values
  const schema = {
    title: meta.title || '',
    events: meta.events || [],
    fullWidth: meta.fullWidth || false
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

  const handleToggle = () => {
    const checked = !inputs.fullWidth;

    setInputs( { ...inputs, fullWidth: checked } );
    callback( { ...formData, fullWidth: checked } );
  };

  const tabFields = [
    { label: 'Add Event Title:', name: 'subtitle', tabTitle: true, type: 'text' },
    { label: 'Add URL for Background Image:', name: 'image', type: 'text' },
    { label: 'Add Event Year:', name: 'year', type: 'text' },
    { label: 'Add Event Text (Short description of event):', name: 'text', type: 'text' }
  ];

  return (
    <Fragment>
      <label htmlFor="events-title">
        Add Block Title:
        <input
          id="events-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <TabbedForm
        fields={ tabFields }
        group="events"
        inputs={ inputs }
        label="Event"
        maxTabs={ 5 }
        stateFunc={ tabStateFunc }
      />
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </Fragment>
  );
};

TimelineForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default TimelineForm;
