import React, { useState } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

import ArticleFeedForm from 'metabox/components/Forms/ArticleFeedForm';
import ErrorMessage from 'metabox/components/ErrorMessage/ErrorMessage';
import HeroForm from 'metabox/components/Forms/HeroForm';
import ParallaxForm from 'metabox/components/Forms/ParallaxForm';
import QuoteBoxForm from 'metabox/components/Forms/QuoteBoxForm';
import ResourcesForm from 'metabox/components/Forms/ResourcesForm';
import Spinner from 'metabox/components/Spinner/Spinner';
import SlidesForm from 'metabox/components/Forms/SlidesForm';
import StatsForm from 'metabox/components/Forms/StatsForm';
import TextForm from 'metabox/components/Forms/TextForm';
import { updatePost } from 'metabox/utils/update-post';

import './Modal.module.scss';

const modalRoot = document.getElementById( 'gpalab-add-template-modal' );

const ModelContent = ( { form, id, show, toggle, updateMetabox } ) => {
  if ( !show ) return null;

  const [data, setData] = useState( {} );
  const [saving, setSaving] = useState( false );
  const [error, setError] = useState( false );
  const [errorData, setErrorData] = useState( null );

  // Get array of associated templates
  const template = window?.gpalabTemplateAdmin?.associated
    ? window.gpalabTemplateAdmin.associated
    : [];

  // Pick out the one selected for editing and get it's metadata
  const current = template.filter( item => item.id === id )[0];
  const meta = current?.meta ? current.meta : {};

  let selectedForm = null;
  let formTitle = null;
  const formStr = form.replace( 'gpalab-', '' );
  switch ( formStr ) {
    case 'article-feed':
      formTitle = 'Configure Your Article Feed:';
      selectedForm = <ArticleFeedForm callback={ setData } meta={ meta } />;
      break;
    case 'hero':
      formTitle = 'Configure Your Hero Block:';
      selectedForm = <HeroForm callback={ setData } meta={ meta } />;
      break;
    case 'parallax':
      formTitle = 'Configure Your Parallax Block:';
      selectedForm = <ParallaxForm callback={ setData } meta={ meta } />;
      break;
    case 'quote-box':
      formTitle = 'Configure Your Quote Box:';
      selectedForm = <QuoteBoxForm callback={ setData } meta={ meta } />;
      break;
    case 'resources':
      formTitle = 'Configure Your Resources Block:';
      selectedForm = <ResourcesForm callback={ setData } meta={ meta } />;
      break;
    case 'slides':
      formTitle = 'Configure Your Slides Block:';
      selectedForm = <SlidesForm callback={ setData } meta={ meta } />;
      break;
    case 'stats':
      formTitle = 'Configure Your Stats Block:';
      selectedForm = <StatsForm callback={ setData } meta={ meta } />;
      break;
    case 'text':
      formTitle = 'Configure Your Text Block:';
      selectedForm = <TextForm callback={ setData } meta={ meta } />;
      break;
    default:
      return;
  }

  const submitForm = async () => {
    const onComplete = () => setSaving( false );
    const onError = err => {
      setSaving( false );
      setError( true );
      setErrorData( err );
    };

    setSaving( true );
    await updatePost( { id, meta: data, type: formStr }, 'save', onComplete, onError );
    updateMetabox();
  };

  const shortcode = `[gpalab_template id='${id}' type='${formStr}']`;

  return (
    <div styleName="modal">
      <div styleName="modal-background" />
      <div styleName="modal-foreground">
        <button aria-label="close modal" onClick={ toggle } styleName="close-icon" type="button">
          <span className="dashicons dashicons-no" />
        </button>
        { saving && <Spinner /> }
        { error && <ErrorMessage closeFunc={ () => setError( false ) } err={ errorData } /> }
        { selectedForm && (
          <form styleName="modal-form">
            <h3 styleName="modal-form-title">{ formTitle }</h3>
            { selectedForm }
          </form>
        ) }
        <div styleName="modal-controls">
          <label htmlFor="copy-shortcode">
            { id !== 0 && (
              <input
                styleName="shortcode-input"
                id="copy-shortcode"
                readOnly
                type="text"
                value={ shortcode }
              />
            ) }
          </label>
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
  toggle: propTypes.func,
  updateMetabox: propTypes.func
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
const Modal = props => createPortal( <ModelContent { ...props } />, modalRoot );

export default Modal;
