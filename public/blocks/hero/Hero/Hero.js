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
      buttons,
      description,
      files,
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
                { type === 'text' && (
                  <div
                    className="light"
                    dangerouslySetInnerHTML={ { __html: description } }
                    styleName="text-large"
                  />
                ) }
                { type === 'lines' && <AnimatedLines lines={ lines } /> }
              </div>
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
