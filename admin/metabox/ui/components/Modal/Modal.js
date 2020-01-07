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
import { AdminContext } from 'metabox/context/adminContext';
import { updatePost } from 'metabox/utils/update-post';

import './Modal.module.scss';

const modalRoot = document.getElementById('gpalab-add-template-modal');

const ModalContent = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(null);

  // Get array of associated templates
  const { dispatch, state } = useContext(AdminContext);

  if (state && state.showModal && state.showModal === true) {
    const formData = state?.formData ? state.formData : { formId: 0, formType: '' };

    let selectedForm = null;
    let formTitle = null;
    const formStr = formData.formType.replace('gpalab-', '');

    switch (formStr) {
      case 'article-feed':
        formTitle = 'Configure Your Article Feed:';
        selectedForm = <ArticleFeedForm />;
        break;
      case 'hero':
        formTitle = 'Configure Your Hero Block:';
        selectedForm = <HeroForm />;
        break;
      case 'parallax':
        formTitle = 'Configure Your Parallax Block:';
        selectedForm = <ParallaxForm />;
        break;
      case 'quote-box':
        formTitle = 'Configure Your Quote Box:';
        selectedForm = <QuoteBoxForm />;
        break;
      case 'resources':
        formTitle = 'Configure Your Resources Block:';
        selectedForm = <ResourcesForm />;
        break;
      case 'slides':
        formTitle = 'Configure Your Slides Block:';
        selectedForm = <SlidesForm />;
        break;
      case 'stats':
        formTitle = 'Configure Your Stats Block:';
        selectedForm = <StatsForm />;
        break;
      case 'text':
        formTitle = 'Configure Your Text Block:';
        selectedForm = <TextForm />;
        break;
      case 'timeline':
        formTitle = 'Configure Your Timeline Block:';
        selectedForm = <TimelineForm />;
        break;
      default:
        return null;
    }

    const submitForm = async () => {
      const onComplete = res => {
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
        { id: formData.formId, meta: formData.formValues, type: formStr },
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
            styleName="close-icon"
            type="button"
            onClick={() => dispatch({ type: 'modal-hide' })}
          >
            <span className="dashicons dashicons-no" />
          </button>
          {saving && <Spinner />}
          {error && <ErrorMessage closeFunc={() => setError(false)} err={errorData} />}
          {selectedForm && (
            <form styleName="modal-form">
              <h3 styleName="modal-form-title">{formTitle}</h3>
              <div
                styleName={
                  error || saving ? 'modal-form-background obscured' : 'modal-form-background'
                }
              >
                {selectedForm}
              </div>
              <div styleName="modal-controls">
                <label htmlFor="copy-shortcode">
                  {formData.formId !== 0 && (
                    <input
                      id="copy-shortcode"
                      readOnly
                      styleName="shortcode-input"
                      type="text"
                      value={shortcode}
                    />
                  )}
                </label>
                <button
                  className="button-secondary"
                  type="button"
                  onClick={() => dispatch({ type: 'modal-hide' })}
                >
                  Cancel
                </button>
                <button className="button-primary" type="button" onClick={submitForm}>
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const Modal = () => createPortal(<ModalContent />, modalRoot);

export default Modal;
