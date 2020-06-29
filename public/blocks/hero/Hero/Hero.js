import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from 'blocks/_shared/components/AnimatedLines/AnimatedLines';
import Button from 'blocks/_shared/components/Button/Button';
import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { getBackgroundAlt, setBackgroundImage } from 'blocks/_shared/utils/background-style';

import './Hero.module.scss';

const Hero = ( { id } ) => {
  const { meta } = window[`gpalabHero${id}`];

  if ( meta ) {
    const {
      align,
      buttonArrow,
      buttonBorder,
      buttonColor,
      buttonLink,
      buttonText,
      description,
      files,
      hasButton,
      lines,
      subtitle,
      title,
      type,
    } = meta;

    const alt = getBackgroundAlt( files );

    return (
      <Normalizer fullWidth>
        <div style={ setBackgroundImage( files ) } styleName="content-background">
          { alt && <span role="img" aria-label={ alt } /> }
          <Gradient>
            <div style={ { textAlign: align } } styleName="hero">
              { title && <h2 styleName="title" className="gpalab-site-specific">{ title }</h2> }
              { subtitle && <h3 styleName="subtitle" className="gpalab-site-specific">{ subtitle }</h3> }
              <div styleName="text">
                <div styleName="text-column">
                  { type === 'text' && <div dangerouslySetInnerHTML={ { __html: description } } styleName="text-large" /> }
                  { type === 'lines' && <AnimatedLines lines={ lines } /> }
                  { hasButton && (
                    <Button
                      arrow={ buttonArrow }
                      border={ buttonBorder }
                      color={ buttonColor }
                      link={ buttonLink }
                      text={ buttonText }
                    />
                  ) }
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
  id: propTypes.string,
};

export default Hero;
