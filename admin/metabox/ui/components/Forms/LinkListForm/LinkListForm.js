import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';

import BackgroundForm from '../BackgroundForm/BackgroundForm';
import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';
import SocialLinkForm from 'metabox/components/Forms/SocialLinkForm/SocialLinkForm';

import { AdminContext } from 'metabox/context/adminContext';
import { defaultText } from 'metabox/utils/color-picker-palettes';
import {
  handleAddNested,
  handleChange,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './LinkListForm.module.scss';

const LinkListForm = ( { parentGroup, parentId, number } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize style options with default values if none are already selected.
  useEffect( () => {
    if ( !state?.formData?.formValues?.titleColor ) {
      dispatch( { type: 'form-update', payload: { name: 'titleColor', value: '#333333' } } );
    }

    if ( !state?.formData?.formValues?.linkColor ) {
      dispatch( { type: 'form-update', payload: { name: 'linkColor', value: '#0a314d' } } );
    }

    if ( !state?.formData?.formValues?.linkStyle ) {
      dispatch( { type: 'form-update', payload: { name: 'linkStyle', value: 'outline' } } );
    }

    if ( !state?.formData?.formValues?.backgroundType ) {
      dispatch( { type: 'form-update', payload: { name: 'backgroundType', value: 'color' } } );
    }

    if ( !state?.formData?.formValues?.blockBackground ) {
      dispatch( { type: 'form-update', payload: { name: 'blockBackground', value: '#ffffff' } } );
    }
  }, [] );

  const fields = [
    { name: 'linkText' },
    { name: 'linkUrl' },
  ];

  const titleOptions = {
    group: 'titleColor',
    options: defaultText,
  };

  const colorOptions = {
    group: 'linkColor',
    options: defaultText,
  };

  const styleOptions = [
    { label: 'Solid', name: 'linkStyle', value: 'solid' },
    { label: 'Outline', name: 'linkStyle', value: 'outline' },
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
        <label htmlFor="handle">
          Add Social Handle (Used as Block Title):
          <input
            id="handle"
            name="title"
            type="text"
            value={ formValues.title || '' }
            onChange={ e => handleChange( e, dispatch ) }
          />
        </label>
        <FileUploader
          label="Add avatar:"
          name="avatarImage"
        />
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
        <div styleName="form spacer">
          <strong>Config Block Styles:</strong>
          <ColorPicker
            colors={ titleOptions }
            label="Set title color:"
            selected={ formValues.titleColor }
          />
          <BackgroundForm />
          <ColorPicker
            colors={ colorOptions }
            label="Set link color:"
            selected={ formValues.linkColor }
          />
          <RadioConditional
            checked={ formValues.linkStyle }
            label="Choose a link style:"
            options={ styleOptions }
          />
          <FullWidthToggle checked={ formValues.fullWidth } />
        </div>
        <SocialLinkForm />
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
