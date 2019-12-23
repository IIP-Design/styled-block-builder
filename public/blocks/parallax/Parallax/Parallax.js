import React from 'react';
import propTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import Button from 'blocks/_shared/components/Button/Button';
import Gradient from 'blocks/_shared/components/Gradient/Gradient';

import './Parallax.module.scss';

const Parallax = ( { id } ) => {
  const { meta } = window[`gpalabParallax${id}`];

  if ( meta ) {
    const {
      title,
      subtitle,
      background,
      text,
      fullWidth,
      buttonLink,
      buttonText,
      buttonStyle,
      buttonArrow,
      hasButton
    } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div styleName="box-bg" style={ { backgroundImage: `url(${background})` } }>
          <Gradient>
            <div styleName="fixed">
              <div styleName="content">
                { title && <h2 styleName="title">{ title }</h2> }
                { subtitle && <h3 styleName="subtitle">{ subtitle }</h3> }
                { text && <div styleName="text">{ text }</div> }
                { hasButton && (
                  <Button
                    link={ buttonLink }
                    text={ buttonText }
                    style={ buttonStyle }
                    arrow={ buttonArrow }
                  />
                ) }
              </div>
            </div>
          </Gradient>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Parallax.propTypes = {
  id: propTypes.string
};

export default Parallax;
