import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { getBackgroundAlt, setBackgroundImage } from 'blocks/_shared/utils/background-style';

import './Timeline.module.scss';

const Timeline = ( { id } ) => {
  const { meta } = window[`gpalabTimeline${id}`];

  const [selected, setSelected] = useState( {} );

  useEffect( () => {
    if ( meta?.timeline && meta.timeline.length > 0 ) {
      setSelected( meta.timeline[0] );
    }
  }, [] );

  const isMobile = window.innerWidth <= 768;

  const updateSelected = ( e, timeline ) => {
    const itemId = e?.target?.dataset?.id ? e.target.dataset.id : '';

    if ( itemId !== selected.id ) {
      const newEvent = timeline.filter( event => event.id === itemId )[0];

      setSelected( newEvent );
    }
  };

  const getColor = ( itemId, el ) => {
    // Set color values
    const activeDotColor = '#c1a783';
    const activeTextColor = '#333333';
    const inactiveColor = '#666666';

    const active = el === 'dot' ? activeDotColor : activeTextColor;

    const color = itemId === selected.id ? active : inactiveColor;

    return color;
  };

  const getGridStyle = num => {
    if ( isMobile ) {
      return { gridTemplateRows: `repeat(${num}, 1fr)` };
    }

    return { gridTemplateColumns: `repeat(${num}, 1fr)` };
  };

  if ( meta?.timeline ) {
    const { title, fullWidth, timeline } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div id="timeline-section" styleName="bg">
          <div
            aria-label={ getBackgroundAlt( selected.files ) }
            role="img"
            style={ selected?.files ? setBackgroundImage( selected.files ) : {} }
            styleName="overlay"
          />

          <h2 className="gpalab-site-specific" styleName="title">{ title }</h2>

          <h3 styleName={ isMobile ? 'slide-title-mobile' : 'slide-title' }>
            { selected.subtitle || '' }
          </h3>

          <div styleName="container">
            <div style={ getGridStyle( timeline.length ) } styleName="line">
              { timeline.map( event => (
                <span
                  key={ event.id }
                  data-id={ event.id }
                  style={ { backgroundColor: getColor( event.id, 'dot' ) } }
                  styleName="dot"
                  onMouseEnter={ e => updateSelected( e, timeline ) }
                />
              ) ) }
            </div>

            <div style={ getGridStyle( timeline.length ) } styleName="cards">
              { timeline.map( event => (
                <div
                  key={ event.id }
                  data-id={ event.id }
                  styleName="card"
                  onMouseEnter={ e => updateSelected( e, timeline ) }
                >
                  <div
                    data-id={ event.id }
                    style={ { color: getColor( event.id ) } }
                    styleName="heading"
                  >
                    { event.year }
                  </div>
                  <p
                    data-id={ event.id }
                    style={ { color: getColor( event.id ) } }
                    styleName="text"
                  >
                    { event.text }
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Timeline.propTypes = {
  id: propTypes.string,
};

export default Timeline;
