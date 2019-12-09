import React from 'react';
import propTypes from 'prop-types';
import Button from '../../_shared/components/Button/Button';

import './Text.module.scss';
import mockData from './mockdata';

const Text = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { description, buttonText, link, style, arrow, subtitle, title } = mockData;

  return (
    <div styleName="container">
      <h2 styleName="title">{ title }</h2>
      <h3 styleName="subtitle">{ subtitle }</h3>
      <div styleName="content">
        <div styleName="description">{ description }</div>
      </div>
      { buttonText && link && <Button link={ link } text={ buttonText } style={ style } arrow={ arrow } /> }
    </div>
  );
};

Text.propTypes = {
  id: propTypes.string
};

export default Text;
