import React from 'react';
import propTypes from 'prop-types';

import Gradient from '../Gradient/Gradient';

import { backgroundStyle, getBackgroundAlt, setBackgroundImage } from '../../utils/background-style';

import './Background.module.scss';

const Background = ( { backgroundType, blockBackground, files, gradient, styles, children } ) => {
  const alt = getBackgroundAlt( files );

  const bg = backgroundType === 'image'
    ? setBackgroundImage( files )
    : backgroundStyle( blockBackground );

  let style;

  if ( styles ) {
    style = { ...bg, ...styles };
  } else {
    style = { ...bg };
  }

  return (
    <div style={ style } styleName="bg">
      { alt && <span role="img" aria-label={ alt } /> }
      <Gradient off={ !gradient }>
        { children }
      </Gradient>
    </div>
  );
};

Background.propTypes = {
  backgroundType: propTypes.string,
  blockBackground: propTypes.string,
  children: propTypes.element,
  files: propTypes.array,
  gradient: propTypes.bool,
  styles: propTypes.object,
};

Background.defaultProps = {
  gradient: false,
};

export default Background;
