import React from 'react';
import propTypes from 'prop-types';

import Background from 'blocks/_shared/components/Background/Background';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import SocialLinks from 'blocks/_shared/components/SocialLinks/SocialLinks';

import { getBlockById } from 'blocks/_shared/utils/blocks';
import { setColors, getAvatar } from './utils';

import './LinkList.module.scss';

const LinkList = ( { id } ) => {
  const block = getBlockById( id );

  if ( block ) {
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
      facebook,
      instagram,
      youtube,
      twitter,
    } = block;

    const linkClass = setColors( backgroundType, blockBackground, linkColor, linkStyle );
    const avatar = getAvatar( files );

    const social = {
      facebook,
      instagram,
      youtube,
      twitter,
    };

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' && backgroundGradient === 'dark' }
        >
          <div styleName="link-container">
            { avatar && (
              <img alt={ avatar.alt } src={ avatar.url } styleName="avatar" />
            ) }
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
            <SocialLinks fill={ titleColor } social={ social } />
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
