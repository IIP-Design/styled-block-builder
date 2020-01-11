import React, { useEffect, Fragment } from 'react';
import propTypes from 'prop-types';
import { TweenLite, Power2 } from 'gsap';
import { v4 as uuid } from 'uuid';

import Gradient from 'blocks/_shared/components/Gradient/Gradient';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import useVisibilityObserver from 'blocks/_shared/hooks/useVisibilityObserver';
import { backgroundStyle, setBackgroundImage } from 'blocks/_shared/utils/background-style';

import './Stats.module.scss';

const Stats = ({ id }) => {
  const { meta } = window[`gpalabStats${id}`];

  const [ref, entry] = useVisibilityObserver({ threshold: 0.75 });

  const runStat = index => {
    const counter = { val: 0 };
    const stat = document.getElementById(`stat-${index + 1}`);

    const updateCount = () => {
      stat.innerHTML = Math.ceil(counter.val);
    };

    TweenLite.to(counter, {
      duration: 5,
      ease: Power2.easeOut,
      onUpdate: updateCount,
      val: stat.getAttribute('data-stat')
    });
  };

  useEffect(() => {
    if (entry.isIntersecting) {
      const stats = [...document.querySelectorAll('.stat-number')];

      stats.forEach((stat, index) => runStat(index, stat));
    }
  });

  if (meta) {
    const { backgroundType, blockBackground, files, fullWidth, stats, textColor, title } = meta;

    const bg =
      backgroundType === 'image' ? setBackgroundImage(files) : backgroundStyle(blockBackground);

    return (
      <Normalizer fullWidth={fullWidth}>
        <div ref={ref} style={bg} styleName="box-bg">
          <Gradient>
            <Fragment>
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
                          <span
                            className="stat-number"
                            data-stat={stat.number}
                            id={`stat-${index + 1}`}
                          >
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
            </Fragment>
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
