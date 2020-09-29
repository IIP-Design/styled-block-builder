import React from 'react';

import Wheel from 'metabox/components/Spinner/Wheel';

import './Spinner.module.scss';

const Spinner = () => (
  <div styleName="container">
    <div styleName="spinner-background">
      <strong>Saving...</strong>
      <Wheel />
    </div>
  </div>
);

export default Spinner;
