import React, { Fragment, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import VideoForm from 'metabox/components/Forms/VideoForm/VideoForm';

import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { getModules } from 'metabox/utils/quill';
import { handleChange } from 'metabox/utils/event-handlers';

const TextForm = () => {
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

  const handleQuill = value => {
    dispatch( { type: 'form-update', payload: { name: 'desc', value } } );
  };

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
      <ColorPicker
        colors={ blockBgOptions }
        label="Set block background color:"
        selected={ formValues.blockBackground }
      />
      <label htmlFor="text-title">
        Add Title:
        <input
          id="text-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="text-subtitle">
        Add Subtitle:
        <input
          id="text-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="text-desc">
        Add Description:
        <ReactQuill
          id="text-desc"
          modules={ getModules( ['align', 'lists'] ) }
          theme="snow"
          value={ formValues.desc || '' }
          onChange={ handleQuill }
        />
      </label>
      <FullWidthToggle checked={ formValues.fullWidth } />
      <ButtonForm />
      <VideoForm />
      <CheckboxConditional
        checked={ formValues.hasFeed }
        label="Add an Article Feed?"
        name="hasFeed"
      >
        <ArticleById />
      </CheckboxConditional>
    </Fragment>
  );
};

export default TextForm;
