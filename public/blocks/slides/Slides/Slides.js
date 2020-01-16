import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import * as ScrollMagic from 'scrollmagic';
import gsap, { TweenLite, TimelineLite } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
// import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import { getBackgroundImageUrl } from 'blocks/_shared/utils/background-style';

import './Slides.module.scss';

const Slides = ({ id }) => {
  const { meta } = window[`gpalabSlides${id}`];

  useEffect(() => {
    gsap.registerPlugin('CSSRulePlugin');

    ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);

    const controller = new ScrollMagic.Controller();

    const slides = [...document.getElementsByClassName(`slide-${id}`)];

    const first = slides.slice(0, 1)[0];
    const remaining = slides.slice(1);

    const tl = new TimelineLite();
    tl.add(first);

    remaining.forEach(slide => {
      tl.add(gsap.fromTo(slide, { xPercent: 100 }, { duration: 2, xPercent: 0, ease: 'linear' }));
    });

    new ScrollMagic.Scene({
      triggerElement: `#pin-container-${id}`,
      triggerHook: 'onLeave',
      duration: 1000
    })
      .setTween(tl)
      .setPin(`#pin-container-${id}`)
      .addTo(controller);
  }, []);

  if (meta) {
    const { title, slides, subTitleColor } = meta;

    return (
      <Normalizer fullWidth>
        <div styleName="slide-container">
          {title && <h2 styleName="slide-title">{title}</h2>}
          <div id={`pin-container-${id}`} styleName="pin-container">
            {slides.map(slide => (
              <section
                key={slide.id}
                className={`slide-${id}`}
                id={`slide-${slide.id}`}
                style={{ backgroundImage: `url(${getBackgroundImageUrl(slide.files)})` }}
                styleName="slide"
              >
                <div styleName="slide-content">
                  <h4 style={{ backgroundColor: subTitleColor }} styleName="slide-subtitle">
                    {slide.subtitle}
                  </h4>
                  <div styleName="slide-text">{slide.text}</div>
                </div>
              </section>
            ))}
            <div styleName="slide-dot-container">
              {slides.map(slide => (
                <div
                  key={`dot-${slide.id}`}
                  data-number={slide.id}
                  id={`slide-dot-${slide.id}`}
                  styleName="slide-dot"
                />
              ))}
            </div>
          </div>
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
