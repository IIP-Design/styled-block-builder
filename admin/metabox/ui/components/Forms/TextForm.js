import React, { Fragment, useContext, useEffect } from 'react';

import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import ArticleById from './FeedTypes/ArticleById';
import ButtonForm from './ButtonForm/ButtonForm';
import FullWidthToggle from './Toggles/FullWidthToggle';

const TextForm = () => {
  const { dispatch, state } = useContext(MetaboxContext);

  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize color pickers with default values if no color already selected.
  useEffect(() => {
    if (!state?.formData?.formValues?.textColor) {
      dispatch({ type: 'form-update', payload: { name: 'textColor', value: '#333333' } });
    }

    if (!state?.formData?.formValues?.blockBackground) {
      dispatch({ type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } });
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    dispatch({ type: 'form-update', payload: { name: group, value } });
  };

  const handleToggle = e => {
    const { name } = e.target;
    const isChecked = formValues[name] || false;

    dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
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
        callback={handleColor}
        colors={textOptions}
        label="Set block text color:"
        selected={formValues.textColor}
      />
      <ColorPicker
        callback={handleColor}
        colors={blockBgOptions}
        label="Set block background color:"
        selected={formValues.blockBackground}
      />
      <label htmlFor="text-title">
        Add title:
        <input
          id="text-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="text-subtitle">
        Add sub-title:
        <input
          id="text-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="text-desc">
        Add description:
        <textarea
          id="text-desc"
          name="desc"
          rows="6"
          value={formValues.desc || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
      <CheckboxConditional
        callback={handleToggle}
        checked={formValues.hasButton}
        label="Add Button (Optional)"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
      <CheckboxConditional
        callback={handleToggle}
        checked={formValues.hasVideo}
        label="Add a Video?"
        name="hasVideo"
      >
        <label htmlFor="video-title">
          Add Video Title:
          <input
            id="video-title"
            name="videoTitle"
            type="text"
            value={formValues.videoTitle || ''}
            onChange={e => handleChange(e)}
          />
        </label>
        <label htmlFor="video-url">
          Add Video URL (for YouTube use the embed link format
          https://www.youtube.com/embed/VIDEOID):
          <input
            id="video-url"
            name="videoURL"
            type="text"
            value={formValues.videoURL || ''}
            onChange={e => handleChange(e)}
          />
        </label>
      </CheckboxConditional>
      <CheckboxConditional
        callback={handleToggle}
        checked={formValues.hasFeed}
        label="Add an Article Feed?"
        name="hasFeed"
      >
        <ArticleById />
      </CheckboxConditional>
    </Fragment>
  );
};

export default TextForm;
