import React from 'react';
import propTypes from 'prop-types';

import Background from 'blocks/_shared/components/Background/Background';
import Button from 'blocks/_shared/components/Button/Button';
import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';

import { setLightClass } from 'blocks/_shared/utils/background-style';

import './Text.module.scss';

const Text = ( { id } ) => {
  const { meta } = window[`gpalabText${id}`];

  if ( meta ) {
    const {
      articles,
      backgroundType,
      blockBackground,
      buttons,
      desc,
      files,
      fullWidth,
      subtitle,
      textColor,
      title,
      videos,
    } = meta;

    const bgStyle = {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2.75rem 0 5rem',
    };

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ false }
          styles={ bgStyle }
        >
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
              { desc && (
                <div
                  className={ setLightClass( textColor ) }
                  dangerouslySetInnerHTML={ { __html: desc } }
                  style={ { color: textColor } }
                  styleName="description"
                />
              ) }
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
          { videos && videos.map( video => (
            <VideoEmbed
              key={ video.id }
              desc={ video.description }
              title={ video.title || video.id }
              url={ video.url }
            />
          ) ) }
          { articles && <CDPFeed id={ id } items={ articles } /> }
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  id: propTypes.string,
};

export default Text;
