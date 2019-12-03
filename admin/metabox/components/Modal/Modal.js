import React from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './Modal.scss';

const modalRoot = document.getElementById( 'gpalab-add-template-modal' );

const ModelContent = ( { show } ) => {
  if ( !show ) return null;

  return (
    <div className="gpalab-modal">
      <div className="gpalab-modal-background" />
      <div className="gpalab-modal-foreground">This is the modal</div>
    </div>
  );
};

ModelContent.propTypes = {
  show: propTypes.bool
};

const Modal = ( { show } ) => createPortal( <ModelContent show={ show } />, modalRoot );

export default Modal;
