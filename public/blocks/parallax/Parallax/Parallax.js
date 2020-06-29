import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { getBackgroundAlt, setBackgroundImage } from 'blocks/_shared/utils/background-style';

import './Parallax.module.scss';

const Parallax = ( { id } ) => {
  const { meta } = window[`gpalabParallax${id}`];

  if ( meta ) {
    const {
      buttonArrow,
      buttonBorder,
      buttonColor,
      buttonLink,
      buttonText,
      desc,
      files,
      fullWidth,
      hasButton,
      subtitle,
      title,
    } = meta;

    const alt = getBackgroundAlt( files );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ setBackgroundImage( files ) } styleName="box-bg">
          { alt && <span role="img" aria-label={ alt } /> }
          <Gradient>
            <div styleName="fixed">
              <div styleName="content">
                { title && <h2 className="gpalab-site-specific" styleName="title">{ title }</h2> }
                { subtitle && <h3 className="gpalab-site-specific" styleName="subtitle">{ subtitle }</h3> }
                { desc && <div dangerouslySetInnerHTML={ { __html: desc } } styleName="text" /> }
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
          </Gradient>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Parallax.propTypes = {
  id: propTypes.string,
};

export default Parallax;
