import React, { useState } from 'react';
import propTypes from 'prop-types';
// import { TimelineMax } from 'gsap';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Timeline.module.scss';

const Timeline = ({ id }) => {
  // const { title } = window[`quotebox${id}`];
  const { meta } = window[`gpalabTimeline${id}`];

  if (meta) {
    const { title, fullWidth, events } = meta;

    const isMobile = window.innerWidth <= 768;

    const [selected, setSelected] = useState(events[0] || null);

    // Get the top of the timeline section
    // const timelineSection = document.getElementById( 'timeline-section' );
    // const distanceFromTop = timelineSection.getBoundingClientRect().top;

    // Set color values
    const activeDotColor = '#c1a783';
    const activeTextColor = '#333333';
    const inactiveColor = '#666666';
    // const activeOpacity = '0.5';

    // Define how each timeline behaves
    // const runTimeline = (arr1, arr2, arr3) => {
    //   const activeBg = { backgroundColor: activeDotColor };
    //   const inactiveBg = { backgroundColor: activeTextColor };

    //   // Initialize timelines
    //   const tlDots = new TimelineMax({ repeat: -1 });
    //   const tlHeaders = new TimelineMax({ repeat: -1 });
    //   const tlPhoto = new TimelineMax({ repeat: -1 });

    //   arr1.forEach(el => {
    //     tlDots.fromTo(el, 3.9, inactiveBg, activeBg).to(el, 0.1, inactiveBg);
    //   });

    //   arr2.forEach(el => {
    //     tlHeaders
    //       .fromTo(el, 2, { display: 'none' }, { display: 'flex' })
    //       .to(el, 2, { display: 'none' });
    //   });

    //   arr3.forEach(el => {
    //     if (el?.dataset?.photo) {
    //       const activePhoto = {
    //         backgroundImage: `url('${el.dataset.photo}')`,
    //         opacity: activeOpacity,
    //         visibility: 'visible'
    //       };
    //       const inactivePhoto = { opacity: 0, visibility: 'hidden' };

    //       tlPhoto.fromTo(el, 3.9, inactivePhoto, activePhoto).to(el, 0.1, inactivePhoto);
    //     }
    //   });
    // };

    // const playWhenAtTop = e => {
    //   const off = getScrollOffsets().y;

    //   if (
    //     cards &&
    //     dots &&
    //     images &&
    //     cards.length > 0 &&
    //     dots.length > 0 &&
    //     images.length > 0 &&
    //     timelineSection &&
    //     off >= distanceFromTop
    //   ) {
    //     runTimeline( dots, headers, images );
    //     document.removeEventListener( 'scroll', playWhenAtTop );
    //     document.removeEventListener( 'touchmove', playWhenAtTop );
    //   }
    // };

    // useEffect(() => {
    // Add event listeners for automated animation if user is on mobile
    // if ( isMobile ) {
    //   document.addEventListener( 'scroll', playWhenAtTop );
    //   document.addEventListener( 'touchmove', playWhenAtTop );
    // }

    const updateSelected = e => {
      const year = e?.target?.dataset?.year ? e.target.dataset.year : '';

      if (year !== selected.year) {
        const newEvent = events.filter(event => event.year === year)[0];
        setSelected(newEvent);
      }
    };

    const getTextStyle = year => {
      const color = year === selected.year ? activeTextColor : inactiveColor;

      return color;
    };

    const getDotStyle = year => {
      const color = year === selected.year ? activeDotColor : inactiveColor;

      return color;
    };

    const getGridStyle = items => {
      if (isMobile) {
        return { gridTemplateRows: `repeat(${events.length}, 1fr)` };
      }

      return { gridTemplateColumns: `repeat(${events.length}, 1fr)` };
    };

    return (
      <Normalizer fullWidth={fullWidth}>
        <div id="timeline-section" styleName="bg">
          <div style={{ backgroundImage: `url('${selected.image || ''}')` }} styleName="overlay" />

          <h2 styleName="title">{title}</h2>

          <h3 styleName={isMobile ? 'slide-title-mobile' : 'slide-title'}>
            {selected.subtitle || ''}
          </h3>

          <div styleName="container">
            <div style={getGridStyle(events.length)} styleName="line">
              {events.map(event => (
                <span
                  key={event.year}
                  data-year={event.year}
                  onMouseEnter={e => updateSelected(e)}
                  style={{ backgroundColor: getDotStyle(event.year) }}
                  styleName="dot"
                />
              ))}
            </div>

            <div style={getGridStyle(events.length)} styleName="cards">
              {events.map(event => (
                <div
                  data-year={event.year}
                  key={event.year}
                  onMouseEnter={e => updateSelected(e)}
                  styleName="card"
                >
                  <div
                    data-year={event.year}
                    style={{ color: getTextStyle(event.year) }}
                    styleName="heading"
                  >
                    {event.year}
                  </div>
                  <p
                    data-year={event.year}
                    style={{ color: getTextStyle(event.year) }}
                    styleName="text"
                  >
                    {event.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Timeline.propTypes = {
  id: propTypes.string
};

export default Timeline;
