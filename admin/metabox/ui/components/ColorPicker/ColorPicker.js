import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { handleColor } from 'metabox/utils/event-handlers';

import './ColorPicker.module.scss';

const ColorPicker = ({ colors, label, selected }) => {
  const assetUrl = window?.gpalabTemplateAdmin?.assets;
  const { dispatch } = useContext(AdminContext);

  return (
    <div styleName="container">
      {label && <h4 styleName="heading">{label}</h4>}
      <div styleName="options-container">
        {colors?.options &&
          colors.options.map(color => {
            const style =
              color.type === 'image'
                ? { backgroundImage: `url('${assetUrl}${color.value}')` }
                : { backgroundColor: color.value };

            return (
              <div key={color.value} styleName="option">
                <span
                  className="dashicons dashicons-arrow-down"
                  styleName={color.value === selected ? 'indicator selected' : 'indicator hidden'}
                />
                <button
                  aria-label={`Choose ${color.name}`}
                  data-group={colors.group}
                  id={`color-${colors.group}-${color.name}`}
                  name={color.name}
                  style={style}
                  styleName={color.value === selected ? 'button selected' : 'button hidden'}
                  type="button"
                  value={color.value}
                  onClick={e => handleColor(e, dispatch)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  colors: propTypes.object,
  label: propTypes.string,
  selected: propTypes.string
};

export default ColorPicker;
