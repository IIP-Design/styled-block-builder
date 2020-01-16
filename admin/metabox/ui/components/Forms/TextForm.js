import React, { Fragment, useContext, useEffect } from 'react';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import ButtonForm from 'metabox/components/Forms/ButtonForm/ButtonForm';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { handleChange } from 'metabox/utils/event-handlers';

const TextForm = () => {
  const { dispatch, state } = useContext(AdminContext);
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
        colors={textOptions}
        label="Set block text color:"
        selected={formValues.textColor}
      />
      <ColorPicker
        colors={blockBgOptions}
        label="Set block background color:"
        selected={formValues.blockBackground}
      />
      <label htmlFor="text-title">
        Add Title (Optional):
        <input
          id="text-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e, dispatch)}
        />
      </label>
      <label htmlFor="text-subtitle">
        Add Subtitle (Optional):
        <input
          id="text-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e, dispatch)}
        />
      </label>
      <label htmlFor="text-desc">
        Add Description (Optional):
        <textarea
          id="text-desc"
          name="desc"
          rows="6"
          value={formValues.desc || ''}
          onChange={e => handleChange(e, dispatch)}
        />
      </label>
      <FullWidthToggle checked={formValues.fullWidth} />
      <CheckboxConditional
        checked={formValues.hasButton}
        label="Add Button (Optional):"
        name="hasButton"
      >
        <ButtonForm />
      </CheckboxConditional>
      <CheckboxConditional
        checked={formValues.hasVideo}
        label="Add a Video (Optional):"
        name="hasVideo"
      >
        <label htmlFor="video-title">
          Add Video Title:
          <input
            id="video-title"
            name="videoTitle"
            type="text"
            value={formValues.videoTitle || ''}
            onChange={e => handleChange(e, dispatch)}
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
            onChange={e => handleChange(e, dispatch)}
          />
        </label>
      </CheckboxConditional>
      <CheckboxConditional
        checked={formValues.hasFeed}
        label="Add an Article Feed (Optional):"
        name="hasFeed"
      >
        <ArticleById />
      </CheckboxConditional>
    </Fragment>
  );
};

export default TextForm;
