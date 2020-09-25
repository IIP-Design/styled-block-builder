import React, { Fragment, useContext } from 'react';

import ColorPicker from 'metabox/components/ColorPicker/ColorPicker';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';

import { AdminContext } from 'metabox/context/adminContext';
import { defaultBackgrounds } from 'metabox/utils/color-picker-palettes';

const BackgroundForm = () => {
  const { state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const blockBgGradient = [
    { label: 'Dark Gradient', name: 'backgroundGradient', value: 'dark' },
    { label: 'No Gradient', name: 'backgroundGradient', value: 'off' },
  ];

  const blockBgType = [
    { label: 'Color', name: 'backgroundType', value: 'color' },
    { label: 'Image', name: 'backgroundType', value: 'image' },
  ];

  const blockBgOptions = {
    group: 'blockBackground',
    options: defaultBackgrounds,
  };

  return (
    <Fragment>
      <RadioConditional
        checked={ formValues.backgroundType }
        label="What type of background would you like to apply to this block?"
        options={ blockBgType }
      />
      { formValues.backgroundType === 'color' && (
        <ColorPicker
          colors={ blockBgOptions }
          label="Set block background color:"
          selected={ formValues.blockBackground }
        />
      ) }
      { formValues.backgroundType === 'image' && (
        <Fragment>
          <FileUploader
            label="Add background image:"
            name="backgroundImage"
          />
          <RadioConditional
            checked={ formValues.backgroundGradient || 'off' }
            label="Overlay the image with a gradient (to improve text legibility)?"
            options={ blockBgGradient }
          />
        </Fragment>
      ) }
    </Fragment>
  );
};

export default BackgroundForm;
