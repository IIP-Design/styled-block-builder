import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'library/_shared/components/CDPFeed/CDPFeed';
import Chevron from 'library/_shared/components/Chevron/Chevron';
import Normalizer from 'library/_shared/components/Normalizer/Normalizer';
import BaseLayout from './Layouts/BaseLayout';
import VideoLayout from './Layouts/VideoLayout';


import './Resources.module.scss';

const Resources = ( { assets, block } ) => {
  const [selected, setSelected] = useState( null );

  useEffect( () => {
    const first = block?.resources ? block.resources[0] : null;

    setSelected( first.id );
  }, [] );

  const isMobile = window.innerWidth <= 500;

  const toggleSelection = toggled => {
    const setTo = toggled === selected ? null : toggled;

    setSelected( setTo );
  };

  if ( block ) {
    const {
      fullWidth,
      resources,
      subtitle,
      title,
    } = block;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div
          style={ {
            backgroundImage: `url('${assets}wavy-bg.jpg')`,
          } }
          styleName="background"
        >
          { title && <h2 className="gpalab-site-specific" styleName="title">{ title }</h2> }

          { subtitle && <h3 className="gpalab-site-specific" styleName="subtitle">{ subtitle }</h3> }

          <div styleName="container">
            <div styleName="nav">
              { resources && !isMobile && resources.map( resource => {
                const styles = resource.id === selected ? 'nav-button' : 'nav-button inactive';

                return (
                  <button
                    key={ resource.id }
                    id={ resource.id }
                    styleName={ styles }
                    type="button"
                    onClick={ () => setSelected( resource.id ) }
                  >
                    { resource.tab || resource.title }
                  </button>
                );
              } ) }
            </div>

            { resources && resources.map( resource => {
              const type = resource.videos && resource.videos.length ? 'video' : 'base';
              let layout = null;

              if ( type === 'base' ) {
                layout = <BaseLayout data={ resource } />;
              }

              if ( type === 'video' ) {
                layout = <VideoLayout data={ resource } />;
              }

              if ( resource.id === selected || isMobile ) {
                return (
                  <div key={ resource.id } styleName="section-container">
                    { isMobile && (
                      <button id={ resource.id } styleName="section-mobile-toggle" type="button" onClick={ () => toggleSelection( resource.id ) }>
                        <strong className="gpalab-site-specific" styleName="section-mobile-title">{ resource.tab || resource.title }</strong>
                        <Chevron reverse={ resource.id === selected } />
                      </button>
                    ) }
                    <div styleName={ `section-content ${resource.id === selected ? 'mobile-show' : ''}` }>
                      { layout }
                      { resource.articles && (
                        <Fragment>
                          <hr styleName="section-hr" />
                          <div styleName="feed-container">
                            <CDPFeed id={ resource.id } items={ resource.articles } />
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
  assets: propTypes.string,
  block: propTypes.shape( {
    fullWidth: propTypes.bool,
    resources: propTypes.array,
    subtitle: propTypes.string,
    title: propTypes.string,
  } ),
};

export default Resources;
