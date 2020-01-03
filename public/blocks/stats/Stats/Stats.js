import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { TimelineMax, Power2 } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { v4 as uuid } from 'uuid';

import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import { backgroundImage, backgroundStyle } from 'blocks/_shared/utils/background-style';

import './Stats.module.scss';

const Stats = ({ id }) => {
  const { assets } = window.gpalabTemplateFront;
  const { meta } = window[`gpalabStats${id}`];

  if (meta) {
    const { backgroundType, blockBackground, files, fullWidth, stats, textColor, title } = meta;

    const getBackgroundImage = fileList => {
      const bgImage = fileList.filter(file => file.name === 'backgroundImage');

      return bgImage[0].url;
    };

    const bg =
      backgroundType === 'image'
        ? backgroundImage(getBackgroundImage(files))
        : backgroundStyle(blockBackground, assets);

    useEffect(() => {
      // const runStats = () => {
      const tl = new TimelineMax(); // Set up new timeline for tweens

      const statOne = document.getElementById('stat-1');
      const statTwo = document.getElementById('stat-2');
      const statThree = document.getElementById('stat-3');

      // Initialize counters with 0 values
      const counter = {
        one: { val: 0 },
        two: { val: 0 },
        three: { val: 0 }
      };

      // Change the value displayed by the stats block
      const countUp = (el, count) => {
        el.innerHTML = Math.ceil(count.val);
      };

      if (statOne && statTwo && statThree) {
        tl.to(counter.one, 5, {
          val: statOne.getAttribute('data-stat'),
          onUpdate: () => countUp(statOne, counter.one),
          ease: Power2.easeOut
        })
          .to(
            counter.two,
            5,
            {
              val: statTwo.getAttribute('data-stat'),
              onUpdate: () => countUp(statTwo, counter.two),
              ease: Power2.easeOut
            },
            0 // Start without delay
          )
          .to(
            counter.three,
            5,
            {
              val: statThree.getAttribute('data-stat'),
              onUpdate: () => countUp(statThree, counter.three),
              ease: Power2.easeOut
            },
            0 // Start without Delay
          );
      }
      // };
      // Set the animation trigger using Scroll Magic
      /*  const start = document.querySelector( '.stats-container' );

      const controller = new ScrollMagic.Controller();

      if ( start ) {
        new ScrollMagic.Scene( {
          triggerElement: start,
          triggerHook: 'onCenter',
          duration: '100%'
        } )
          .setTween( runStats )
          .addTo( controller );
      } */
    });

    return (
      <Normalizer fullWidth={fullWidth}>
        <div styleName="box-bg" style={bg}>
          <Gradient>
            <div id="stats-section" />
            <div className="stats-container" styleName="container">
              {title && (
                <h2 style={{ color: textColor }} styleName="title">
                  {title}
                </h2>
              )}
              <div styleName="array">
                {stats &&
                  stats.map((stat, index) => (
                    <div key={uuid()} style={{ borderColor: textColor }} styleName="item">
                      <div style={{ color: textColor }} styleName="item-percent">
                        <span id={`stat-${index + 1}`} data-stat={stat.number}>
                          0
                        </span>
                        %
                      </div>
                      <p style={{ color: textColor }} styleName="item-info">
                        {stat.title}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </Gradient>
        </div>
      </Normalizer>
    );
  }

  return null;
};

Stats.propTypes = {
  id: propTypes.string
};

export default Stats;
