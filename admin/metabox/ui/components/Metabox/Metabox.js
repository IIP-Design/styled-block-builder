import React, { useEffect, useReducer, useState } from 'react';

import AssociatedList from 'metabox/components/AssociatedList/AssociatedList';
import Modal from 'metabox/components/Modal/Modal';
import { MetaboxContext, metaboxReducer } from './MetaboxContext';

import './Metabox.module.scss';

const MetaBox = () => {
  const [formType, setFormType] = useState('');

  const initialState = {
    formData: {
      formId: 0,
      formType: '',
      formValues: {}
    },
    showModal: false,
    templates: [],
    updating: []
  };

  const [state, dispatch] = useReducer(metaboxReducer, initialState);

  const store = {
    dispatch,
    state
  };

  useEffect(() => {
    const list = window?.gpalabTemplateAdmin?.associated
      ? window.gpalabTemplateAdmin.associated
      : [];

    dispatch({ type: 'init', payload: list });
  }, []);

  return (
    <div styleName="dropdown-container">
      <MetaboxContext.Provider value={store}>
        <label htmlFor="gpalab-templates-dropdown">
          <strong>Add Template:</strong>
          <select
            id="gpalab-templates-dropdown"
            styleName="dropdown"
            value={formType}
            onBlur={e => setFormType(e.target.value)}
            onChange={e => setFormType(e.target.value)}
          >
            <option value="">- Select Template Type -</option>
            <option value="article-feed">Article Feed</option>
            <option value="hero">Hero Block</option>
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
          disabled={formType === ''}
          type="button"
          onClick={() =>
            dispatch({
              type: 'modal-show',
              payload: { formId: 0, formType, formValues: {} }
            })
          }
        >
          Configure Template
        </button>
        {state?.templates && state.templates.length > 0 && <AssociatedList />}
        <Modal />
      </MetaboxContext.Provider>
    </div>
  );
};

export { MetaboxContext, MetaBox as default };
