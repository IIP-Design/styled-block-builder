import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';

import './Layouts.module.scss';

const VideoLayout = ( { data } ) => (
  <Fragment>
    { data.text && (
      <section styleName="content-columns">
        <VideoEmbed title={ data.title } url={ data.video } />
        <div styleName="star-line">
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
        </div>
        <h5 styleName="content-title">{ data.title }</h5>
        <div styleName="content-text">{ data.text }</div>
      </section>
    ) }

    { !data.text && (
      <section styleName="content no-columns">
        <h3 styleName="video-only-title">{ data.title }</h3>
        <VideoEmbed title={ data.title } url={ data.video } />
      </section>
    ) }
  </Fragment>
);

VideoLayout.propTypes = {
  data: propTypes.object,
};

export default VideoLayout;
