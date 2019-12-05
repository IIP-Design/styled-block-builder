import React from 'react';
import propTypes from 'prop-types';
import Button from '../../Button/Button.js';

import './Text.scss';
import mockData from './mockdata';

const Text = ({ id }) => {
  // const { title } = window[`quotebox${id}`];
  const { description, buttonText, link, style, arrow, subtitle, title } = mockData;

  return (
    <div className="gpalab-temp-text-container">
      <h2 className="gpalab-temp-text-title">{title}</h2>
      <h3 className="gpalab-temp-text-subtitle">{subtitle}</h3>
      <div className="gpalab-temp-text-content">
        <div className="gpalab-temp-text-description">{description}</div>
      </div>
      {button && link && <Button link={link} text={buttonText} style={style} arrow={arrow} />}
      {/* <Button /> */}
    </div>
  );
};

Text.propTypes = {
  id: propTypes.string
};

export default Text;
