import React, { Fragment } from 'react';

import './metabox.scss';

const MetaBox = () => (
  <Fragment>
    <label htmlFor="gpalab-templates-dropdown">
      Add Template:
      <select className="gpalab-admin-dropdown" id="gpalab-templates-dropdown">
        <option value="">- Select Template Type -</option>
        <option value="quote-box">Quote Box</option>
      </select>
    </label>
    <button className="button-secondary" type="button">
      Configure Template
    </button>
  </Fragment>
);

export default MetaBox;
