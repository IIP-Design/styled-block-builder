import React from 'react';
import propTypes from 'prop-types';

import './Layouts.module.scss';

const BaseLayout = ( { data } ) => (
  <div styleName="content no-columns">
    <p styleName="content-title">{ data.title }</p>
    <div styleName="content-text">{ data.text }</div>
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object
};

export default BaseLayout;
