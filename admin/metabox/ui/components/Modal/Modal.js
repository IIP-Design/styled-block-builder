import React, { useState } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

import QuoteBoxForm from '../Forms/QuoteBoxForm';
import { savePost } from '../../utils/save-post';

import './Modal.module.scss';

const modalRoot = document.getElementById( 'gpalab-add-template-modal' );

const ModelContent = ( { form, show, toggle } ) => {
  if ( !show ) return null;

  const [data, setData] = useState( {} );

  let selectedForm = null;

  if ( form && form === 'quote-box' ) {
    selectedForm = <QuoteBoxForm callback={ setData } />;
  }

  return (
    <div styleName="modal">
      <div styleName="modal-background" />
      <div styleName="modal-foreground">
        { selectedForm }
        <div styleName="modal-buttons">
          <button className="button-secondary" onClick={ toggle } type="button">
            Cancel
          </button>
          <button
            className="button-primary"
            onClick={ () => savePost( { meta: data, type: form } ) }
            type="button"
          >
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
