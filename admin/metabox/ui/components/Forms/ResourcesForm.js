import React, { Fragment, useContext } from 'react';

import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/dispatch-helpers';

const ResourcesForm = () => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

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
          onChange={e => handleChange(e, dispatch)}
        />
      </label>
      <label htmlFor="resources-subtitle">
        Add sub-title:
        <input
          id="resources-subtitle"
          name="subtitle"
          type="text"
          value={formValues.subtitle || ''}
          onChange={e => handleChange(e, dispatch)}
        />
      </label>
      <TabbedForm fields={tabFields} group="resources" label="Resource" />
      <FullWidthToggle checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default ResourcesForm;
