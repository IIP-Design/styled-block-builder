import React from 'react';
import propTypes from 'prop-types';

import VideoEmbed from '../../../_shared/components/VideoEmbed/VideoEmbed';

import './Layouts.module.scss';

const VideoLayout = ( { data } ) => (
  <div styleName="content-columns">
    <VideoEmbed title={ data.title } url={ data.video } />
    <div styleName="star-line">
      <span className="dashicons dashicons-star-filled" />
      <span className="dashicons dashicons-star-filled" />
      <span className="dashicons dashicons-star-filled" />
    </div>
    <h5 styleName="content-title">{ data.title }</h5>
    <div styleName="content-text">{ data.text }</div>
  </div>
);

VideoLayout.propTypes = {
  data: propTypes.object
};

export default VideoLayout;
