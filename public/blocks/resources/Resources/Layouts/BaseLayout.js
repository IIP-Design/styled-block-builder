import React from 'react';
import propTypes from 'prop-types';

import './Layouts.module.scss';

const BaseLayout = ( { data } ) => (
  <div styleName="content no-columns">
    <h5 styleName="content-title">{ data.title }</h5>
    { data.text && <div className="gpalab-site-specific" dangerouslySetInnerHTML={ { __html: data.text } } styleName="content-text" /> }
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object,
};

export default BaseLayout;
