import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import CDPFeed from '../../../_shared/components/CDPFeed/CDPFeed';

const VideoLayout = ( { data } ) => (
  <div className="resource-section" id={ data.id }>
    <div className="resource-section-content" id={ data.id }>
      <div className="resource-content-columns">
        <div className="video">
          <div className="video-responsive">
            <iframe
              title={ data.title }
              src={ data.video }
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="star-line">
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
          <span className="dashicons dashicons-star-filled" />
        </div>
        <p className="resource-content-title">{ data.title }</p>
        <div className="resource-content-text">{ data.text }</div>
      </div>
      { data.cdp && (
        <Fragment>
          <hr className="resource-hr" />
          <CDPFeed id={ data.id } items={ data.cdp } />
        </Fragment>
      ) }
    </div>
  </div>
);

VideoLayout.propTypes = {
  data: propTypes.object
};

export default VideoLayout;
