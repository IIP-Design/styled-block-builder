import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';
import { backgroundStyle } from 'blocks/_shared/utils/background-style';

import './Text.module.scss';

const Text = ( { id } ) => {
  const { meta } = window[`gpalabText${id}`];

  if ( meta ) {
    const {
      articles,
      blockBackground,
      buttonArrow,
      buttonBorder,
      buttonColor,
      buttonLink,
      buttonText,
      desc,
      fullWidth,
      hasButton,
      subtitle,
      textColor,
      title,
      videoTitle,
      videoURL,
    } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ backgroundStyle( blockBackground ) } styleName="bg">
          <div styleName="container">
            { title && (
              <h2 style={ { color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            { subtitle && (
              <h3 style={ { color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <div styleName="content">
              { desc && (
                <div style={ { color: textColor } } styleName="description">
                  { desc }
                </div>
              ) }
            </div>
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
          { videoURL && <VideoEmbed title={ videoTitle } url={ videoURL } /> }
          { articles && <CDPFeed id={ id } items={ articles } /> }
        </div>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  id: propTypes.string,
};

export default Text;
