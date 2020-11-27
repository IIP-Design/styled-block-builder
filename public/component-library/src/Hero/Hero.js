import React from 'react';
import propTypes from 'prop-types';

import AnimatedLines from '../_shared/components/AnimatedLines/AnimatedLines';
import Background from '../_shared/components/Background/Background';
import BlockHeading from '../_shared/components/BlockHeading/BlockHeading';
import Button from '../_shared/components/Button/Button';
import Normalizer from '../_shared/components/Normalizer/Normalizer';

import './Hero.module.scss';

const Hero = ( { block, primary } ) => {
  if ( block ) {
    const {
      align,
      buttons,
      description,
      files,
      lines,
      subtitle,
      textColor,
      title,
      type,
    } = block;

    const titleAlignment = align === 'center' || align === 'title' ? 'center' : 'left';
    const contentAlignment = align === 'center' ? 'content-center' : 'content-left';

    return (
      <Normalizer fullWidth>
        <Background
          backgroundType="image"
          files={ files }
          gradient
        >
          <div styleName="hero">
            { title && (
              <BlockHeading
                primary={ primary }
                text={ title }
                style={ { textAlign: titleAlignment, color: textColor } }
                styleName="title"
              />
            ) }
            { subtitle && (
              <h3 className="gpalab-site-specific" style={ { textAlign: titleAlignment, color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <div styleName={ `content ${contentAlignment}` }>
              <div styleName="text">
                { type === 'text' && (
                  <div
                    className="light"
                    dangerouslySetInnerHTML={ { __html: description } }
                    style={ { textAlign: titleAlignment, color: textColor } }
                    styleName="text-large"
                  />
                ) }
                { type === 'lines' && (
                  <AnimatedLines
                    align={ align }
                    color={ textColor }
                    lines={ lines }
                  />
                ) }
              </div>
              <div styleName="button-container">
                { buttons && buttons.map( button => (
                  <Button
                    key={ button.id }
                    config={ button }
                  />
                ) ) }
              </div>
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Hero.propTypes = {
  block: propTypes.shape( {
    align: propTypes.string,
    buttons: propTypes.array,
    description: propTypes.string,
    files: propTypes.array,
    lines: propTypes.array,
    subtitle: propTypes.string,
    textColor: propTypes.string,
    title: propTypes.string,
    type: propTypes.string,
  } ),
  primary: propTypes.bool,
};

export default Hero;
