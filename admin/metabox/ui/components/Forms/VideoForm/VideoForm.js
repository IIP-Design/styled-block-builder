import React, { Fragment, useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested
} from 'metabox/utils/event-handlers';

import './VideoForm.module.scss';

const VideoForm = ({ parentGroup, parentId }) => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [{ name: 'date' }, { name: 'url' }];

  if (formValues) {
    let videos;
    if (!parentGroup) {
      videos = formValues.videos || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter(item => item.id === parentId)[0];
      videos = current.videos || [];
    }

    return (
      <Fragment>
        {videos.map(video => (
          <div key={video.id} styleName="container">
            <h4 styleName="title">Video Data:</h4>
            <label htmlFor={`video-url-${video.id}`} styleName="label">
              Add video URL:
              <input
                data-itemid={video.id}
                id={`video-url-${video.id}`}
                name="url"
                type="text"
                value={video.url || ''}
                onChange={e => handleChangeNested(e, dispatch, 'videos', parentGroup, parentId)}
              />
            </label>
            <label htmlFor={`video-date-${video.id}`} styleName="label">
              Add date of video:
              <input
                data-itemid={video.id}
                id={`video-date-${video.id}`}
                name="date"
                type="text"
                value={video.date || ''}
                onChange={e => handleChangeNested(e, dispatch, 'videos', parentGroup, parentId)}
              />
            </label>
            <button
              className="button-secondary"
              data-itemid={video.id}
              styleName="button-remove"
              type="button"
              onClick={e => handleRemoveNested(e, dispatch, 'videos', parentGroup, parentId)}
            >
              Remove Video
            </button>
          </div>
        ))}
        {/* speakers */}
        {/* link */}
        <button
          className="button-secondary"
          style={videos && videos.length > 0 ? { display: 'none' } : { display: 'block' }}
          styleName="button-add"
          type="button"
          onClick={() => handleAddNested(dispatch, fields, 'videos', parentGroup, parentId)}
        >
          Add Video
        </button>
      </Fragment>
    );
  }

  return null;
};

VideoForm.propTypes = {
  parentGroup: propTypes.string,
  parentId: propTypes.string
};

VideoForm.defaultProps = {
  parentGroup: null,
  parentId: null
};

export default VideoForm;
