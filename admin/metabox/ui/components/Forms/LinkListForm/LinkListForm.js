import React, { useContext } from 'react';
import propTypes from 'prop-types';

import BackgroundForm from '../BackgroundForm/BackgroundForm';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';

import { AdminContext } from 'metabox/context/adminContext';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './LinkListForm.module.scss';

const LinkListForm = ( { parentGroup, parentId, number } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [
    { name: 'linkText' },
    { name: 'linkUrl' },
  ];

  if ( formValues ) {
    let links;

    if ( !parentGroup ) {
      links = formValues.links || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter( item => item.id === parentId )[0];

      links = current.links || [];
    }

    return (
      <div styleName="container">
        <BackgroundForm />
        { links && links.map( ( link, idx ) => (
          <div key={ link.id } styleName="form">
            <strong>{ `Link ${idx + 1} Data:` }</strong>

            <label htmlFor="link-text">
              Add link text:
              <input
                data-itemid={ link.id }
                id="link-text"
                name="linkText"
                type="text"
                value={ link.linkText || '' }
                onChange={ e => handleChangeNested( e, dispatch, 'links', parentGroup, parentId ) }
              />
            </label>

            <label htmlFor="link-url">
              Add link URL:
              <input
                data-itemid={ link.id }
                id="link-url"
                name="linkUrl"
                type="text"
                value={ link.linkUrl || '' }
                onChange={ e => handleChangeNested( e, dispatch, 'links', parentGroup, parentId ) }
              />
            </label>

            <button
              className="button-secondary"
              data-itemid={ link.id }
              type="button"
              onClick={ e => handleRemoveNested( e, dispatch, 'links', parentGroup, parentId ) }
            >
              Remove Link
            </button>

          </div>
        ) ) }
        <button
          className="button-secondary"
          style={ links && links.length > number - 1 ? { display: 'none' } : { display: 'block' } }
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'links', parentGroup, parentId ) }
        >
          { links.length === 0 ? 'Add Link' : 'Add Another Link' }
        </button>
        <FullWidthToggle checked={ formValues.fullWidth } />
      </div>
    );
  }

  return null;
};

LinkListForm.propTypes = {
  number: propTypes.number,
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

LinkListForm.defaultProps = {
  number: 20,
  parentGroup: null,
  parentId: null,
};

export default LinkListForm;
