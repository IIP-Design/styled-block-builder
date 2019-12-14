import React from 'react';
import propTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import './Slides.module.scss';

const Slides = ( { id } ) => {
  const { meta } = window[`gpalabSlides${id}`];

  if ( meta ) {
    const { title, slides } = meta;

    // Slice the original Array to pull out the first item and then identify the remaining
    const first = slides.slice( 0, 1 )[0];
    const remaining = slides.slice( 1 );

    return (
      <Normalizer fullWidth>
        <div styleName="slide-container">
          <h2 styleName="slide-title">{ title }</h2>
          <Controller>
            <Scene triggerHook="onLeave" duration="500%" pin>
              <Timeline wrapper={ <div styleName="pinContainer" /> }>
                <section
                  styleName="slide"
                  id={ `slide-${first.id}` }
                  style={ { backgroundImage: `url(${first.background})` } }
                >
                  <div styleName="slide-content">
                    <h4 styleName="slide-subtitle">{ first.subtitle }</h4>
                    <div styleName="slide-text">{ first.text }</div>
                  </div>
                </section>
                { remaining.map( slide => (
                  <Tween from={ { x: '+100%' } } to={ { x: '0%' } } key={ slide.id }>
                    <section
                      styleName="slide"
                      id={ `slide-${slide.id}` }
                      style={ { backgroundImage: `url(${slide.background})` } }
                    >
                      <div styleName="slide-content">
                        <h4 styleName="slide-subtitle">{ slide.subtitle }</h4>
                        <div styleName="slide-text">{ slide.text }</div>
                      </div>
                    </section>
                  </Tween>
                ) ) }
                <div styleName="slide-dot-container">
                  { slides.map( slide => (
                    <div
                      styleName="slide-dot"
                      data-number={ slide.id }
                      id={ `slide-dot-${slide.id}` }
                      key={ `dot-${slide.id}` }
                    />
                  ) ) }
                </div>
              </Timeline>
            </Scene>
          </Controller>
        </div>
      </Normalizer>
    );
  }
  return null;
};

Slides.propTypes = {
  id: propTypes.string
};

export default Slides;
