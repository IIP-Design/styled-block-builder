import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';
import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';

import { getVideoUrl } from 'blocks/_shared/utils/video';

import './Layouts.module.scss';

const VideoLayout = ( { data } ) => (
  <Fragment>
    { data.text && (
      <section styleName="content-columns">
        { data.videos && data.videos.map( video => (
          <VideoEmbed
            key={ video.id }
            desc={ video.description }
            title={ video.title || video.id }
            url={ getVideoUrl( video ) }
          />
        ) ) }
        <div styleName="star-line">
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
        </div>
        <h3 className="gpalab-site-specific" styleName="content-title">{ data.title }</h3>
        { data.text && <div className="gpalab-site-specific" dangerouslySetInnerHTML={ { __html: data.text } } styleName="content-text" /> }
        { data.buttons && (
          <div styleName="button-container">
            { data.buttons.map( button => (
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
        ) }
      </section>
    ) }

    { !data.text && (
      <section styleName="content no-columns">
        <h3 className="gpalab-site-specific" styleName="video-only-title">{ data.title }</h3>
        { data.videos && data.videos.map( video => (
          <VideoEmbed
            key={ video.id }
            desc={ video.description }
            title={ video.title || video.id }
            url={ getVideoUrl( video ) }
          />
        ) ) }
        { data.buttons && (
          <div styleName="button-container">
            { data.buttons.map( button => (
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
        ) }
      </section>
    ) }
  </Fragment>
);

VideoLayout.propTypes = {
  data: propTypes.object,
};

export default VideoLayout;
