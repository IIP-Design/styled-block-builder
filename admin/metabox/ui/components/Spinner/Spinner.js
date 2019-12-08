import React, { Fragment } from 'react';

import './Spinner.module.scss';

const Spinner = () => (
  <Fragment>
    <div styleName="background" />
    <div styleName="container">
      <div styleName="spinner-background">
        <strong>Saving...</strong>
        <div styleName="spinner" />
      </div>
    </div>
  </Fragment>
);

export default Spinner;
