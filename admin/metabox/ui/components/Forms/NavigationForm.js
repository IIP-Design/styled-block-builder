import React, { Fragment, useContext } from 'react';

import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';

import { AdminContext } from 'metabox/context/adminContext';
import { formatBlockType } from 'metabox/utils/block-titles';
import { getBlocks } from 'blocks';
import { handleChange } from 'metabox/utils/event-handlers';

const associated = getBlocks();

const linkOptions = list => {
  const noNav = list.filter( item => item.type !== 'gpalab-navigation' );

  const options = noNav.map( item => {
    const name = `${item.title || formatBlockType( item.type )} - ${item.id}`;

    return { value: item.id, name };
  } );

  return options;
};

const tabFields = [
  { label: 'Add nav item text:', name: 'text', tabTitle: true, type: 'text' },
  { label: 'Choose block to link to:', name: 'link', options: linkOptions( associated ), type: 'select' },
  { label: 'Add an icon to this nav item (works best with square images):', name: 'icon', type: 'file' },
];

const NavigationForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  return (
    <Fragment>
      <label htmlFor="nav-title">
        Add Title:
        <input
          id="nav-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <TabbedForm fields={ tabFields } group="nav" label="Nav Item" maxTabs={ 6 } />
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default NavigationForm;
