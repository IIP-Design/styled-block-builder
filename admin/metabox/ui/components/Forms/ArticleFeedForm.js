import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import ArticleById from './FeedTypes/ArticleById';
import FullWidthToggle from './Toggles/FullWidthToggle';

const ArticleFeedForm = ( { callback, meta } ) => {
  const schema = {
    articles: meta.articles || [],
    subtitle: meta.subtitle || '',
    title: meta.title || '',
    type: meta.type || 'byId',
    blockBackground: meta.blockBackground || '#ffffff',
    textColor: meta.textColor || '#333333'
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const updateState = clone => {
    setInputs( { ...inputs, articles: clone } );
    callback( { ...formData, articles: clone } );
  };

  const updateInputs = ( group, val ) => {
    setInputs( { ...inputs, [group]: val } );
    callback( { ...formData, [group]: val } );
  };

  const handleChange = e => {
    const { name, value } = e.target;

    updateInputs( name, value );
  };

  const handleToggle = e => {
    const { name } = e.target;
    const checked = !inputs.fullWidth;

    updateInputs( name, checked );
  };

  const handleColor = e => {
    console.log( e.target );
    const { group } = e.target.dataset;
    const { value } = e.target;

    updateInputs( group, value );
  };

  const blockBgOptions = {
    group: 'blockBackground',
    options: defaultBackgrounds
  };

  const textOptions = {
    group: 'textColor',
    options: defaultText
  };

  return (
    <Fragment>
      <ColorPicker
        callback={ handleColor }
        colors={ textOptions }
        label="Set block text color:"
        selected={ inputs.textColor }
      />
      <label htmlFor="article-feed-title">
        Add title (Optional):
        <input
          id="article-feed-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="article-feed-subtitle">
        Add sub-title (Optional):
        <input
          id="article-feed-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <ColorPicker
        callback={ handleColor }
        colors={ blockBgOptions }
        label="Set block background color:"
        selected={ inputs.blockBackground }
      />
      <ArticleById inputs={ inputs } updateState={ updateState } />
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </Fragment>
  );
};

ArticleFeedForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default ArticleFeedForm;
