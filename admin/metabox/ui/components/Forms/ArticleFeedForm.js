import React, { Fragment, useContext, useEffect } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import { AdminContext } from 'metabox/context/adminContext';
import ArticleById from './FeedTypes/ArticleById';
import FullWidthToggle from './Toggles/FullWidthToggle';

const ArticleFeedForm = () => {
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

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleToggle = e => {
    const { name } = e.target;
    const isChecked = formValues[name] || false;

    dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    dispatch({ type: 'form-update', payload: { name: group, value } });
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
      <label htmlFor="article-feed-title">
        Add title (Optional):
        <input
          id="article-feed-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="article-feed-subtitle">
        Add sub-title (Optional):
        <input
          id="article-feed-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <ColorPicker
        callback={handleColor}
        colors={blockBgOptions}
        label="Set block background color:"
        selected={formValues.blockBackground}
      />
      <ArticleById />
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default ArticleFeedForm;
