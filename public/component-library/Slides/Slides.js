import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import * as ScrollMagic from 'scrollmagic';
import gsap, { TweenLite, TimelineLite } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

import Normalizer from 'library/_shared/components/Normalizer/Normalizer';

import { getBackgroundAlt, getBackgroundImageUrl } from 'library/_shared/utils/background-style';
import { getBlockById } from 'library/_shared/utils/blocks';

import './Slides.module.scss';

const Slides = ( { id } ) => {
  const block = getBlockById( id );

  useEffect( () => {
    gsap.registerPlugin( 'CSSRulePlugin' );

    ScrollMagicPluginGsap( ScrollMagic, TweenLite, TimelineLite );

    const controller = new ScrollMagic.Controller();

    const slides = [...document.getElementsByClassName( `slide-${id}` )];

    const first = slides.slice( 0, 1 )[0];
    const remaining = slides.slice( 1 );

    const tl = new TimelineLite();

    tl.add( first );

    remaining.forEach( slide => {
      tl.add( gsap.fromTo( slide, { xPercent: 100 }, { duration: 2, xPercent: 0, ease: 'linear' } ) );
    } );

    new ScrollMagic.Scene( {
      triggerElement: `#pin-container-${id}`,
      triggerHook: 'onLeave',
      duration: 2000,
    } )
      .setTween( tl )
      .setPin( `#pin-container-${id}` )
      .addTo( controller );
  }, [id] );

  const sceneVals = {};

  window.onload = () => {
    sceneVals.sceneStartPos
      = document.getElementById( `scene-container-${id}` ).getBoundingClientRect().top
      + document.documentElement.scrollTop;

    sceneVals.sceneEndPos
      = document.getElementById( `scene-container-${id}` ).getBoundingClientRect().bottom
      + document.documentElement.scrollTop;

    sceneVals.sceneHeight = document.getElementById( `scene-container-${id}` ).offsetHeight;
  };

  window.onscroll = () => {
    const currentPos = document.documentElement.scrollTop || document.body.scrollTop;

    // eslint-disable-next-line no-mixed-operators
    const scrolled = ( currentPos - sceneVals.sceneStartPos ) / ( sceneVals.sceneHeight - window.innerHeight ) * 100;

    if ( currentPos > sceneVals.sceneStartPos && currentPos < sceneVals.sceneEndPos ) {
      document.getElementById( 'scrollBar' ).style.width = `${scrolled}%`;
    } else {
      return false;
    }

    return false;
  };

  if ( block ) {
    const {
      title,
      slides,
      subTitleColor,
    } = block;

    return (
      <Normalizer fullWidth>
        <div id={ `scene-container-${id}` } styleName="slide-container">
          { title && <h2 className="gpalab-site-specific" styleName="slide-title">{ title }</h2> }
          <div id={ `pin-container-${id}` } styleName="pin-container">
            { slides.map( slide => {
              const alt = getBackgroundAlt( slide.files );

              return (
                <section
                  key={ slide.id }
                  className={ `slide-${id}` }
                  id={ `slide-${slide.id}` }
                  style={ { backgroundImage: `url(${getBackgroundImageUrl( slide.files )})` } }
                  styleName="slide"
                >
                  { alt && <span role="img" aria-label={ alt } /> }
                  <div styleName="slide-content">
                    <h3 className="gpalab-site-specific" style={ { backgroundColor: subTitleColor } } styleName="slide-subtitle">
                      { slide.subtitle }
                    </h3>
                    { slide.text && (
                      <div
                        className="light"
                        dangerouslySetInnerHTML={ { __html: slide.text } }
                        styleName="slide-text"
                      />
                    ) }
                  </div>
                </section>
              );
            } ) }
            <div styleName="progress-container">
              <div
                id="scrollBar"
                style={ { backgroundColor: subTitleColor } }
                styleName="progress-bar"
              />
            </div>
          </div>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Slides.propTypes = {
  id: propTypes.string,
};

export default Slides;
