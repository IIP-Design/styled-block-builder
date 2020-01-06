import React, { useContext, useState } from 'react';
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
import TimelineForm from 'metabox/components/Forms/TimelineForm';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import { updatePost } from 'metabox/utils/update-post';

import './Modal.module.scss';

const modalRoot = document.getElementById('gpalab-add-template-modal');

const ModalContent = () => {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(null);

  // Get array of associated templates
  const { dispatch, state } = useContext(MetaboxContext);

  if (state && state.showModal && state.showModal === true) {
    const templates = state?.templates ? state.templates : [];
    const formData = state?.formData ? state.formData : { formId: 0, formType: '' };

    // Pick out the one selected for editing and get it's metadata
    // console.log(templates);
    const current = templates.filter(item => item.id === formData.formId)[0];
    const meta = current?.meta ? current.meta : {};

    let selectedForm = null;
    let formTitle = null;
    const formStr = formData.formType.replace('gpalab-', '');

    switch (formStr) {
      case 'article-feed':
        formTitle = 'Configure Your Article Feed:';
        selectedForm = <ArticleFeedForm callback={setData} meta={meta} />;
        break;
      case 'hero':
        formTitle = 'Configure Your Hero Block:';
        selectedForm = <HeroForm callback={setData} meta={meta} />;
        break;
      case 'parallax':
        formTitle = 'Configure Your Parallax Block:';
        selectedForm = <ParallaxForm callback={setData} meta={meta} />;
        break;
      case 'quote-box':
        formTitle = 'Configure Your Quote Box:';
        selectedForm = <QuoteBoxForm callback={setData} meta={meta} />;
        break;
      case 'resources':
        formTitle = 'Configure Your Resources Block:';
        selectedForm = <ResourcesForm callback={setData} meta={meta} />;
        break;
      case 'slides':
        formTitle = 'Configure Your Slides Block:';
        selectedForm = <SlidesForm callback={setData} meta={meta} />;
        break;
      case 'stats':
        formTitle = 'Configure Your Stats Block:';
        selectedForm = <StatsForm callback={setData} meta={meta} />;
        break;
      case 'text':
        formTitle = 'Configure Your Text Block:';
        selectedForm = <TextForm callback={setData} meta={meta} />;
        break;
      case 'timeline':
        formTitle = 'Configure Your Timeline Block:';
        selectedForm = <TimelineForm callback={setData} meta={meta} />;
        break;
      default:
        return null;
    }

    const submitForm = async () => {
      const onComplete = (res, action) => {
        dispatch({ type: 'save', payload: res });
        setSaving(false);
      };

      const onError = err => {
        setSaving(false);
        setError(true);
        setErrorData(err);
      };

      setSaving(true);
      await updatePost(
        { id: formData.formId, meta: data, type: formStr },
        'save',
        onComplete,
        onError
      );
    };

    const shortcode = `[gpalab_template id='${formData.formId}' type='${formStr}']`;

    return (
      <div styleName="modal">
        <div styleName="modal-background" />
        <div styleName="modal-foreground">
          <button
            aria-label="close modal"
            onClick={() => dispatch({ type: 'modal-hide' })}
            styleName="close-icon"
            type="button"
          >
            <span className="dashicons dashicons-no" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
const Modal = props => createPortal(<ModalContent {...props} />, modalRoot);

export default Modal;
