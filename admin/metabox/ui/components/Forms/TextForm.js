import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import { defaultBackgrounds, defaultText } from 'metabox/utils/color-picker-palettes';
import ArticleById from './FeedTypes/ArticleById';
import ButtonForm from './ButtonForm/ButtonForm';
import FullWidthToggle from './Toggles/FullWidthToggle';

const TextForm = ({ callback, meta }) => {
  const schema = {
    articles: meta.articles || [],
    blockBackground: meta.blockBackground || '#ffffff',
    buttonArrow: meta.buttonArrow || '',
    buttonLink: meta.buttonLink || '',
    buttonStyle: meta.buttonStyle || '',
    buttonText: meta.buttonText || '',
    desc: meta.desc || '',
    fullWidth: meta.fullWidth || false,
    hasButton: meta.hasButton || false,
    hasFeed: meta.hasFeed || false,
    hasVideo: meta.hasVideo || false,
    subtitle: meta.subtitle || '',
    textColor: meta.textColor || '#333333',
    title: meta.title || '',
    videoTitle: meta.videoTitle || '',
    videoURL: meta.videoURL || ''
  };

  const [inputs, setInputs] = useState(schema);

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect(() => {
    callback(formData);
  }, []);

  const updateInputs = (group, val) => {
    setInputs({ ...inputs, [group]: val });
    callback({ ...formData, [group]: val });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    updateInputs(name, value);
  };

  const handleToggle = e => {
    const { name } = e.target;
    const checked = !inputs[name];

    updateInputs(name, checked);
  };

  const updateArticles = val => {
    updateInputs('articles', val);
  };

  const handleColor = e => {
    const { group } = e.target.dataset;
    const { value } = e.target;

    updateInputs(group, value);
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
        selected={inputs.textColor}
      />
      <ColorPicker
        callback={handleColor}
        colors={blockBgOptions}
        label="Set block background color:"
        selected={inputs.blockBackground}
      />
      <label htmlFor="text-title">
        Add title:
        <input
          id="text-title"
          name="title"
          onChange={e => handleChange(e)}
          type="text"
          value={inputs.title}
        />
      </label>
      <label htmlFor="text-subtitle">
        Add sub-title:
        <input
          id="text-subtitle"
          name="subtitle"
          onChange={e => handleChange(e)}
          type="text"
          value={inputs.subtitle}
        />
      </label>
      <label htmlFor="text-desc">
        Add description:
        <textarea
          id="text-desc"
          name="desc"
          onChange={e => handleChange(e)}
          rows="6"
          value={inputs.desc}
        />
      </label>
      <FullWidthToggle callback={handleToggle} checked={inputs.fullWidth} />
      <CheckboxConditional
        label="Add Button (Optional)"
        checked={inputs.hasButton}
        callback={handleToggle}
        name="hasButton"
      >
        <ButtonForm callback={handleChange} inputs={inputs} />
      </CheckboxConditional>
      <CheckboxConditional
        callback={handleToggle}
        checked={inputs.hasVideo}
        label="Add a Video?"
        name="hasVideo"
      >
        <label htmlFor="video-title">
          Add Video Title:
          <input
            id="video-title"
            name="videoTitle"
            onChange={e => handleChange(e)}
            type="text"
            value={inputs.videoTitle}
          />
        </label>
        <label htmlFor="video-url">
          Add Video URL (for YouTube use the embed link format
          https://www.youtube.com/embed/VIDEOID):
          <input
            id="video-url"
            name="videoURL"
            onChange={e => handleChange(e)}
            type="text"
            value={inputs.videoURL}
          />
        </label>
      </CheckboxConditional>
      <CheckboxConditional
        callback={handleToggle}
        checked={inputs.hasFeed}
        label="Add an Article Feed?"
        name="hasFeed"
      >
        <ArticleById inputs={inputs} updateState={updateArticles} />
      </CheckboxConditional>
    </Fragment>
  );
};

TextForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default TextForm;
