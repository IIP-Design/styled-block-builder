import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { setBackgroundImage } from 'blocks/_shared/utils/background-style';

import './Parallax.module.scss';

const Parallax = ({ id }) => {
  const { meta } = window[`gpalabParallax${id}`];

  if (meta) {
    const {
      buttonArrow,
      buttonLink,
      buttonText,
      buttonStyle,
      files,
      fullWidth,
      hasButton,
      subtitle,
      text,
      title
    } = meta;

    return (
      <Normalizer fullWidth={fullWidth}>
        <div style={setBackgroundImage(files)} styleName="box-bg">
          <Gradient>
            <div styleName="fixed">
              <div styleName="content">
                {title && <h2 styleName="title">{title}</h2>}
                {subtitle && <h3 styleName="subtitle">{subtitle}</h3>}
                {text && <div styleName="text">{text}</div>}
                {hasButton && (
                  <Button
                    arrow={buttonArrow}
                    link={buttonLink}
                    style={buttonStyle}
                    text={buttonText}
                  />
                )}
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
