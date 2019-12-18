import React from 'react';
import propTypes from 'prop-types';

import './ColorPicker.module.scss';

const ColorPicker = ( { callback, colors, label, selected } ) => (
  <div styleName="container">
    { label && <h4 styleName="heading">{ label }</h4> }
    <div styleName="options-container">
      { colors?.options &&
        colors.options.map( option => (
          <div key={ option.value } styleName="option">
            <span
              className="dashicons dashicons-arrow-down"
              styleName={ option.value === selected ? 'indicator selected' : 'indicator hidden' }
            />
            <button
              aria-label={ `Choose ${option.name}` }
              data-group={ colors.group }
              id={ `color-picker-${option.name}` }
              name={ option.name }
              onClick={ e => callback( e ) }
              style={ { backgroundColor: option.value } }
              styleName={ option.value === selected ? 'button selected' : 'button hidden' }
              type="button"
              value={ option.value }
            />
          </div>
        ) ) }
    </div>
  </div>
);

ColorPicker.propTypes = {
  callback: propTypes.func,
  label: propTypes.string,
  colors: propTypes.object,
  selected: propTypes.string
};

export default ColorPicker;
