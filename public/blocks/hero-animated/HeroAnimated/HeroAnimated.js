import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from '../../_shared/components/AnimatedLines/AnimatedLines';

import './HeroAnimated.module.scss';
import mockData from './mockdata';

const HeroAnimated = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { title, subtitle, background, lines } = mockData;

  return (
    <div styleName="container" id="iran-section">
      <div styleName="background" style={ { backgroundImage: `url(${background})` } }>
        <div styleName="gradient-overlay" />
      </div>

      <div styleName="content-container">
        <h1 styleName="title">{ title }</h1>
        <h3 styleName="subtitle">
          <span styleName="title-highlight">{ subtitle }</span>
        </h3>
        <div styleName="content">
          <AnimatedLines lines={ lines } />
        </div>
      </div>
    </div>
  );
};

HeroAnimated.propTypes = {
  id: propTypes.string
};

export default HeroAnimated;
