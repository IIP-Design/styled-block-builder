import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';
import { backgroundStyle, setLightClass } from 'blocks/_shared/utils/background-style';

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
      videos,
    } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div style={ backgroundStyle( blockBackground ) } styleName="bg">
          <div styleName="container">
            { title && (
              <h2 className="gpalab-site-specific" style={ { color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            { subtitle && (
              <h3 className="gpalab-site-specific" style={ { color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <div styleName="content">
              { desc && <div className={ setLightClass( textColor ) } dangerouslySetInnerHTML={ { __html: desc } } style={ { color: textColor } } styleName="description" /> }
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
          { videos && videos.map( video => (
            <VideoEmbed
              key={ video.id }
              desc={ video.description }
              title={ video.title || video.id }
              url={ video.url }
            />
          ) ) }
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
