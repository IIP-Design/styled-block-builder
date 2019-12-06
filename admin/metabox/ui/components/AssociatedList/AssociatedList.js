import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './AssociatedList.module.scss';

const AssociatedList = ( { list, edit } ) => {
  return (
    <Fragment>
      <h4 styleName="header">Existing Templates for This Post:</h4>
      <div styleName="list">
        { list.map( item => (
          <div data-id={ item.id } key={ item.id } styleName="list-item">
            { item.title }
            <button onClick={ () => edit( item.id, item.type ) } styleName="button" type="button">
              <span className="dashicons dashicons-edit" />
            </button>
            <button styleName="button" type="button">
              <span className="dashicons dashicons-no" />
            </button>
          </div>
        ) ) }
      </div>
    </Fragment>
  );
};

AssociatedList.propTypes = {
  edit: propTypes.func,
  list: propTypes.array
};

export default AssociatedList;
