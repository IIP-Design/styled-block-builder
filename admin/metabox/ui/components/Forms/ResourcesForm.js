import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

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

  const handleChange = e => {
    const { name, value } = e.target;

    setInputs( { ...inputs, [name]: value } );
    callback( { ...formData, [name]: value } );
  };

  const handleAddArrayInput = ( group, ...args ) => {
    // Create an object to store values for new resource
    const obj = {};
    args.forEach( arg => {
      obj[arg] = '';
      return obj;
    } );

    // Replicate resources array and add new resource object
    const clone = [...inputs[group]];
    clone.push( obj );

    // Update form state and parent data
    setInputs( { ...inputs, [group]: clone } );
    callback( { ...formData, [group]: clone } );
  };

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
      <button
        onClick={ () =>
          handleAddArrayInput( 'resources', 'sectionText', 'sectionTitle', 'sectionVideo' )}
        type="button"
      >
        Add Resource Section
      </button>
      { inputs.resources.map( ( resource, index ) => {
        const position = index + 1;

        return (
          <div className="tabbed-form" key={ position }>
            <label htmlFor="section-title">
              Add section title:
              <textarea
                id="section-title"
                name="sectionTitle"
                onChange={ e => handleChange( e ) }
                rows="6"
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
              <textarea
                id="section-video"
                name="sectionVideo"
                onChange={ e => handleChange( e ) }
                rows="6"
                value={ sectionVideo }
              />
            </label>
          </div>
        );
      } ) }
    </form>
  );
};

ResourcesForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default ResourcesForm;
