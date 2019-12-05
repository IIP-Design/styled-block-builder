import React from 'react';

const TextForm = () => (
  <form className="gpalab-modal-form">
    <h3 className="gpalab-modal-form-title">Configure Your Text Block:</h3>
    <label htmlFor="text-title">
      Add title:
      <input id="text-title" type="text" />
    </label>
    <label htmlFor="text-subtitle">
      Add sub-title:
      <input id="text-subtitle" type="text" />
    </label>
    <label htmlFor="text-desc">
      Add description:
      <textarea id="text-desc" rows="6" />
    </label>
    <label htmlFor="text-button">
      Add button text:
      <input id="text-button" type="text" />
    </label>
    <label htmlFor="text-button-link">
      Add button link:
      <input id="text-button-link" type="text" />
    </label>

    <label htmlFor="text-button-style">
      Select Button Style:
      <select>
        <option value="minimal">Minimal</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
    </label>
    <label htmlFor="text-arrow-color">
      Select Button Arrow Color:
      <select>
        <option value="white">White</option>
        <option value="red">Red</option>
      </select>
    </label>
  </form>
);

export default TextForm;
