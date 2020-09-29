import React, { useEffect } from 'react';
import propTypes from 'prop-types';

import Background from 'blocks/_shared/components/Background/Background';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import useVisibilityObserver from 'blocks/_shared/hooks/useVisibilityObserver';

import { getBlockById } from 'blocks/_shared/utils/blocks';
import { runStat } from './animations';

import './Stats.module.scss';

const Stats = ( { id } ) => {
  const block = getBlockById( id );

  /**
   * This hardcoded value is a place holder for a currently unused configuration.
   * Changing it to 'number' will result in a different stat animation that will tick
   * the stat value up from 0.
   */
  const animationType = 'opacity';

  const threshold = animationType === 'opacity' ? 0.5 : 0.75;

  const [ref, entry] = useVisibilityObserver( { threshold } );

  useEffect( () => {
    if ( entry.isIntersecting ) {
      const targetClass = animationType === 'opacity' ? '.gpalab-stat' : '.gpalab-stat-number';

      const rootEl = document.getElementById( `gpalab-${id}` );
      const stats = [...rootEl.querySelectorAll( targetClass )];

      stats.forEach( stat => runStat( stat.id, animationType ) );
    }
  }, [entry, id] );

  if ( block ) {
    const {
      backgroundType,
      blockBackground,
      files,
      fullWidth,
      stats,
      textColor,
      title,
    } = block;

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
                  <div
                    className="gpalab-stat"
                    id={ `stat-${stat.id}` }
                    style={ { color: textColor, opacity: animationType === 'opacity' ? '0.25' : '1' } }
                    styleName="item-value"
                  >
                    { stat.prefix }
                    <span
                      className="gpalab-stat-number"
                      data-stat={ stat.number }
                      id={ `stat-num-${stat.id}` }
                    >
                      { animationType === 'opacity' ? stat.number : 0 }
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
