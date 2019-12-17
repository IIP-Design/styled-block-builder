import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';
import ArticleById from './FeedTypes/ArticleById';

const TextForm = ( { callback, meta } ) => {
  const schema = {
    button: meta.button || '',
    color: meta.color || '',
    desc: meta.desc || '',
    link: meta.link || '',
    style: meta.style || '',
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

  const fields = [{ name: 'postId' }, { name: 'source' }];

  const mock = {
    articles: [
      { postId: '592410', source: 'share' },
      { postId: '759726', source: 'share' },
      { postId: '769637', source: 'share' }
    ]
  };

  return (
    <Fragment>
      <label htmlFor="text-title">
        Add title:
        <input
          id="text-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="text-subtitle">
        Add sub-title:
        <input
          id="text-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <label htmlFor="text-desc">
        Add description:
        <textarea
          id="text-desc"
          name="desc"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.desc }
        />
      </label>
      <label htmlFor="text-button">
        Add button text:
        <input
          id="text-button"
          name="button"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.button }
        />
      </label>
      <label htmlFor="text-button-link">
        Add button link:
        <input
          id="text-button-link"
          name="link"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.link }
        />
      </label>

      <label htmlFor="text-button-style">
        Select Button Style:
        <select
          id="text-button-style"
          name="style"
          onChange={ e => handleChange( e ) }
          type="select"
          value={ inputs.style }
        >
          <option value="minimal">Minimal</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </label>
      <label htmlFor="text-arrow-color">
        Select Button Arrow Color:
        <select
          id="text-arrow-color"
          name="color"
          onChange={ e => handleChange( e ) }
          type="select"
          value={ inputs.color }
        >
          <option value="white">White</option>
          <option value="red">Red</option>
        </select>
      </label>
      <ArticleById fields={ fields } inputs={ mock } updateState={ tabStateFunc } />
    </Fragment>
  );
};

TextForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default TextForm;
