import React from 'react';
import propTypes from 'prop-types';

import Background from 'blocks/_shared/components/Background/Background';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import { setColors } from './utils';

import './LinkList.module.scss';

const LinkList = ( { id } ) => {
  const { meta } = window[`gpalabLinkList${id}`];

  if ( meta ) {
    const {
      backgroundGradient,
      backgroundType,
      blockBackground,
      files,
      fullWidth,
      linkColor,
      linkStyle,
      links,
      title,
      titleColor,
    } = meta;

    const linkClass = setColors( backgroundType, blockBackground, linkColor, linkStyle );

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' && backgroundGradient === 'dark' }
        >
          <div styleName="link-container">
            { title && (
              <h2 className="gpalab-site-specific" style={ { color: titleColor } } styleName="title">
                { title }
              </h2>
            ) }
            { links && links.map( link => (
              <a key={ link.id } href={ link.linkUrl } styleName="link">
                <div styleName={ `list-item ${linkClass}` }>
                  { link.linkText }
                </div>
              </a>
            ) ) }
          </div>
        </Background>
      </Normalizer>
    );
  }
};

LinkList.propTypes = {
  id: propTypes.string,
};

export default LinkList;
