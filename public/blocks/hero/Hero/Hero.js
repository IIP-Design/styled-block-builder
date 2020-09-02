import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from 'blocks/_shared/components/AnimatedLines/AnimatedLines';
import Background from 'blocks/_shared/components/Background/Background';
import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Hero.module.scss';

const Hero = ( { id } ) => {
  const { meta } = window[`gpalabHero${id}`];

  if ( meta ) {
    const {
      align,
      buttons,
      description,
      files,
      lines,
      subtitle,
      textColor,
      title,
      type,
    } = meta;

    const titleAlignment = align === 'center' || align === 'title' ? 'center' : 'left';
    const contentAlignment = align === 'center' ? 'content-center' : 'content-left';

    return (
      <Normalizer fullWidth>
        <Background
          backgroundType="image"
          files={ files }
          gradient
        >
          <div styleName="hero">
            { title && (
              <h2 className="gpalab-site-specific" style={ { textAlign: titleAlignment, color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            { subtitle && (
              <h3 className="gpalab-site-specific" style={ { textAlign: titleAlignment, color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <div styleName={ `content ${contentAlignment}` }>
              <div styleName="text">
                { type === 'text' && (
                  <div
                    className="light"
                    dangerouslySetInnerHTML={ { __html: description } }
                    style={ { textAlign: titleAlignment, color: textColor } }
                    styleName="text-large"
                  />
                ) }
                { type === 'lines' && (
                  <AnimatedLines
                    align={ align }
                    color={ textColor }
                    lines={ lines }
                  />
                ) }
              </div>
              <div styleName="button-container">
                { buttons && buttons.map( button => (
                  <Button
                    key={ button.id }
                    arrow={ button.buttonArrow }
                    border={ button.buttonBorder }
                    color={ button.buttonColor }
                    link={ button.buttonLink }
                    text={ button.buttonText }
                  />
                ) ) }
              </div>
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Hero.propTypes = {
  id: propTypes.string,
};

export default Hero;
