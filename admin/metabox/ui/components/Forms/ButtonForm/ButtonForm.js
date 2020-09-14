import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
  handleToggleNested,
} from 'metabox/utils/event-handlers';

import './ButtonForm.module.scss';

const ButtonForm = ( { parentGroup, parentId, number } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const togglePrefix = e => handleToggleNested( e, dispatch, 'buttons', parentGroup, parentId );

  const fields = [
    { name: 'buttonArrow', value: 'white' },
    { name: 'buttonBorder', value: 'plain' },
    { name: 'buttonColor', value: 'white' },
    { name: 'buttonLink' },
    { name: 'buttonPrefix' },
    { name: 'buttonText' },
  ];

  if ( formValues ) {
    let buttons;

    if ( !parentGroup ) {
      buttons = formValues.buttons || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter( item => item.id === parentId )[0];

      buttons = current.buttons || [];
    }

    return (
      <div styleName="container">
        { buttons && buttons.map( button => (
          <div key={ button.id } styleName="form">
            <strong styleName="title">Button Data:</strong>

            <CheckboxConditional
              callback={ togglePrefix }
              checked={ button.addPrefix }
              itemid={ button.id }
              label="Would you like to add a prefix?"
              name="addPrefix"
            >
              <label htmlFor="button-prefix-text">
                Add button text prefix:
                <input
                  data-itemid={ button.id }
                  id="button-prefix"
                  name="buttonPrefix"
                  type="text"
                  styleName="conditional-field"
                  value={ button.buttonPrefix || '' }
                  onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
                />
              </label>
            </CheckboxConditional>

            <label htmlFor="button-text">
              Add button text:
              <input
                data-itemid={ button.id }
                id="button-text"
                name="buttonText"
                type="text"
                value={ button.buttonText || '' }
                onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
              />
            </label>

            <label htmlFor="button-link">
              Add button link:
              <input
                data-itemid={ button.id }
                id="button-link"
                name="buttonLink"
                type="text"
                value={ button.buttonLink || '' }
                onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
              />
            </label>

            <label htmlFor="button-color">
              Select text color:
              <select
                data-itemid={ button.id }
                id="button-color"
                name="buttonColor"
                value={ button.buttonColor || '' }
                onBlur={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
                onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
              >
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </label>

            <label htmlFor="button-border">
              Select border style:
              <select
                data-itemid={ button.id }
                id="button-border"
                name="buttonBorder"
                value={ button.buttonBorder || '' }
                onBlur={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
                onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
              >
                <option value="plain">Plain</option>
                <option value="rounded">Rounded</option>
                <option value="none">None</option>
              </select>
            </label>

            <label htmlFor="arrow-color">
              Select arrow color:
              <select
                data-itemid={ button.id }
                id="arrow-color"
                name="buttonArrow"
                value={ button.buttonArrow || '' }
                onBlur={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
                onChange={ e => handleChangeNested( e, dispatch, 'buttons', parentGroup, parentId ) }
              >
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="gold">Gold</option>
                <option value="red">Red</option>
                <option value="none">None</option>
              </select>
            </label>

            <button
              className="button-secondary"
              data-itemid={ button.id }
              styleName="button-remove"
              type="button"
              onClick={ e => handleRemoveNested( e, dispatch, 'buttons', parentGroup, parentId ) }
            >
              Remove Button
            </button>

          </div>
        ) ) }
        <button
          className="button-secondary"
          style={ buttons && buttons.length > number - 1 ? { display: 'none' } : { display: 'block' } }
          styleName="button-add"
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'buttons', parentGroup, parentId ) }
        >
          { buttons.length === 0 ? 'Add Button' : 'Add Another Button' }
        </button>
      </div>
    );
  }

  return null;
};

ButtonForm.propTypes = {
  number: propTypes.number,
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

ButtonForm.defaultProps = {
  number: 1,
  parentGroup: null,
  parentId: null,
};


export default ButtonForm;
