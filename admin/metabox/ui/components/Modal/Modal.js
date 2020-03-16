import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import ErrorMessage from 'metabox/components/ErrorMessage/ErrorMessage';
import Spinner from 'metabox/components/Spinner/Spinner';
import { AdminContext } from 'metabox/context/adminContext';
import { selectForm, selectTitle } from 'metabox/utils/select-form';
import { updatePost } from 'metabox/utils/update-post';

import './Modal.module.scss';

const modalRoot = document.getElementById('gpalab-blocks-modal');

const ModalContent = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(null);

  // Get array of associated blocks
  const { dispatch, state } = useContext(AdminContext);

  if (state && state.showModal && state.showModal === true) {
    const formData = state?.formData ? state.formData : { formId: 0, formType: '' };

    const formStr = formData.formType.replace('gpalab-', '');

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

    // Generate shortcode for copying.
    const title = formData?.formValues?.title ? `title='${formData.formValues.title}'` : '';
    const shortcode = `[gpalab_block ${title} id='${formData.formId}' type='${formStr}']`;

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
          {formStr && (
            <form styleName="modal-form">
              <h3 styleName="modal-form-title">{selectTitle(formStr)}</h3>
              <div
                styleName={
                  error || saving ? 'modal-form-background obscured' : 'modal-form-background'
                }
              >
                {selectForm(formStr)}
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
