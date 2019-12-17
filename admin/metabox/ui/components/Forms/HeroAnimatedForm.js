import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';
import TabbedForm from './TabbedForm/TabbedForm';

const HeroAnimatedForm = ( { callback, meta } ) => {
  const schema = {
    background: meta.background || '',
    lines: meta.lines || [],
    subtitle: meta.subtitle || '',
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

  const tabFields = [{ label: 'Add Animated line:', name: 'text', tabTitle: true, type: 'text' }];

  return (
    <Fragment>
      <label htmlFor="hero-animated-background">
        Add URL for Background Image:
        <input
          id="hero-animated-background"
          name="background"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.background }
        />
      </label>
      <label htmlFor="hero-animated-title">
        Add Title:
        <input
          id="hero-animated-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="hero-animated-subtitle">
        Add Subtitle:
        <input
          id="hero-animated-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <TabbedForm
        fields={ tabFields }
        group="lines"
        inputs={ inputs }
        label="Line"
        maxTabs={ 10 }
        stateFunc={ tabStateFunc }
      />
    </Fragment>
  );
};

HeroAnimatedForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default HeroAnimatedForm;
