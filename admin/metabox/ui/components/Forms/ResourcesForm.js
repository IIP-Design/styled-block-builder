import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import TabbedForm from './TabbedForm';
import { keyGen } from '../../utils/generate-key';

const ResourcesForm = ( { callback, meta } ) => {
  // Set an initial object to load in the form,
  // populated with either values passed from parent or empty values
  const schema = {
    title: meta.title || '',
    subtitle: meta.subtitle || '',
    resources: meta.resources || []
  };

  const [sectionText, setSectionText] = useState( meta.sectionText || '' );
  const [sectionTitle, setSectionTitle] = useState( meta.sectionTitle || '' );
  const [sectionVideo, setSectionVideo] = useState( meta.sectionVideo || '' );
  const [inputs, setInputs] = useState( meta.inputs || schema );

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

  const tabFields = ['sectionText', 'sectionTitle', 'sectionVideo'];

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
        label="Add Resource Section"
        stateFunc={ tabStateFunc }
      >
        { inputs.resources.map( ( resource, index ) => (
          <Fragment key={ keyGen( index ) }>
            <label htmlFor="section-title">
              Add section title:
              <input
                id="section-title"
                name="sectionTitle"
                onChange={ e => handleChange( e ) }
                rows="6"
                type="text"
                value={ sectionTitle }
              />
            </label>
            <label htmlFor="section-text">
              Add section text:
              <textarea
                id="section-text"
                name="sectionText"
                onChange={ e => handleChange( e ) }
                value={ sectionText }
              />
            </label>
            <label htmlFor="section-video">
              Add video url:
              <input
                id="section-video"
                name="sectionVideo"
                onChange={ e => handleChange( e ) }
                rows="6"
                type="text"
                value={ sectionVideo }
              />
            </label>
          </Fragment>
        ) ) }
      </TabbedForm>
    </form>
  );
};

ResourcesForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default ResourcesForm;
