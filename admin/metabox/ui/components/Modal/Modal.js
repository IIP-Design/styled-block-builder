import React, { useState } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

import QuoteBoxForm from '../Forms/QuoteBoxForm';
import Spinner from '../Spinner/Spinner';
import TextForm from '../Forms/TextForm';
import { updatePost } from '../../utils/update-post';

import './Modal.module.scss';

const modalRoot = document.getElementById( 'gpalab-add-template-modal' );

const ModelContent = ( { form, id, show, toggle } ) => {
  if ( !show ) return null;

  const [data, setData] = useState( {} );
  const [saving, setSaving] = useState( false );

  // Get array of associated templates
  const template = window?.gpalabTemplateAdmin?.associated
    ? window.gpalabTemplateAdmin.associated
    : [];

  // Pick out the one selected for editing and get it's metadata
  const current = template.filter( item => item.id === id )[0];
  const meta = current?.meta ? current.meta : {};

  let selectedForm = null;
  switch ( form ) {
    case 'quote-box':
      selectedForm = <QuoteBoxForm callback={ setData } meta={ meta } />;
      break;
    case 'text':
      selectedForm = <TextForm callback={ setData } meta={ meta } />;
      break;
    default:
      return;
  }

  const submitForm = () => {
    const onComplete = () => setSaving( false );
    setSaving( true );
    updatePost( { id, meta: data, type: form }, 'save', onComplete );
  };

  return (
    <div styleName="modal">
      <div styleName="modal-background" />
      <div styleName="modal-foreground">
        { saving && <Spinner /> }
        { selectedForm }
        <div styleName="modal-buttons">
          <button className="button-secondary" onClick={ toggle } type="button">
            Cancel
          </button>
          <button className="button-primary" onClick={ submitForm } type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

ModelContent.propTypes = {
  form: propTypes.string,
  id: propTypes.number,
  show: propTypes.bool,
  toggle: propTypes.func
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
const Modal = props => createPortal( <ModelContent { ...props } />, modalRoot );

export default Modal;
