import React from 'react';
import propTypes from 'prop-types';

import Button from 'blocks/_shared/components/Button/Button';

import './Layouts.module.scss';

const BaseLayout = ( { data } ) => (
  <div styleName="content no-columns">
    <h3 className="gpalab-site-specific" styleName="content-title">{ data.title }</h3>
    { data.text && (
      <div
        className="gpalab-site-specific"
        dangerouslySetInnerHTML={ { __html: data.text } }
        styleName="content-text"
      />
    ) }
    { data.buttons && (
      <div styleName="button-container">
        { data.buttons.map( button => (
          <Button
            key={ button.id }
            config={ button }
          />
        ) ) }
      </div>
    ) }
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object,
};

export default BaseLayout;
