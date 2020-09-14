import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import gsap from 'gsap';

import Background from 'blocks/_shared/components/Background/Background';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import useVisibilityObserver from 'blocks/_shared/hooks/useVisibilityObserver';

import './Stats.module.scss';

const Stats = ( { id } ) => {
  const { meta } = window[`gpalabStats${id}`];

  const [ref, entry] = useVisibilityObserver( { threshold: 0.50 } );

  const runStat = statId => {
    const counter = { val: 0.25 };
    const stat = document.getElementById( statId );

    const updateOpacity = () => {
      stat.style.opacity = counter.val.toFixed( 2 );
    };

    gsap.to( counter, {
      duration: 5,
      onUpdate: updateOpacity,
      val: 1.0,
    } );
  };

  useEffect( () => {
    if ( entry.isIntersecting ) {
      const block = document.getElementById( `gpalab-${id}` );
      const stats = [...block.querySelectorAll( '.stat-number' )];

      stats.forEach( stat => runStat( stat.id ) );
    }
  }, [entry, id] );

  if ( meta ) {
    const {
      backgroundType,
      blockBackground,
      files,
      fullWidth,
      stats,
      textColor,
      title,
    } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' }
          styles={ { backgroundAttachment: 'fixed' } }
        >
          <div ref={ ref } className="stats-container" styleName="container">
            { title && (
              <h2 className="gpalab-site-specific" style={ { color: textColor } } styleName="title">
                { title }
              </h2>
            ) }
            <div id={ `stats-${id}` } styleName="array">
              { stats && stats.map( stat => (
                <div key={ stat.id } style={ { borderColor: textColor } } styleName="item">
                  <div style={ { color: textColor } } styleName="item-value">
                    { stat.prefix }
                    <span
                      className="stat-number"
                      data-stat={ stat.number }
                      id={ `stat-${stat.id}` }
                    >
                      { stat.number }
                    </span>
                    { stat.unit && <span>{ stat.unit }</span> }
                  </div>
                  <p style={ { color: textColor } } styleName="item-info">
                    { stat.desc }
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Stats.propTypes = {
  id: propTypes.string,
};

export default Stats;
