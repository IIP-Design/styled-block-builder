import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from 'blocks/_shared/components/AnimatedLines/AnimatedLines';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './HeroAnimated.module.scss';

const HeroAnimated = ( { id } ) => {
  const { meta } = window[`gpalabHeroAnimated${id}`];

  if ( meta ) {
    const { title, subtitle, background, lines } = meta;

    return (
      <Normalizer>
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
      </Normalizer>
    );
  }

  return null;
};

HeroAnimated.propTypes = {
  id: propTypes.string
};

export default HeroAnimated;
