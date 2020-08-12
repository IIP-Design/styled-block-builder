import React, { Fragment, useContext } from 'react';

import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';

import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';

const ResourcesForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const tabFields = [
    { label: 'Add section title:', name: 'title', tabTitle: true, type: 'text' },
    { label: 'Change tab label (defaults to title):', name: 'tab', type: 'text' },
    { label: 'Add section text:', name: 'text', type: 'quill' },
    { label: 'Add a video?', name: 'videos', type: 'video' },
    { label: 'Add an Article Feed?', name: 'hasFeed', type: 'article-feed' },
  ];

  return (
    <Fragment>
      <label htmlFor="resources-title">
        Add Title:
        <input
          id="resources-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <label htmlFor="resources-subtitle">
        Add Subtitle:
        <input
          id="resources-subtitle"
          name="subtitle"
          type="text"
          value={ formValues.subtitle || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <TabbedForm fields={ tabFields } group="resources" label="Resource" />
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default ResourcesForm;
