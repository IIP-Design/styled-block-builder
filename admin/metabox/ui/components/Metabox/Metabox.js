import React, { useEffect, useState } from 'react';

import AssociatedList from 'metabox/components/AssociatedList/AssociatedList';
import Modal from 'metabox/components/Modal/Modal';
import { getAssociated } from 'metabox/utils/api';

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

  const updateAssociated = async () => {
    const endpoint = window?.gpalabTemplateAdmin?.apiEndpoint
      ? window.gpalabTemplateAdmin.apiEndpoint
      : null;

    const response = await getAssociated( endpoint );

    setAssociated( response.gpalab_associated_templates );
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
