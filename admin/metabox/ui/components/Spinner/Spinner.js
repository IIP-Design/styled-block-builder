import React from 'react';

import './Spinner.module.scss';

const Spinner = () => (
  <div styleName="container">
    <div styleName="spinner-background">
      <strong>Saving...</strong>
      <div styleName="spinner" />
    </div>
  </div>
);

export default Spinner;
