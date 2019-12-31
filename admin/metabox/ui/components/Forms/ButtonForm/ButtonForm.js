import React from 'react';
import propTypes from 'prop-types';

import './ButtonForm.module.scss';

const ButtonForm = ({ callback, inputs }) => (
  <div styleName="form">
    <label htmlFor="button-text">
      Add button text:
      <input
        id="button-text"
        name="buttonText"
        onChange={e => callback(e)}
        type="text"
        value={inputs.buttonText}
      />
    </label>
    <label htmlFor="button-link">
      Add button link:
      <input
        id="button-link"
        name="buttonLink"
        onChange={e => callback(e)}
        type="text"
        value={inputs.buttonLink}
      />
    </label>

    <label htmlFor="button-style">
      Select button style:
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
    <label htmlFor="arrow-color">
      Select button arrow color:
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
