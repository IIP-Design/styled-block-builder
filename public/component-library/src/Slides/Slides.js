import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import propTypes from 'prop-types';

import Normalizer from '../_shared/components/Normalizer/Normalizer';

import { getBackgroundAlt, getBackgroundImageUrl } from '../_shared/utils/background-style';

import './Slides.module.scss';

const Slides = ( { block, id } ) => {
  useEffect( () => {
    gsap.registerPlugin( ScrollTrigger );

    const container = document.querySelector( `#scene-container-${id}` );
    const slides = [...document.getElementsByClassName( `slide-${id}` )];
    const scrollBar = document.querySelector( `#scrollBar-${id}` );

    gsap.to( slides, {
      xPercent: -100 * ( slides.length - 1 ),
      ease: 'none',
      scrollTrigger: {
        trigger: `#scene-container-${id}`,
        pin: true,
        scrub: 1,
        snap: 1 / ( slides.length - 1 ),
        end: () => `+=${`${container.offsetWidth} + 100vh`}`,
      },
    } );

    gsap.to( scrollBar, {
      width: container.offsetWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: `#scene-container-${id}`,
        pin: true,
        scrub: 1,
        snap: 1 / ( slides.length - 1 ),
        end: () => `+=${`${container.offsetWidth} + 100vh`}`,
      },
    } );
  }, [id] );

  if ( block ) {
    const {
      slides,
      subTitleColor,
      title,
    } = block;

    return (
      <Normalizer fullWidth>
        <div id={ `scene-container-${id}` } styleName="slide-container">
          { title && <h2 className="gpalab-site-specific" styleName="slide-title">{ title }</h2> }
          <div id={ `pin-container-${id}` } styleName="pin-container" style={ { width: slides.length < 2 ? '100%' : `${100 * slides.length}%` } }>
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
                id={ `scrollBar-${id}` }
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
  block: propTypes.shape( {
    slides: propTypes.array,
    subTitleColor: propTypes.string,
    title: propTypes.string,
  } ),
  id: propTypes.string,
};

export default Slides;
