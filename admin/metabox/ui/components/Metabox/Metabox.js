import React, { useEffect, useState } from 'react';

import AssociatedList from 'metabox/components/AssociatedList/AssociatedList';
import Modal from 'metabox/components/Modal/Modal';

import './Metabox.module.scss';

const MetaBox = () => {
  const [formId, setFormId] = useState( 0 );
  const [formType, setFormType] = useState( '' );
  const [showModal, setShowModal] = useState( false );
  const [associated, setAssociated] = useState( [] );

  useEffect( () => {
    const list = window?.gpalabTemplateAdmin?.associated
      ? window.gpalabTemplateAdmin.associated
      : [];

    setAssociated( list );
  }, [] );

  const toggleModal = () => {
    setShowModal( false );
    setFormId( 0 );
    setFormType( '' );
  };

  const editExisting = ( id, type ) => {
    setFormId( id );
    setFormType( type );
    setShowModal( true );
  };

  const updateAssociated = ( res, action ) => {
    const clone = [...associated];

    if ( action === 'save' ) {
      const filtered = clone.filter( items => items.id !== res.id );

      const newItem = {
        id: res.id,
        meta: res.post_meta,
        title: res.post_title,
        type: `gpalab-${res.post_type}`
      };

      filtered.push( newItem );

      setAssociated( filtered );
    }

    if ( action === 'delete' ) {
      const filtered = clone.filter( items => items.id !== res );

      setAssociated( filtered );
    }
  };

  return (
    <div styleName="dropdown-container">
      <label htmlFor="gpalab-templates-dropdown">
        <strong>Add Template:</strong>
        <select
          styleName="dropdown"
          id="gpalab-templates-dropdown"
          onChange={ e => setFormType( e.target.value ) }
          value={ formType }
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
        disabled={ formType === '' }
        onClick={ () => setShowModal( true ) }
        type="button"
      >
        Configure Template
      </button>
      { associated.length > 0 && (
        <AssociatedList list={ associated } edit={ editExisting } updateMetabox={ updateAssociated } />
      ) }
      <Modal
        id={ formId }
        form={ formType }
        show={ showModal }
        toggle={ toggleModal }
        updateMetabox={ updateAssociated }
      />
    </div>
  );
};
export default MetaBox;
