import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from 'blocks/_shared/components/AnimatedLines/AnimatedLines';
import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Hero.module.scss';

const Hero = ({ id }) => {
  const { meta } = window[`gpalabHero${id}`];

  if (meta) {
    const {
      background,
      buttonArrow,
      buttonLink,
      buttonStyle,
      buttonText,
      description,
      hasButton,
      lines,
      subtitle,
      title,
      type
    } = meta;

    return (
      <Normalizer fullWidth>
        <div styleName="content-background" style={{ backgroundImage: `url(${background})` }}>
          <div styleName="overlay">
            <div styleName="header">
              {title && <h1 styleName="header-title">{title}</h1>}
              {subtitle && <h3 styleName="header-subtitle">{subtitle}</h3>}
              <div styleName="header-text">
                <div styleName="header-text-column">
                  <div>
                    {type === 'text' && <p styleName="header-text-large">{description}</p>}
                    {type === 'lines' && <AnimatedLines lines={lines} />}
                  </div>
                  {hasButton && (
                    <Button
                      arrow={buttonArrow}
                      link={buttonLink}
                      text={buttonText}
                      style={buttonStyle}
                    />
                  )}
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
