import React, { Fragment, useContext } from 'react';

import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { AdminContext } from 'metabox/context/adminContext';

const ResourcesForm = () => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'form-update', payload: { name, value } });
  };

  const handleToggle = e => {
    const { name } = e.target;
    const isChecked = formValues[name] || false;

    dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
  };

  const tabFields = [
    { label: 'Add section title:', name: 'title', tabTitle: true, type: 'text' },
    { label: 'Add section text:', name: 'text', type: 'textarea' },
    { label: 'Add video url:', name: 'video', type: 'text' },
    { label: 'Add an Article Feed?', name: 'hasFeed', type: 'article-feed' }
  ];

  return (
    <Fragment>
      <label htmlFor="resources-title">
        Add title:
        <input
          id="resources-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <label htmlFor="resources-subtitle">
        Add sub-title:
        <input
          id="resources-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <TabbedForm fields={tabFields} group="resources" label="Resource" />
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default ResourcesForm;
