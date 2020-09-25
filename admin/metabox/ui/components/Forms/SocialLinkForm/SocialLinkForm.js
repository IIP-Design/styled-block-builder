import React, { useContext } from 'react';

import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';

import './SocialLinkForm.module.scss';

const SocialLinkForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  return (
    <div styleName="form">
      <strong styleName="title">Add Social Links:</strong>
      <label htmlFor="facebook">
        Facebook:
        <input
          id="facebook"
          name="facebook"
          type="text"
          value={ formValues.facebook || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="twitter">
        Twitter:
        <input
          id="twitter"
          name="twitter"
          type="text"
          value={ formValues.twitter || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="instagram">
        Instagram:
        <input
          id="instagram"
          name="instagram"
          type="text"
          value={ formValues.instagram || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="youtube">
        YouTube:
        <input
          id="youtube"
          name="youtube"
          type="text"
          value={ formValues.youtube || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
    </div>
  );
};

export default SocialLinkForm;
