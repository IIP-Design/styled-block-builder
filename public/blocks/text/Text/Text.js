import React from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Text.module.scss';

const Text = ( { id } ) => {
  const { meta } = window[`gpalabText${id}`];

  if ( meta ) {
    const { button, color, desc, fullWidth, link, style, subtitle, title, articles } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div styleName="container">
          { title && <h2 styleName="title">{ title }</h2> }
          { subtitle && <h3 styleName="subtitle">{ subtitle }</h3> }
          <div styleName="content">{ desc && <div styleName="description">{ desc }</div> }</div>
          { button && link && <Button link={ link } text={ button } style={ style } arrow={ color } /> }
        </div>
        { articles && <CDPFeed id={ id } items={ articles } /> }
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  id: propTypes.string
};

export default Text;
