import React, { Fragment, useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import VideoForm from 'metabox/components/Forms/VideoForm/VideoForm';

import { AdminContext } from 'metabox/context/adminContext';
import { getTabTitleField, responsiveTitle } from 'metabox/utils/tab-titles';
import { getModules } from 'metabox/utils/quill';

import './TabbedForm.module.scss';

const TabbedForm = ( { fields, group, label, maxTabs } ) => {
  const [selectedTab, setSelectedTab] = useState( null );
  const [groupLength, setGroupLength] = useState( 0 );

  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const formGroup = formValues[group];

  useEffect( () => {
    // Open most recently added tab when opening form or the number of tabs changes
    if ( formGroup && formGroup.length !== groupLength && formGroup.length > 0 ) {
      setSelectedTab( formGroup[formGroup.length - 1].id );
      setGroupLength( formGroup.length );
    }
  }, [formGroup] );

  /**
   * Adds a new tab.
   */
  const handleAdd = async () => {
    await dispatch( { type: 'group-add', payload: { fields, group } } );
  };

  /**
   * Updates form field values.
   *
   * @param {Object} e An event object.
   * @param {string} itemId The id of the item being updated.
   */
  const handleChange = ( e, itemId ) => {
    const { name, value } = e.target;

    dispatch( { type: 'group-input', payload: { group, itemId, name, value } } );
  };

  /**
   * Removes the selected tab.
   *
   * @param {Object[]} forms Array of available form objects.
   */
  const handleRemoval = forms => {
    const selected = forms.filter( item => item.id === selectedTab );
    const index = forms.indexOf( selected[0] );

    // Replicate resources array and add new resource object.
    const clone = [...forms];

    clone.splice( index, 1 );

    // Bring adjacent tab in focus when removing tab
    let tab;

    switch ( clone.length ) {
      case 0:
        tab = null;
        break;
      default:
        if ( index === 0 ) {
          tab = forms[1].id;
        } else if ( index > 0 ) {
          tab = forms[index - 1].id;
        }
    }

    if ( tab ) {
      setSelectedTab( tab );
    }

    dispatch( { type: 'group-remove', payload: { group, id: selectedTab } } );
  };

  /**
   * Dispatches an event to turn on/off of optional sections.
   *
   * @param {string} name Name of the field.
   * @param {string} itemId The id of the item being updated.
   */
  const handleToggle = ( name, itemId ) => {
    const selectItem = formValues[group].filter( item => item.id === itemId )[0];

    const isChecked = selectItem[name] || false;

    dispatch( { type: 'group-input', payload: { group, itemId, name, value: !isChecked } } );
  };

  if ( formValues ) {
    const forms = formValues[group] || [];

    return (
      <div>
        <div styleName="tabbed-form">
          { forms && forms.length > 0 && (
            <Fragment>
              <div styleName="tabs">
                { forms.map( ( form, index ) => {
                  const selected = forms.filter( base => base.id === form.id );

                  return (
                    <button
                      key={ `tab-${form.id}` }
                      id={ `tab-${index}` }
                      styleName={ selectedTab === form.id ? 'tab selected-tab' : 'tab' }
                      type="button"
                      onClick={ () => setSelectedTab( form.id ) }
                    >
                      { responsiveTitle( index, forms.length, selected[0][getTabTitleField( fields )] ) }
                    </button>
                  );
                } ) }
              </div>
              <div className="tab-container">
                { forms.map( form => {
                  const selected = forms.filter( base => base.id === form.id );

                  return (
                    <div
                      key={ `tab-item-${form.id}` }
                      id={ `tab-item-${form.id}` }
                      styleName={ selectedTab === form.id ? 'tab-item selected-item' : 'tab-item' }
                    >
                      { fields
                        && fields.map( field => {
                          if ( field.type === 'file' ) {
                            return (
                              <FileUploader
                                key={ `${field.name}-${form.id}` }
                                label={ field.label || '' }
                                name={ field.name }
                                parentGroup={ group }
                                parentId={ form.id }
                              />
                            );
                          }

                          if ( field.type === 'quill' ) {
                            const handleQuill = value => {
                              dispatch( { type: 'group-input', payload: { group, itemId: form.id, name: field.name, value } } );
                            };

                            return (
                              <label
                                key={ `${field.name}-${form.id}` }
                                htmlFor={ `section-${field.name}-${form.id}` }
                              >
                                { field.label || '' }
                                <ReactQuill
                                  id={ `section-${field.name}-${form.id}` }
                                  modules={ getModules( ['align', 'lists'] ) }
                                  theme="snow"
                                  value={ selected[0][field.name] }
                                  onChange={ handleQuill }
                                />
                              </label>
                            );
                          }

                          if ( field.type === 'select' ) {
                            return (
                              <label
                                key={ `${field.name}-${form.id}` }
                                htmlFor={ `section-${field.name}-${form.id}` }
                              >
                                { field.label || '' }
                                <select
                                  data-parent={ form.id }
                                  id={ `section-${field.name}-${form.id}` }
                                  name={ field.name }
                                  value={ selected[0][field.name] }
                                  onBlur={ e => handleChange( e, form.id ) }
                                  onChange={ e => handleChange( e, form.id ) }
                                >
                                  <option value="">{ `Please select a ${field.name}` }</option>
                                  { field.options && field.options.map( opt => (
                                    <option key={ opt.value } value={ opt.value }>
                                      { opt.name }
                                    </option>
                                  ) ) }
                                </select>
                              </label>
                            );
                          }

                          if ( field.type === 'text' ) {
                            return (
                              <label
                                key={ `${field.name}-${form.id}` }
                                htmlFor={ `section-${field.name}-${form.id}` }
                              >
                                { field.label || '' }
                                <input
                                  data-parent={ form.id }
                                  id={ `section-${field.name}-${form.id}` }
                                  name={ field.name }
                                  type="text"
                                  value={ selected[0][field.name] }
                                  onChange={ e => handleChange( e, form.id ) }
                                />
                              </label>
                            );
                          }

                          if ( field.type === 'textarea' ) {
                            return (
                              <label
                                key={ `${field.name}-${form.id}` }
                                htmlFor={ `section-${field.name}-${form.id}` }
                              >
                                { field.label || '' }
                                <textarea
                                  data-parent={ form.id }
                                  id={ `section-${field.name}-${form.id}` }
                                  name={ field.name }
                                  rows="6"
                                  value={ selected[0][field.name] }
                                  onChange={ e => handleChange( e, form.id ) }
                                />
                              </label>
                            );
                          }

                          if ( field.type === 'article-feed' ) {
                            return (
                              <CheckboxConditional
                                key={ `${field.name}-${form.id}` }
                                callback={ () => handleToggle( 'hasFeed', form.id ) }
                                checked={ form.hasFeed || false }
                                data-parent={ form.id }
                                label={ field.label || '' }
                                name={ form.id }
                              >
                                <ArticleById parentGroup={ group } parentId={ form.id } />
                              </CheckboxConditional>
                            );
                          }

                          if ( field.type === 'video' ) {
                            return (
                              <VideoForm
                                key={ `${field.name}-${form.id}` }
                                parentGroup={ group }
                                parentId={ form.id }
                              />
                            );
                          }

                          return null;
                        } ) }
                    </div>
                  );
                } ) }
              </div>
            </Fragment>
          ) }
          <div
            style={ { justifyContent: forms && forms.length > 0 ? 'space-between' : 'flex-end' } }
            styleName="tab-buttons"
          >
            { forms && forms.length > 0 && (
              <button
                className="button-secondary"
                type="button"
                onClick={ () => handleRemoval( forms ) }
              >
                { `Remove ${label}` || 'Remove Section' }
              </button>
            ) }
            <button
              className="button-secondary"
              disabled={ forms && forms.length === maxTabs }
              styleName="tab-button"
              type="button"
              onClick={ () => handleAdd() }
            >
              { `Add ${label}` || 'Add Section' }
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

TabbedForm.propTypes = {
  fields: propTypes.array,
  group: propTypes.string,
  label: propTypes.string,
  maxTabs: propTypes.number,
};

TabbedForm.defaultProps = {
  maxTabs: 3,
};

export default TabbedForm;
