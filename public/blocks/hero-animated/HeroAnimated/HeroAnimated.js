import React from 'react';
import propTypes from 'prop-types';

import './HeroAnimated.module.scss';
import mockData from './mockdata';

const HeroAnimated = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { title, subtitle, background, text1, text2, text3, text4, text5 } = mockData;

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
          <div styleName="line">{ text1 }</div>
          <div styleName="line">{ text2 }</div>
          <div styleName="line">{ text3 }</div>
          <div styleName="line">{ text4 }</div>
          <div styleName="line">{ text5 }</div>
        </div>
      </div>
      <div styleName="scroll-more">
        <p>Scroll Down</p>
        <div styleName="scroll-more-arrow">⌄</div>
      </div>
    </div>
  );
};

HeroAnimated.propTypes = {
  id: propTypes.string
};

export default HeroAnimated;
