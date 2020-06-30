import React from 'react';
import propTypes from 'prop-types';

import './Layouts.module.scss';

const BaseLayout = ( { data } ) => (
  <div styleName="content no-columns">
    <h5 styleName="content-title">{ data.title }</h5>
    <div styleName="content-text"><p>{ data.text }</p></div>
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object,
};

export default BaseLayout;
