import React from 'react';
import propTypes from 'prop-types';

import Background from '../_shared/components/Background/Background';
import BlockHeading from '../_shared/components/BlockHeading/BlockHeading';
import Normalizer from '../_shared/components/Normalizer/Normalizer';
import SocialLinks from '../_shared/components/SocialLinks/SocialLinks';

import { setColors, getAvatar } from './utils';

import './LinkList.module.scss';

const LinkList = ( { block, primary } ) => {
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
              <BlockHeading
                primary={ primary }
                text={ title }
                style={ { color: titleColor } }
                styleName="title"
              />
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
  block: propTypes.shape( {
    backgroundGradient: propTypes.string,
    backgroundType: propTypes.string,
    blockBackground: propTypes.string,
    files: propTypes.array,
    fullWidth: propTypes.bool,
    linkColor: propTypes.string,
    linkStyle: propTypes.string,
    links: propTypes.array,
    title: propTypes.string,
    titleColor: propTypes.string,
    facebook: propTypes.string,
    instagram: propTypes.string,
    youtube: propTypes.string,
    twitter: propTypes.string,
  } ),
  primary: propTypes.bool,
};

export default LinkList;
