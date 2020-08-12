import React, { useEffect, useReducer, useState } from 'react';

import AssociatedList from 'metabox/components/AssociatedList/AssociatedList';
import Modal from 'metabox/components/Modal/Modal';
import { AdminContext, adminReducer } from 'metabox/context/adminContext';

import './Metabox.module.scss';

const MetaBox = () => {
  const [formType, setFormType] = useState( '' );
  const { feedOptions } = window?.gpalabBlockAdmin;

  const initialState = {
    formData: {
      formId: 0,
      formType: '',
      formValues: {},
    },
    showModal: false,
    blocks: [],
    updating: [],
  };

  const [state, dispatch] = useReducer( adminReducer, initialState );

  const store = {
    dispatch,
    state,
  };

  useEffect( () => {
    const list = window?.gpalabBlockAdmin?.associated ? window.gpalabBlockAdmin.associated : [];

    dispatch( { type: 'init', payload: list } );
  }, [] );

  const showArticleFeed = Array.isArray( feedOptions ) && feedOptions.length > 0;

  return (
    <div styleName="dropdown-container">
      <AdminContext.Provider value={ store }>
        <label htmlFor="gpalab-blocks-dropdown">
          <strong>Add Block:</strong>
          <select
            id="gpalab-blocks-dropdown"
            styleName="dropdown"
            value={ formType }
            onBlur={ e => setFormType( e.target.value ) }
            onChange={ e => setFormType( e.target.value ) }
          >
            <option value="">- Select Block Type -</option>
            { showArticleFeed && <option value="article-feed">Article Feed</option> }
            <option value="hero">Hero Block</option>
            <option value="navigation">Navigation Block</option>
            <option value="parallax">Parallax Block</option>
            <option value="quote-box">Quote Box</option>
            <option value="resources">Resources Block</option>
            <option value="slides">Slides Block</option>
            <option value="stats">Stats Block</option>
            <option value="text">Text Block</option>
            <option value="timeline">Timeline Block</option>
          </select>
        </label>
        <button
          className="button-secondary"
          disabled={ formType === '' }
          type="button"
          onClick={ () => dispatch( {
            type: 'modal-show',
            payload: { formId: 0, formType, formValues: {} },
          } ) }
        >
          Configure Block
        </button>
        { state?.blocks && state.blocks.length > 0 && <AssociatedList /> }
        <Modal />
      </AdminContext.Provider>
    </div>
  );
};

export default MetaBox;
