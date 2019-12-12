import React from 'react';
import propTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import Normalizer from '../../_shared/components/Normalizer/Normalizer';

import './Slides.module.scss';
import mockData from './mockdata';

const Slides = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { title, slides } = mockData;

  // const slidesRemain = [...slides];

  // Slice the original Array to pull out the first item and then identify the remaining
  const first = slides.slice( 0, 1 )[0];
  const remaining = slides.slice( 1 );

  return (
    <Normalizer>
      <div styleName="slide-container">
        <h2 styleName="slide-title">{ title }</h2>
        <Controller>
          <Scene triggerHook="onLeave" duration="500%" pin>
            <Timeline wrapper={ <div styleName="pinContainer" /> }>
              <section
                styleName="slide"
                id={ `slide-${first.id}` }
                key={ first.id }
                style={ { backgroundImage: `url(${first.background})` } }
              >
                <div styleName="slide-content">
                  <h4 styleName="slide-subtitle">{ first.subtitle }</h4>
                  <div styleName="slide-text">{ first.text }</div>
                </div>
              </section>
              { remaining.map( slide => (
                <Tween from={ { x: '+100%' } } to={ { x: '0%' } }>
                  <section
                    styleName="slide"
                    id={ `slide-${slide.id}` }
                    key={ slide.id }
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
                    data-number={ slide.index }
                    id={ `slide-dot-${slide.id}` }
                  />
                ) ) }
              </div>
            </Timeline>
          </Scene>
        </Controller>
      </div>
    </Normalizer>
  );
};

Slides.propTypes = {
  id: propTypes.string
};

export default Slides;
