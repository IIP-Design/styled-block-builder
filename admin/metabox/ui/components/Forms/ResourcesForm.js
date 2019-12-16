import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import ArticleById from './FeedTypes/ArticleById';
import CheckboxConditional from './Toggles/CheckboxConditional';
import FullWidthToggle from './Toggles/FullWidthToggle';
import TabbedForm from './TabbedForm/TabbedForm';

const ResourcesForm = ( { callback, meta } ) => {
  // Set an initial object to load in the form,
  // populated with either values passed from parent or empty values
  const schema = {
    articles: meta.articles || [],
    fullWidth: meta.fullWidth || false,
    hasFeed: meta.hasFeed || false,
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

  const updateInputs = ( group, val ) => {
    setInputs( { ...inputs, [group]: val } );
    callback( { ...formData, [group]: val } );
  };

  const updateArticles = clone => {
    updateInputs( 'articles', clone );
  };

  const handleChange = e => {
    const { name, value } = e.target;

    updateInputs( name, value );
  };

  const handleToggle = e => {
    const { name } = e.target;
    const checked = !inputs[name];

    updateInputs( [name], checked );
  };

  const tabFields = [
    { label: 'Add section title:', name: 'title', tabTitle: true, type: 'text' },
    { label: 'Add section text:', name: 'text', type: 'textarea' },
    { label: 'Add video url:', name: 'video', type: 'text' }
  ];

  const fields = [{ name: 'postId' }, { name: 'source' }];

  return (
    <Fragment>
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
        stateFunc={ updateInputs }
      />
      <CheckboxConditional
        callback={ handleToggle }
        checked={ inputs.hasFeed }
        label="Add an Article Feed?"
        name="hasFeed"
      >
        <ArticleById fields={ fields } inputs={ inputs } updateState={ updateArticles } />
      </CheckboxConditional>
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </Fragment>
  );
};

ResourcesForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};
export default ResourcesForm;
