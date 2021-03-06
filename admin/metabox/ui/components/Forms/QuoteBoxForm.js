import React, { Fragment, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import BackgroundForm from 'metabox/components/Forms/BackgroundForm/BackgroundForm';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';

import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { handleChange } from 'metabox/utils/event-handlers';
import { getModules } from 'metabox/utils/quill';

const QuoteBoxForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize style options with default values if none are already selected.
  useEffect( () => {
    if ( !state?.formData?.formValues?.textColor ) {
      dispatch( { type: 'form-update', payload: { name: 'textColor', value: '#333333' } } );
    }

    if ( !state?.formData?.formValues?.backgroundType ) {
      dispatch( { type: 'form-update', payload: { name: 'backgroundType', value: 'color' } } );
    }

    if ( !state?.formData?.formValues?.blockBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } } );
    }

    if ( !state?.formData?.formValues?.quoteBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'quoteBackground', value: '#ffffff' } } );
    }
  }, [] );

  const handleDesc = value => {
    dispatch( { type: 'form-update', payload: { name: 'desc', value } } );
  };

  const handleQuote = value => {
    dispatch( { type: 'form-update', payload: { name: 'quote', value } } );
  };

  const textOptions = {
    group: 'textColor',
    options: defaultText,
  };

  const quoteBgOptions = {
    group: 'quoteBackground',
    options: defaultBackgrounds,
  };

  return (
    <Fragment>
      <BackgroundForm />
      <ColorPicker
        colors={ textOptions }
        label="Set block text color:"
        selected={ formValues.textColor }
      />
      <label htmlFor="quote-box-title">
        Add Title:
        <input
          id="quote-box-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add Subtitle:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add Description:
        <ReactQuill
          id="quote-box-desc"
          modules={ getModules( ['align', 'lists'] ) }
          theme="snow"
          value={ formValues.desc || '' }
          onChange={ handleDesc }
        />
      </label>
      <ColorPicker
        colors={ quoteBgOptions }
        label="Set quote background color:"
        selected={ formValues.quoteBackground }
      />
      <label htmlFor="quote-box-quote">
        Add Quote:
        <ReactQuill
          id="quote-box-quote"
          modules={ getModules() }
          theme="snow"
          value={ formValues.quote || '' }
          onChange={ handleQuote }
        />
      </label>
      <ArticleById />
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default QuoteBoxForm;
