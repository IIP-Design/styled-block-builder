import React from 'react';
import propTypes from 'prop-types';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Navigation.module.scss';

const Parallax = ( { id } ) => {
  const { meta } = window[`gpalabNavigation${id}`];

  if ( meta ) {
    const {
      fullWidth,
      nav,
      title,
    } = meta;

    const isMobile = window.innerWidth <= 600;
    const itemWidth = nav.length > 4 ? Math.round( 100 / nav.length ) : 25;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <section styleName="container">
          { title && <h2 className="gpalab-site-specific" styleName="title">{ title }</h2> }
          <nav styleName="nav">
            <ul styleName="nav-list">
              { nav && nav.map( item => (
                <li key={ item.link } style={ { width: isMobile ? '75%' : `calc(${itemWidth}% - 1rem)` } } styleName="nav-item">
                  <a href={ `#gpalab-${item.link}` } styleName="link">
                    <span>{ item.text }</span>
                    { item?.files?.[0]?.url && <img alt="" src={ item.files[0].url } styleName="icon" /> }
                  </a>
                </li>
              ) ) }
            </ul>
          </nav>
        </section>
      </Normalizer>
    );
  }

  return null;
};

Parallax.propTypes = {
  id: propTypes.string,
};

export default Parallax;
