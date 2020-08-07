import React from 'react';
import propTypes from 'prop-types';

import './VideoEmbed.module.scss';

const Video = ( { desc, title, url } ) => (
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
    { desc && <div className="gpalab-site-specific" dangerouslySetInnerHTML={ { __html: desc } } styleName="description" /> }
  </div>
);

Video.propTypes = {
  desc: propTypes.string,
  title: propTypes.string,
  url: propTypes.string,
};

export default Video;
