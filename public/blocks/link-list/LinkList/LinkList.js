import React from 'react';
import propTypes from 'prop-types';

import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './LinkList.module.scss';

const LinkList = ( { id } ) => {
  const { meta } = window[`gpalabLinkList${id}`];

  if ( meta ) {
    const {
      links,
    } = meta;

    return (
      <Normalizer>
        <div styleName="link-container">
          { links && links.map( link => (
            <a key={ link.id } href={ link.linkUrl } styleName="link">
              <div styleName="list-item">
                { link.linkText }
              </div>
            </a>
          ) ) }
        </div>
      </Normalizer>
    );
  }
};

LinkList.propTypes = {
  id: propTypes.string,
};

export default LinkList;
