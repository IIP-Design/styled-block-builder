import React, { Fragment, useContext } from 'react';

import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

const SlidesForm = () => {
  const { dispatch, state } = useContext(MetaboxContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const tabFields = [
    { label: 'Add slide subtitle:', name: 'subtitle', tabTitle: true, type: 'text' },
    { label: 'Add slide background image:', name: 'backgroundImage', type: 'file' },
    { label: 'Add slide text:', name: 'text', type: 'textarea' }
  ];

  if (formValues) {
    return (
      <Fragment>
        <label htmlFor="slides-title">
          Add title:
          <input
            id="slides-title"
            name="title"
            type="text"
            value={formValues.title || ''}
            onChange={e => handleChange(e)}
          />
        </label>
        <TabbedForm fields={tabFields} group="slides" label="Slide" maxTabs={10} />
      </Fragment>
    );
  }

  return null;
};

export default SlidesForm;
