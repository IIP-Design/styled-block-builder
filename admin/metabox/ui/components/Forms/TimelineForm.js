import React, { Fragment, useContext } from 'react';

import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

const TimelineForm = () => {
  const { dispatch, state } = useContext(MetaboxContext);
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
    { label: 'Add Event Title:', name: 'subtitle', tabTitle: true, type: 'text' },
    { label: 'Add URL for Background Image:', name: 'image', type: 'text' },
    { label: 'Add Event Year:', name: 'year', type: 'text' },
    { label: 'Add Event Text (Short description of event):', name: 'text', type: 'text' }
  ];

  return (
    <Fragment>
      <label htmlFor="events-title">
        Add Block Title:
        <input
          id="events-title"
          name="title"
          type="text"
          value={formValues.title || ''}
          onChange={e => handleChange(e)}
        />
      </label>
      <TabbedForm fields={tabFields} group="events" label="Event" maxTabs={5} />
      <FullWidthToggle callback={handleToggle} checked={formValues.fullWidth} />
    </Fragment>
  );
};

export default TimelineForm;
