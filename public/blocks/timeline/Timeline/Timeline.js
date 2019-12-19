import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { TimelineMax } from 'gsap';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Timeline.module.scss';

const Timeline = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { meta } = window[`gpalabTimeline${id}`];

  if ( meta ) {
    const { title, fullWidth, events } = meta;

    useEffect( () => {
      const isMobile = window.innerWidth <= 768;

      // Get the top of the timeline section
      const timelineSection = document.getElementById( 'timeline-section' );
      const distanceFromTop = timelineSection.getBoundingClientRect().top;

      // Get all elements upons which we will be acting
      const cards = [...document.getElementsByClassName( 'Timeline-module-card' )];
      const dots = [...document.getElementsByClassName( 'Timeline-module-dot' )];
      const headers = [...document.getElementsByClassName( 'Timeline-module-slide-title-mobile' )];
      const images = [...document.getElementsByClassName( 'overlay' )];
      const titles = [...document.getElementsByClassName( 'Timeline-module-slide-title' )];

      // Set color values
      const activeColor = '#c1a783';
      const activeTextColor = '#333333';
      const inactiveColor = '#666666';
      const activeOpacity = '0.5';

      // Define how each timeline behaves
      const runTimeline = ( arr1, arr2, arr3 ) => {
        const activeBg = { backgroundColor: activeColor };
        const inactiveBg = { backgroundColor: activeTextColor };

        // Initialize timelines
        const tlDots = new TimelineMax( { repeat: -1 } );
        const tlHeaders = new TimelineMax( { repeat: -1 } );
        const tlPhoto = new TimelineMax( { repeat: -1 } );

        arr1.forEach( el => {
          tlDots.fromTo( el, 3.9, inactiveBg, activeBg ).to( el, 0.1, inactiveBg );
        } );

        arr2.forEach( el => {
          tlHeaders
            .fromTo( el, 2, { display: 'none' }, { display: 'flex' } )
            .to( el, 2, { display: 'none' } );
        } );

        arr3.forEach( el => {
          if ( el?.dataset?.photo ) {
            const activePhoto = {
              backgroundImage: `url('${el.dataset.photo}')`,
              opacity: activeOpacity,
              visibility: 'visible'
            };
            const inactivePhoto = { opacity: 0, visibility: 'hidden' };

            tlPhoto.fromTo( el, 3.9, inactivePhoto, activePhoto ).to( el, 0.1, inactivePhoto );
          }
        } );
      };

      // Kick off timeline animation when section reaches top of the screen
      const getScrollOffsets = () => {
        const doc = document;
        const w = window;

        let el;
        let x;
        let y;

        if ( typeof w.pageYOffset === 'number' ) {
          x = w.pageXOffset;
          y = w.pageYOffset;
        } else {
          el = doc.compatMode && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
          x = el.scrollLeft;
          y = el.scrollTop;
        }

        return { x, y };
      };

      const playWhenAtTop = e => {
        const off = getScrollOffsets().y;

        if (
          cards &&
          dots &&
          images &&
          cards.length > 0 &&
          dots.length > 0 &&
          images.length > 0 &&
          timelineSection &&
          off >= distanceFromTop
        ) {
          runTimeline( dots, headers, images );
          document.removeEventListener( 'scroll', playWhenAtTop );
          document.removeEventListener( 'touchmove', playWhenAtTop );
        }
      };

      // Add event listeners for automated animation if user is on mobile
      if ( isMobile ) {
        document.addEventListener( 'scroll', playWhenAtTop );
        document.addEventListener( 'touchmove', playWhenAtTop );
      }

      // Change elements on hover - for use on desktop
      const hoverEffect = el => {
        if ( el?.dataset?.year ) {
          const { year } = el.dataset;

          dots.forEach( dot => {
            if ( dot?.dataset?.year ) {
              if ( dot.dataset.year === year ) {
                dot.setAttribute( 'style', `background-color: ${activeColor}` );
              } else {
                dot.setAttribute( 'style', `background-color: ${inactiveColor}` );
              }
            }
          } );

          cards.forEach( card => {
            if ( card?.dataset?.year ) {
              if ( card.dataset.year === year ) {
                if ( card.children ) {
                  const children = [...card.children];
                  children.forEach( child => {
                    child.setAttribute( 'style', `color: ${activeTextColor}` );
                  } );
                }
              } else if ( card.children ) {
                const children = [...card.children];
                children.forEach( child => child.setAttribute( 'style', `color: ${inactiveColor}` ) );
              }
            }
          } );

          titles.forEach( title => {
            if ( title?.dataset?.year ) {
              if ( title.dataset.year === year ) {
                title.setAttribute( 'style', 'display: block' );
              } else {
                title.setAttribute( 'style', 'display: none' );
              }
            }
          } );

          images.forEach( image => {
            if ( image?.dataset?.year ) {
              if ( image.dataset.year === year ) {
                if ( image.dataset.photo ) {
                  const { photo } = image.dataset;

                  image.setAttribute(
                    'style',
                    `background-image: url('${photo}'); opacity: ${activeOpacity}; visibility: visible; `
                  );
                }
              } else {
                image.setAttribute( 'style', 'opacity: 0; visibility: hidden;' );
              }
            }
          } );
        }
      };

      // Add event listeners for hover-based changes if user is on desktop
      if ( !isMobile && cards ) {
        cards.forEach( card => card.addEventListener( 'mouseenter', () => hoverEffect( card ) ) );
        dots.forEach( dot => dot.addEventListener( 'mouseenter', () => hoverEffect( dot ) ) );
      }
    } );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <div styleName="bg" id="timeline-section">
          { events.map( event => (
            <div
              style={ { backgroundImage: `url(${event.image})` } }
              stylename="overlay"
              data-year={ event.year }
              data-photo={ event.image }
            />
          ) ) }
          { /* <div
          styleName="overlay"
          data-year="1908"
          data-photo="https://policystatic.state.gov/uploads/2019/11/1280px-Persian_Cossack_Brigade.jpg"
        />
        <div
          styleName="overlay"
          data-year="1979"
          data-photo="https://policystatic.state.gov/uploads/2019/11/AP_7911011398_Iran_protests.jpg"
        />
        <div
          styleName="overlay"
          data-year="1999"
          data-photo="https://policystatic.state.gov/uploads/2019/11/AP_9907110614.jpg"
        />
        <div
          styleName="overlay"
          data-year="2009"
          data-photo="https://policystatic.state.gov/uploads/2019/11/20122268454784734_20.jpg"
        /> */ }

          <h2 styleName="title">{ title }</h2>

          <div>
            <div styleName="slide-title" data-year={ events[0].year }>
              { events[0].subtitle }
            </div>
            <div styleName="slide-title" data-year={ events[1].year } style={ { display: 'none' } }>
              { events[1].subtitle }
            </div>
            <div styleName="slide-title" data-year={ events[2].year } style={ { display: 'none' } }>
              { events[2].subtitle }
            </div>
            <div styleName="slide-title" data-year={ events[3].year } style={ { display: 'none' } }>
              { events[3].subtitle }
            </div>
          </div>

          <div styleName="container">
            { events.map( event => (
              <div styleName="card" data-year={ event.year }>
                <div styleName="heading" style={ { color: '#333333' } }>
                  { event.year }
                </div>
                <p styleName="text" style={ { color: '#333333' } }>
                  { event.text }
                </p>
              </div>
            ) ) }

            { /* <div styleName="card" data-year="1908">
            <div styleName="heading" style={ { color: '#333333' } }>
              1908
            </div>
            <p styleName="text" style={ { color: '#333333' } }>
              Constitution/ Majlis
            </p>
          </div>

          <div styleName="card" data-year="1979">
            <div styleName="heading">1979</div>
            <p styleName="text">Movement hijacked by religious fundamentalists</p>
          </div>

          <div styleName="card" data-year="1999">
            <div styleName="heading">1999</div>
            <p styleName="text">Student protests</p>
          </div>

          <div styleName="card" data-year="2009">
            <div styleName="heading">2009</div>
            <p styleName="text">Green Movement</p>
          </div> */ }

            <div styleName="slide-title-mobile" id="tl-persia" data-year={ events[0].year }>
              { events[0].subtitle }
            </div>
            <div
              styleName="slide-title-mobile"
              id="tl-iran"
              data-year={ events[1].year }
              style={ { display: 'none' } }
            >
              { events[1].subtitle }
            </div>
            <div
              styleName="slide-title-mobile"
              id="tl-ir1"
              data-year={ events[2].year }
              style={ { display: 'none' } }
            >
              { events[2].subtitle }
            </div>
            <div
              styleName="slide-title-mobile"
              id="tl-ir2"
              data-year={ events[3].year }
              style={ { display: 'none' } }
            >
              { events[3].subtitle }
            </div>

            <div styleName="line">
              { events.map( event => (
                <span styleName="dot" data-year={ event.year } />
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
  id: propTypes.string
};

export default Timeline;
