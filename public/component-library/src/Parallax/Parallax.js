import React from 'react';
import propTypes from 'prop-types';

import Background from '../_shared/components/Background/Background';
import Button from '../_shared/components/Button/Button';
import Normalizer from '../_shared/components/Normalizer/Normalizer';

import './Parallax.module.scss';

const Parallax = ( { block } ) => {
  if ( block ) {
    const {
      buttons,
      desc,
      files,
      fullWidth,
      subtitle,
      title,
    } = block;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType="image"
          files={ files }
          gradient
          styles={ { backgroundAttachment: 'fixed' } }
        >
          <div styleName="fixed">
            <div styleName="content">
              { title && <h2 className="gpalab-site-specific" styleName="title">{ title }</h2> }
              { subtitle && <h3 className="gpalab-site-specific" styleName="subtitle">{ subtitle }</h3> }
              { desc && (
                <div
                  className="light"
                  dangerouslySetInnerHTML={ { __html: desc } }
                  styleName="text"
                />
              ) }
              { buttons && buttons.map( button => (
                <Button
                  key={ button.id }
                  config={ button }
                />
              ) ) }
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Parallax.propTypes = {
  block: propTypes.shape( {
    buttons: propTypes.array,
    desc: propTypes.string,
    files: propTypes.array,
    fullWidth: propTypes.bool,
    subtitle: propTypes.string,
    title: propTypes.string,
  } ),
};

export default Parallax;
