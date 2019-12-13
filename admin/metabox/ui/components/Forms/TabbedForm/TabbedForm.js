import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import './TabbedForm.module.scss';

const TabbedForm = ( { fields, group, inputs, label, maxTabs, stateFunc } ) => {
  const [selectedTab, setSelectedTab] = useState( null );
  const [forms, setForms] = useState( [] );

  useEffect( () => {
    const currentState = [...inputs[group]];
    setForms( currentState );

    // If forms already present, open first one
    if ( currentState.length > 0 ) {
      setSelectedTab( currentState[0].id );
    }
  }, [] );

  const updateState = ( val, index ) => {
    stateFunc( group, val );
    setForms( val );
    setSelectedTab( index );
  };

  const handleAdd = () => {
    const fieldNames = fields.map( field => field.name );

    // Create an object to store values for new resource
    const obj = {};
    obj.id = uuid();
    fieldNames.forEach( name => {
      obj[name] = '';
      return obj;
    } );

    // Replicate resources array and populate it with previously created object
    const clone = [...inputs[group]];
    clone.push( obj );

    // Handle all the state updates
    updateState( clone, obj.id );
  };

  const handleRemove = () => {
    const selected = forms.filter( form => form.id === selectedTab );
    const index = forms.indexOf( selected[0] );

    // Replicate resources array and add new resource object
    const clone = [...inputs[group]];
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

    // Handles all the state updates
    updateState( clone, tab );
  };

  const handleInput = e => {
    const { parent } = e.target.dataset;
    const { name, value } = e.target;

    // Make an updated replica of the form objects
    const newState = [...forms];
    newState.map( form => {
      if ( form.id === parent ) {
        form[name] = value;
      }

      return form;
    } );

    setForms( newState );
    stateFunc( group, newState );
  };

  const responsiveTitle = ( index, title ) => {
    if ( !title || forms.length > 7 ) {
      return index + 1;
    }

    // Reduce total allowed characters for more tabs to account for more instances of ellipses
    const base = forms.length < 5 ? 30 : 21;

    // Total characters across all tabs, divided by num of tabs,
    // -1 to account for 0 based indexing, rounded to whole number
    const end = Math.round( base / forms.length - 1 );

    return `${title.substring( 0, end )}...`;
  };

  return (
    <div>
      <div className="tabbed-form">
        { forms && forms.length > 0 && (
          <Fragment>
            <div styleName="tabs">
              { forms.map( ( form, index ) => {
                const selected = forms.filter( base => base.id === form.id );
                return (
                  <button
                    id={ `tab-${index}` }
                    key={ `tab-${form.id}` }
                    onClick={ () => setSelectedTab( form.id ) }
                    styleName={ selectedTab === form.id ? 'tab selected-tab' : 'tab' }
                    type="button"
                  >
                    { responsiveTitle( index, selected[0].title ) }
                  </button>
                );
              } ) }
            </div>
            <div className="tab-container">
              { forms.map( form => {
                const selected = forms.filter( base => base.id === form.id );
                return (
                  <div
                    id={ `tab-item-${form.id}` }
                    key={ `tab-item-${form.id}` }
                    styleName={ selectedTab === form.id ? 'tab-item selected-item' : 'tab-item' }
                  >
                    { fields &&
                      fields.map( field => {
                        if ( field.type === 'text' ) {
                          return (
                            <label
                              htmlFor={ `section-${field.name}-${form.id}` }
                              key={ `${field.name}-${form.id}` }
                            >
                              { field.label || '' }
                              <input
                                id={ `section-${field.name}-${form.id}` }
                                data-parent={ form.id }
                                name={ field.name }
                                onChange={ e => handleInput( e ) }
                                type="text"
                                value={ selected[0][field.name] }
                              />
                            </label>
                          );
                        }
                        if ( field.type === 'textarea' ) {
                          return (
                            <label
                              htmlFor={ `section-${field.name}-${form.id}` }
                              key={ `${field.name}-${form.id}` }
                            >
                              { field.label || '' }
                              <textarea
                                id={ `section-${field.name}-${form.id}` }
                                data-parent={ form.id }
                                name={ `${field.name}` }
                                onChange={ e => handleInput( e ) }
                                rows="6"
                                value={ selected[0][field.name] }
                              />
                            </label>
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
            <button className="button-secondary" onClick={ () => handleRemove() } type="button">
              { `Remove ${label}` || 'Remove Section' }
            </button>
          ) }
          <button
            className="button-secondary"
            disabled={ forms && forms.length === maxTabs }
            onClick={ () => handleAdd() }
            styleName="tab-button"
            type="button"
          >
            { `Add ${label}` || 'Add Section' }
          </button>
        </div>
      </div>
    </div>
  );
};

TabbedForm.propTypes = {
  fields: propTypes.array,
  group: propTypes.string,
  inputs: propTypes.object,
  label: propTypes.string,
  maxTabs: propTypes.number,
  stateFunc: propTypes.func
};

TabbedForm.defaultProps = {
  maxTabs: 3
};

export default TabbedForm;
