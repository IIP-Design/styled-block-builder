import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import CDPFeed from '../../../_shared/components/CDPFeed/CDPFeed';

const BaseLayout = ( { data } ) => (
  <div className="resource-section hidden" id={ data.id }>
    <div className="resource-section-content" id={ data.id }>
      <div className="resource-content no-columns">
        <p className="resource-content-title">{ data.title }</p>
        <div className="resource-content-text">{ data.text }</div>
      </div>
      { data.cdp && (
        <Fragment>
          <hr className="resource-hr" />
          <CDPFeed id={ data.id } items={ data.cdp } />
        </Fragment>
      ) }
    </div>
  </div>
);

BaseLayout.propTypes = {
  data: propTypes.object
};

export default BaseLayout;
