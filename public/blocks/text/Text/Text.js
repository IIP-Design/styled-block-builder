import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Text.module.scss';

const Text = ( { id } ) => {
  const { meta } = window[`gpalabText${id}`];

  if ( meta ) {
    const { button, color, desc, link, style, subtitle, title } = meta;

    return (
      <Normalizer>
        <div styleName="container">
          { title && <h2 styleName="title">{ title }</h2> }
          { subtitle && <h3 styleName="subtitle">{ subtitle }</h3> }
          <div styleName="content">{ desc && <div styleName="description">{ desc }</div> }</div>
          { button && link && <Button link={ link } text={ button } style={ style } arrow={ color } /> }
        </div>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  id: propTypes.string
};

export default Text;
