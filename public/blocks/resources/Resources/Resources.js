import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import BaseLayout from './Layouts/BaseLayout';
import VideoLayout from './Layouts/VideoLayout';
import CDPFeed from '../../_shared/components/CDPFeed/CDPFeed';

import mockData from './mockdata';
import './Resources.module.scss';

const Resources = ( { data } ) => {
  const [selected, setSelected] = useState( null );

  useEffect( () => {
    const first = mockData?.resources ? mockData.resources[0] : null;
    setSelected( first.id );
  }, [] );

  const isMobile = window.innerWidth <= 500;

  return (
    <div
      styleName="background"
      id="resource-section"
      style={ {
        backgroundImage: "url('https://policystatic.state.gov/uploads/2019/11/wavy-bg.jpg')"
      } }
    >
      <h2 styleName="title">{ mockData.title }</h2>

      <h4 styleName="subtitle">{ mockData.subtitle }</h4>

      <div styleName="container">
        <div styleName="nav">
          { mockData.resources.map( resource => {
            const styles = resource.id === selected ? 'nav-button' : 'nav-button inactive';
            return (
              <button
                styleName={ styles }
                id={ resource.id }
                key={ resource.id }
                onClick={ () => setSelected( resource.id ) }
                type="button"
              >
                { resource.title }
              </button>
            );
          } ) }
        </div>

        { mockData.resources.map( resource => {
          let layout = null;
          if ( resource.type === 'base' ) {
            layout = <BaseLayout data={ resource } />;
          }

          if ( resource.type === 'video' ) {
            layout = <VideoLayout data={ resource } />;
          }

          if ( resource.id === selected || isMobile ) {
            return (
              <div id={ resource.id } key={ resource.id }>
                <div styleName="section-content" id={ resource.id }>
                  { layout }
                  { resource.cdp && (
                    <Fragment>
                      <hr styleName="section-hr" />
                      <div styleName="feed-container">
                        <CDPFeed id={ resource.id } items={ resource.cdp } />
                      </div>
                    </Fragment>
                  ) }
                </div>
              </div>
            );
          }

          return null;
        } ) }
      </div>
    </div>
  );
};

Resources.propTypes = {
  data: propTypes.object
};

export default Resources;
