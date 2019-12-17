import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Hero.module.scss';

const Hero = ( { id } ) => {
  const { meta } = window[`gpalabHero${id}`];

  if ( meta ) {
    const {
      title,
      subtitle,
      description,
      background,
      buttonText,
      buttonLink,
      buttonStyle,
      buttonArrow
    } = meta;

    return (
      <Normalizer fullWidth>
        <div
          styleName="content-background"
          id="hero-content-background"
          style={ { backgroundImage: `url(${background})` } }
        >
          <div styleName="overlay">
            <div styleName="header">
              <h1 styleName="header-title">{ title }</h1>
              <h3 styleName="header-subtitle">{ subtitle }</h3>
              <div styleName="header-text">
                <div styleName="header-text-column">
                  <p styleName="header-text-large">{ description }</p>
                  { buttonText && buttonLink && (
                    <Button
                      link={ buttonLink }
                      text={ buttonText }
                      style={ buttonStyle }
                      arrow={ buttonArrow }
                    />
                  ) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Normalizer>
    );
  }
  return null;
};

Hero.propTypes = {
  id: propTypes.string
};

export default Hero;
