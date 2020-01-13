import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import gsap from 'gsap';

import './AnimatedLines.module.scss';

const AnimatedLines = ({ lines }) => {
  useEffect(() => {
    gsap.registerPlugin('CSSRulePlugin');

    const tl = gsap.timeline({ repeat: -1 });

    const lineArr = [...document.getElementsByClassName('hero-line')];

    lineArr.forEach(element => {
      tl.to(element, 2.5, { opacity: 1 }).to(element, 2.5, { opacity: 0, ease: 'power2' }, '+=1');
    });
  }, []);

  if (lines) {
    return lines.map(line => (
      <div key={line.text} className="hero-line" styleName="line">
        {line.text}
      </div>
    ));
  }

  return null;
};

AnimatedLines.propTypes = {
  lines: propTypes.array
};

export default AnimatedLines;
