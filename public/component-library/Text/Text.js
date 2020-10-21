import React from 'react';
import propTypes from 'prop-types';

import Background from 'library/_shared/components/Background/Background';
import Button from 'library/_shared/components/Button/Button';
import CDPFeed from 'library/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'library/_shared/components/Normalizer/Normalizer';
import VideoEmbed from 'library/_shared/components/VideoEmbed/VideoEmbed';

import { getVideoUrl } from 'library/_shared/utils/video';
import { setLightClass } from 'library/_shared/utils/background-style';

import './Text.module.scss';

const Text = ( { id, block } ) => {
  if ( block ) {
    const {
      articles,
      backgroundGradient,
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
    } = block;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' && backgroundGradient === 'dark' }
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
            { buttons && (
              <div styleName="button-container">
                { buttons.map( button => (
                  <Button
                    key={ button.id }
                    config={ button }
                  />
                ) ) }
              </div>
            ) }
            { videos && videos.map( video => (
              <div key={ video.id } styleName="video-container">
                <VideoEmbed
                  desc={ video.description }
                  title={ video.title || video.id }
                  url={ getVideoUrl( video ) }
                />
              </div>
            ) ) }
            { articles && <CDPFeed id={ id } items={ articles } /> }
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  block: propTypes.shape( {
    articles: propTypes.array,
    backgroundGradient: propTypes.string,
    backgroundType: propTypes.string,
    blockBackground: propTypes.string,
    buttons: propTypes.array,
    desc: propTypes.string,
    files: propTypes.array,
    fullWidth: propTypes.bool,
    subtitle: propTypes.string,
    textColor: propTypes.string,
    title: propTypes.string,
    videos: propTypes.array,
  } ),
  id: propTypes.string,
};

export default Text;
