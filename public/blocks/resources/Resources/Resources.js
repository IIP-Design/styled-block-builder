import React from 'react';
import propTypes from 'prop-types';

import BaseLayout from './Layouts/BaseLayout';
import VideoLayout from './Layouts/VideoLayout';

import mockData from './mockdata';
import './Resources.scss';

const Resources = ( { data } ) => (
  <div
    className="resource-bg"
    id="resource-section"
    style={ {
      backgroundImage: "url('https://policystatic.state.gov/uploads/2019/11/wavy-bg.jpg')"
    } }
  >
    <h2 className="resource-title">{ mockData.title }</h2>

    <h4 className="resource-subtitle">{ mockData.subtitle }</h4>

    <div className="resource">
      <div className="resource-nav">
        { mockData.resources.map( resource => (
          <button className="resource-button" id={ resource.id } key={ resource.id } type="button">
            { resource.title }
          </button>
        ) ) }
      </div>

      { mockData.resources.map( resource => {
        if ( resource.type === 'base' ) {
          return <BaseLayout data={ resource } key={ resource.id } />;
        }

        if ( resource.type === 'video' ) {
          return <VideoLayout data={ resource } key={ resource.id } />;
        }

        return null;
      } ) }
    </div>
  </div>
);

Resources.propTypes = {
  data: propTypes.object
};

export default Resources;
