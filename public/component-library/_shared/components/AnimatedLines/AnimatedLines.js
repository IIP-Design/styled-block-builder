import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import gsap from 'gsap';

import './AnimatedLines.module.scss';

const AnimatedLines = ( { align, color, lines } ) => {
  useEffect( () => {
    gsap.registerPlugin( 'CSSRulePlugin' );

    const tl = gsap.timeline( { repeat: -1 } );

    const lineArr = [...document.getElementsByClassName( 'hero-line' )];

    lineArr.forEach( element => {
      tl.to( element, { duration: 2.5, opacity: 1 } ).to( element, {
        delay: 1,
        duration: 2.5,
        ease: 'power2',
        opacity: 0,
      } );
    } );
  }, [] );

  const alignment = align === 'center' ? { left: 0, right: 0, margin: '0 auto' } : {};
  const lineColor = color || '#ffffff';

  if ( lines ) {
    return lines.map( line => (
      <div key={ line.text } className="hero-line" style={ { ...alignment, color: lineColor } } styleName="line">
        { line.text }
      </div>
    ) );
  }

  return null;
};

AnimatedLines.propTypes = {
  lines: propTypes.array,
  style: propTypes.object,
};

export default AnimatedLines;
