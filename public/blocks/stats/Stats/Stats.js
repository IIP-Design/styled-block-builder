import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { TimelineMax, Power2 } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { v4 as uuid } from 'uuid';

import './Stats.module.scss';

const Stats = ( { id } ) => {
  const { meta } = window[`gpalabStats${id}`];

  if ( meta ) {
    const { background, stats, title } = meta;

    useEffect( () => {
      // const runStats = () => {
      const tl = new TimelineMax(); // Set up new timeline for tweens

      const statOne = document.getElementById( 'stat-1' );
      const statTwo = document.getElementById( 'stat-2' );
      const statThree = document.getElementById( 'stat-3' );

      // Initialize counters with 0 values
      const counter = {
        one: { val: 0 },
        two: { val: 0 },
        three: { val: 0 }
      };

      // Change the value displayed by the stats block
      const countUp = ( el, count ) => {
        el.innerHTML = Math.ceil( count.val );
      };

      if ( statOne && statTwo && statThree ) {
        tl.to( counter.one, 5, {
          val: statOne.getAttribute( 'data-stat' ),
          onUpdate: () => countUp( statOne, counter.one ),
          ease: Power2.easeOut
        } )
          .to(
            counter.two,
            5,
            {
              val: statTwo.getAttribute( 'data-stat' ),
              onUpdate: () => countUp( statTwo, counter.two ),
              ease: Power2.easeOut
            },
            0 // Start without delay
          )
          .to(
            counter.three,
            5,
            {
              val: statThree.getAttribute( 'data-stat' ),
              onUpdate: () => countUp( statThree, counter.three ),
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
    } );

    return (
      <div styleName="box-bg" style={ { backgroundImage: `url(${background})` } }>
        <div styleName="opacity-overlay" id="stats-section" />
        <div className="stats-container" styleName="container">
          { title && <h2 styleName="title">{ title }</h2> }
          <div styleName="array">
            { stats &&
              stats.map( ( stat, index ) => (
                <div key={ uuid() } styleName="item">
                  <div styleName="item-percent">
                    <span id={ `stat-${index + 1}` } data-stat={ stat.number }>
                      0
                    </span>
                    %
                  </div>
                  <p styleName="item-info">{ stat.title }</p>
                </div>
              ) ) }
          </div>
        </div>
      </div>
    );
  }

  return null;
};

Stats.propTypes = {
  id: propTypes.string
};

export default Stats;
