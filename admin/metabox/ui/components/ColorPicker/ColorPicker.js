import React from 'react';
import propTypes from 'prop-types';

import './ColorPicker.module.scss';

const ColorPicker = ( { callback, colors, label, selected } ) => {
  const assetUrl = window?.gpalabTemplateAdmin?.assets;

  return (
    <div styleName="container">
      { label && <h4 styleName="heading">{ label }</h4> }
      <div styleName="options-container">
        { colors?.options &&
          colors.options.map( color => {
            const style =
              color.type === 'image'
                ? { backgroundImage: `url('${assetUrl}${color.value}')` }
                : { backgroundColor: color.value };

            return (
              <div key={ color.value } styleName="option">
                <span
                  className="dashicons dashicons-arrow-down"
                  styleName={ color.value === selected ? 'indicator selected' : 'indicator hidden' }
                />
                <button
                  aria-label={ `Choose ${color.name}` }
                  data-group={ colors.group }
                  id={ `color-${colors.group}-${color.name}` }
                  name={ color.name }
                  onClick={ e => callback( e ) }
                  style={ style }
                  styleName={ color.value === selected ? 'button selected' : 'button hidden' }
                  type="button"
                  value={ color.value }
                />
              </div>
            );
          } ) }
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  callback: propTypes.func,
  label: propTypes.string,
  colors: propTypes.object,
  selected: propTypes.string
};

export default ColorPicker;
