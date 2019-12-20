import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';

import { updatePost } from 'metabox/utils/update-post';

import './AssociatedList.module.scss';

const AssociatedList = ( { list, edit, updateMetabox } ) => {
  const [updating, setUpdating] = useState( [] );

  const deleteItem = async id => {
    const newUpdating = [...updating];
    newUpdating.push( id );
    setUpdating( newUpdating );

    await updatePost( { id }, 'delete' );

    const resetUpdating = newUpdating.filter( item => item !== id );
    setUpdating( resetUpdating );
    updateMetabox( id, 'delete' );
  };

  return (
    <Fragment>
      <h4 styleName="header">Existing Templates for This Post:</h4>
      <div styleName="list">
        { list.map( item => (
          <div
            data-id={ item.id }
            key={ item.id }
            styleName={ updating.includes( item.id ) ? 'list-item disabled' : 'list-item' }
          >
            { item.title || item.id }
            <button
              aria-label="edit template"
              disabled={ item.id === updating }
              onClick={ () => edit( item.id, item.type ) }
              styleName="button"
              type="button"
            >
              <span className="dashicons dashicons-edit" />
            </button>
            <button
              aria-label="delete template"
              disabled={ item.id === updating }
              onClick={ () => deleteItem( item.id ) }
              styleName={ updating.includes( item.id ) ? 'button disabled' : 'button' }
              type="button"
            >
              <span className="dashicons dashicons-trash" />
            </button>
          </div>
        ) ) }
      </div>
    </Fragment>
  );
};

AssociatedList.propTypes = {
  edit: propTypes.func,
  list: propTypes.array,
  updateMetabox: propTypes.func
};

export default AssociatedList;
