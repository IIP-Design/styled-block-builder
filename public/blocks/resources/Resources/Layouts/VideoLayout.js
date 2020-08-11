import React, { Fragment } from 'react';
import propTypes from 'prop-types';

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
        <h4 className="gpalab-site-specific" styleName="content-title">{ data.title }</h4>
        { data.text && <div className="gpalab-site-specific" dangerouslySetInnerHTML={ { __html: data.text } } styleName="content-text" /> }
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
      </section>
    ) }
  </Fragment>
);

VideoLayout.propTypes = {
  data: propTypes.object,
};

export default VideoLayout;
