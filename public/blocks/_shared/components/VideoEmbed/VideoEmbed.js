import React from 'react';
import propTypes from 'prop-types';

import './VideoEmbed.module.scss';

const Video = ( { title, url } ) => (
  <div className="gpalab-video-embed" styleName="video">
    <div styleName="video-responsive">
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src={ url }
        title={ title }
      />
    </div>
  </div>
);

Video.propTypes = {
  title: propTypes.string,
  url: propTypes.string,
};

export default Video;
