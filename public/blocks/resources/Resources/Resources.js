import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import BaseLayout from './Layouts/BaseLayout';
import VideoLayout from './Layouts/VideoLayout';

import './Resources.module.scss';

const Resources = ( { id } ) => {
  const { meta } = window[`gpalabResources${id}`];

  const [selected, setSelected] = useState( null );

  useEffect( () => {
    const first = meta?.resources ? meta.resources[0] : null;
    setSelected( first.id );
  }, [] );

  const isMobile = window.innerWidth <= 500;

  if ( meta ) {
    return (
      <Normalizer fullWidth={ meta.fullWidth }>
        <div
          styleName="background"
          id="resource-section"
          style={ {
            backgroundImage: "url('https://policystatic.state.gov/uploads/2019/11/wavy-bg.jpg')"
          } }
        >
          <h2 styleName="title">{ meta.title }</h2>

          <h4 styleName="subtitle">{ meta.subtitle }</h4>

          <div styleName="container">
            <div styleName="nav">
              { meta.resources.map( resource => {
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

            { meta.resources.map( resource => {
              const type = resource.video ? 'video' : 'base';
              let layout = null;
              if ( type === 'base' ) {
                layout = <BaseLayout data={ resource } />;
              }

              if ( type === 'video' ) {
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
      </Normalizer>
    );
  }

  return null;
};

Resources.propTypes = {
  id: propTypes.string
};

export default Resources;
