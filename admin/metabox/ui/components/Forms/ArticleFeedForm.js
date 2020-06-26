import React, { Fragment, useContext, useEffect } from 'react';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { handleChange } from 'metabox/utils/event-handlers';

const ArticleFeedForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize color pickers with default values if no color already selected.
  useEffect( () => {
    if ( !state?.formData?.formValues?.textColor ) {
      dispatch( { type: 'form-update', payload: { name: 'textColor', value: '#333333' } } );
    }

    if ( !state?.formData?.formValues?.blockBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } } );
    }
  }, [] );

  const blockBgOptions = {
    group: 'blockBackground',
    options: defaultBackgrounds,
  };

  const textOptions = {
    group: 'textColor',
    options: defaultText,
  };

  return (
    <Fragment>
      <ColorPicker
        colors={ textOptions }
        label="Set block text color:"
        selected={ formValues.textColor }
      />
      <label htmlFor="article-feed-title">
        Add Title:
        <input
          id="article-feed-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="article-feed-subtitle">
        Add Subtitle:
        <input
          id="article-feed-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <ColorPicker
        colors={ blockBgOptions }
        label="Set block background color:"
        selected={ formValues.blockBackground }
      />
      <ArticleById />
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default ArticleFeedForm;
