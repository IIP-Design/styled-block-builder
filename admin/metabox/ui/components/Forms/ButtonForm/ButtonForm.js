import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './ButtonForm.module.scss';

const ButtonForm = ( { parentGroup, parentId } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [
    { name: 'buttonArrow' }, { name: 'buttonBorder' }, { name: 'buttonColor' }, { name: 'buttonLink' }, { name: 'buttonText' },
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
                type="select"
                value={ button.buttonColor || 'white' }
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
                type="select"
                value={ button.buttonBorder || 'plain' }
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
                type="select"
                value={ button.buttonArrow || 'white' }
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
          style={ buttons && buttons.length > 0 ? { display: 'none' } : { display: 'block' } }
          styleName="button-add"
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'buttons', parentGroup, parentId ) }
        >
          Add Button
        </button>
      </div>
    );
  }

  return null;
};

ButtonForm.propTypes = {
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

ButtonForm.defaultProps = {
  parentGroup: null,
  parentId: null,
};


export default ButtonForm;
