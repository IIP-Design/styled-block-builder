import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { handleChange, handleChangeNested } from 'metabox/utils/event-handlers';

import './Toggles.module.scss';

const RadioConditional = ( { checked, group, label, options, parentGroup, parentId } ) => {
  const { dispatch } = useContext( AdminContext );

  const onChange = e => {
    if ( group ) {
      handleChangeNested( e, dispatch, group.name, parentGroup, parentId );
    } else {
      handleChange( e, dispatch );
    }
  };

  return (
    <div styleName="form-break">
      { label && <h4 styleName="toggle-header">{ label }</h4> }
      <div styleName="radio-wrapper">
        { options
          && options.map( option => (
            <label
              key={ option.value }
              htmlFor={ `radio-conditional-${option.value}` }
              styleName="radio-label"
            >
              { option.label }
              <input
                checked={ option.value === checked }
                data-itemid={ group ? group.id : null }
                id={ `radio-conditional-${option.value}` }
                name={ option.name }
                type="radio"
                value={ option.value }
                onChange={ e => onChange( e ) }
              />
            </label>
          ) ) }
      </div>
    </div>
  );
};

RadioConditional.propTypes = {
  checked: propTypes.string,
  group: propTypes.shape( {
    id: propTypes.string,
    name: propTypes.string,
  } ),
  label: propTypes.string,
  options: propTypes.array,
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

export default RadioConditional;
