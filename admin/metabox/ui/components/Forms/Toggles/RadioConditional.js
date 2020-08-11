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
        { options && options.map( option => {
          const id = group ? `radio-conditional-${option.value}-${group.id}` : `radio-conditional-${option.value}`;
          const name = group ? `${option.name}-${group.id}` : option.name;

          return (
            <label
              key={ option.value }
              htmlFor={ id }
              styleName="radio-label"
            >
              { option.label }
              <input
                checked={ option.value === checked }
                data-itemid={ group ? group.id : null }
                data-itemname={ group ? option.name : null }
                id={ id }
                name={ name }
                type="radio"
                value={ option.value }
                onChange={ e => onChange( e ) }
              />
            </label>
          );
        } ) }
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
