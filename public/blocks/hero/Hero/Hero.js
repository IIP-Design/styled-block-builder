import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from 'blocks/_shared/components/AnimatedLines/AnimatedLines';
import Button from 'blocks/_shared/components/Button/Button';
import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { backgroundImage } from 'blocks/_shared/utils/background-style';

import './Hero.module.scss';

const Hero = ({ id }) => {
  const { meta } = window[`gpalabHero${id}`];

  if (meta) {
    const {
      buttonArrow,
      buttonLink,
      buttonStyle,
      buttonText,
      description,
      files,
      hasButton,
      lines,
      subtitle,
      title,
      type
    } = meta;

    const getBackgroundImage = fileList => {
      const bgImage = fileList.filter(file => file.name === 'backgroundImage');

      return bgImage[0].url;
    };

    const bg = backgroundImage(getBackgroundImage(files));

    return (
      <Normalizer fullWidth>
        <div styleName="content-background" style={bg}>
          <Gradient>
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
          </Gradient>
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
