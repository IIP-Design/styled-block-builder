import React from 'react';
import propTypes from 'prop-types';
import { TimelineMax } from 'react-gsap';

import Normalizer from '../../_shared/components/Normalizer/Normalizer';

import './Timeline.module.scss';
import mockData from './mockdata';

const Timeline = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { title, events } = mockData;

  return (
    <Normalizer>
      <div styleName="bg" id="section">
        <div
          styleName="overlay"
          data-year="1908"
          data-photo="https://policystatic.state.gov/uploads/2019/11/1280px-Persian_Cossack_Brigade.jpg"
          // style="background-image: url('https://policystatic.state.gov/uploads/2019/11/1280px-Persian_Cossack_Brigade.jpg'); opacity: 0.5; visibility: visible;"
        >
          <div styleName="extra-opacity" />
        </div>
        <div
          styleName="overlay"
          data-year="1979"
          data-photo="https://policystatic.state.gov/uploads/2019/11/AP_7911011398_Iran_protests.jpg"
        />
        <div
          styleName="overlay"
          data-year="1999"
          data-photo="https://policystatic.state.gov/uploads/2019/11/AP_9907110614.jpg"
        />
        <div
          styleName="overlay"
          data-year="2009"
          data-photo="https://policystatic.state.gov/uploads/2019/11/20122268454784734_20.jpg"
        />

        <h2 styleName="title">A Generation&apos;s Struggle for Democracy</h2>

        <div>
          <div styleName="slide-title" data-year="1908">
            Persia
          </div>
          <div styleName="slide-title" data-year="1979" style={ { display: 'none' } }>
            Iran
          </div>
          <div styleName="slide-title" data-year="1999" style={ { display: 'none' } }>
            Islamic Republic
          </div>
          <div styleName="slide-title" data-year="2009" style={ { display: 'none' } }>
            Islamic Republic
          </div>
        </div>

        <div styleName="container">
          <div styleName="card bottom1" data-year="1908">
            <div styleName="heading" style={ { color: '#333333' } }>
              1908
            </div>
            <p styleName="text" style={ { color: '#333333' } }>
              Constitution/ Majlis
            </p>
          </div>

          <div styleName="card top1" data-year="1979">
            <div styleName="heading">1979</div>
            <p styleName="text">Movement hijacked by religious fundamentalists</p>
          </div>

          <div styleName="card bottom2" data-year="1999">
            <div styleName="heading">1999</div>
            <p styleName="text">Student protests</p>
          </div>

          <div styleName="card top2" data-year="2009">
            <div styleName="heading">2009</div>
            <p styleName="text">Green Movement</p>
          </div>

          <div styleName="slide-title-mobile" id="tl-persia" data-year="1908">
            Persia
          </div>
          <div
            styleName="slide-title-mobile"
            id="tl-iran"
            data-year="1979"
            style={ { display: 'none' } }
          >
            Iran
          </div>
          <div
            styleName="slide-title-mobile"
            id="tl-ir1"
            data-year="1999"
            style={ { display: 'none' } }
          >
            Islamic Republic
          </div>
          <div
            styleName="slide-title-mobile"
            id="tl-ir2"
            data-year="2009"
            style={ { display: 'none' } }
          >
            Islamic Republic
          </div>

          <div styleName="line">
            <span styleName="dot" data-year="1908" />
            <span styleName="dot" data-year="1979" />
            <span styleName="dot" data-year="1999" />
            <span styleName="dot" data-year="2009" />
          </div>
        </div>
      </div>
    </Normalizer>
  );
};

Timeline.propTypes = {
  id: propTypes.string
};

export default Timeline;
