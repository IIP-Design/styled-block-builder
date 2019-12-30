import React from 'react';
import propTypes from 'prop-types';

import './ButtonForm.module.scss';

const ButtonForm = ({ callback, inputs }) => (
  <div styleName="form">
    <label htmlFor="button">
      Add button text:
      <input
        id="button-text"
        name="buttonText"
        onChange={e => callback(e)}
        type="text"
        value={inputs.buttonText}
      />
    </label>
    <label htmlFor="text-button-link">
      Add button link:
      <input
        id="button-link"
        name="buttonLink"
        onChange={e => callback(e)}
        type="text"
        value={inputs.buttonLink}
      />
    </label>

    <label htmlFor="text-button-style">
      Select Button Style:
      <select
        id="button-style"
        name="buttonStyle"
        onChange={e => callback(e)}
        type="select"
        value={inputs.buttonStyle}
      >
        <option value="minimal">Minimal</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
    </label>
    <label htmlFor="text-arrow-color">
      Select Button Arrow Color:
      <select
        id="arrow-color"
        name="buttonArrow"
        onChange={e => callback(e)}
        type="select"
        value={inputs.buttonArrow}
      >
        <option value="white">White</option>
        <option value="red">Red</option>
      </select>
    </label>
  </div>
);

ButtonForm.propTypes = {
  callback: propTypes.func,
  inputs: propTypes.object
};

export default ButtonForm;
