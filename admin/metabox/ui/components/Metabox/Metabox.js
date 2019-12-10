import React, { useState } from 'react';

import AssociatedList from '../AssociatedList/AssociatedList';
import Modal from '../Modal/Modal';

import './Metabox.module.scss';

const MetaBox = () => {
  const [formId, setFormId] = useState( 0 );
  const [formType, setFormType] = useState( '' );
  const [showModal, setShowModal] = useState( false );

  const associated = window?.gpalabTemplateAdmin?.associated
    ? window.gpalabTemplateAdmin.associated
    : [];

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
          <option value="quote-box">Quote Box</option>
          <option value="resources">Resources Block</option>
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
      { associated.length > 0 && <AssociatedList list={ associated } edit={ editExisting } /> }
      <Modal id={ formId } form={ formType } show={ showModal } toggle={ toggleModal } />
    </div>
  );
};
export default MetaBox;
