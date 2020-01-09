import React, { Fragment, useContext, useEffect } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import { AdminContext } from 'metabox/context/adminContext';
import { defaultSubHeaders } from 'metabox/utils/color-picker-palettes';
import { handleChange } from 'metabox/utils/dispatch-helpers';

const SlidesForm = () => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  // Initialize color pickers with default values if no color already selected.
  useEffect(() => {
    if (!state?.formData?.formValues?.subTitleColor) {
      dispatch({ type: 'form-update', payload: { name: 'subTitleColor', value: '#d01319' } });
    }
  }, []);

  const colorSubHeader = {
    group: 'subTitleColor',
    options: defaultSubHeaders
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
            onChange={e => handleChange(e, dispatch)}
          />
        </label>
        <ColorPicker
          colors={colorSubHeader}
          label="Set slide subheadings background color:"
          selected={formValues.subTitleColor}
        />
        <TabbedForm fields={tabFields} group="slides" label="Slide" maxTabs={10} />
      </Fragment>
    );
  }

  return null;
};

export default SlidesForm;
