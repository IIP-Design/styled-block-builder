import React from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

import QuoteBoxForm from '../Forms/QuoteBoxForm';
import { savePost } from '../../utils/save-post';

import './Modal.scss';

const modalRoot = document.getElementById( 'gpalab-add-template-modal' );

const ModelContent = ( { form, show, toggle } ) => {
  if ( !show ) return null;

  let selectedForm = null;

  if ( form && form === 'quote-box' ) {
    selectedForm = <QuoteBoxForm />;
  }

  return (
    <div className="gpalab-modal">
      <div className="gpalab-modal-background" />
      <div className="gpalab-modal-foreground">
        { selectedForm }
        <div className="gpalab-modal-buttons">
          <button className="button-secondary" onClick={ toggle } type="button">
            Cancel
          </button>
          <button className="button-primary" onClick={ savePost } type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

ModelContent.propTypes = {
  form: propTypes.string,
  show: propTypes.bool,
  toggle: propTypes.func
};

const Modal = ( { form, show, toggle } ) =>
  createPortal( <ModelContent form={ form } show={ show } toggle={ toggle } />, modalRoot );

export default Modal;
