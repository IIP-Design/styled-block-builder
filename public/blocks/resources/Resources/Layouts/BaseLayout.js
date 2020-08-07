import React from 'react';
import propTypes from 'prop-types';

import './Layouts.module.scss';

const BaseLayout = ( { data } ) => (
  <div styleName="content no-columns">
    <h3 className="gpalab-site-specific" styleName="content-title">{ data.title }</h3>
    { data.text && <div className="gpalab-site-specific" dangerouslySetInnerHTML={ { __html: data.text } } styleName="content-text" /> }
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object,
};

export default BaseLayout;
