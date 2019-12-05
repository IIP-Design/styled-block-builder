import React, { useState } from 'react';

import Modal from '../Modal/Modal';

import './Metabox.module.scss';

const MetaBox = () => {
  const [selected, setSelected] = useState( '' );
  const [showModal, setShowModal] = useState( false );

  const toggleModal = () => {
    setShowModal( false );
    setSelected( '' );
  };

  return (
    <div styleName="dropdown-container">
      <label htmlFor="gpalab-templates-dropdown">
        Add Template:
        <select
          styleName="dropdown"
          id="gpalab-templates-dropdown"
          onChange={ e => setSelected( e.target.value ) }
          value={ selected }
        >
          <option value="">- Select Template Type -</option>
          <option value="quote-box">Quote Box</option>
        </select>
      </label>
      <button
        className="button-secondary"
        disabled={ selected === '' }
        onClick={ () => setShowModal( true ) }
        type="button"
      >
        Configure Template
      </button>
      <Modal form={ selected } show={ showModal } toggle={ toggleModal } />
    </div>
  );
};
export default MetaBox;
