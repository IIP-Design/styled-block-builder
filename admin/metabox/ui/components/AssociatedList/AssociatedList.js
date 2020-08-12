import React, { Fragment, useContext } from 'react';

import { AdminContext } from 'metabox/context/adminContext';
import { updatePost } from 'metabox/utils/update-post';
import { formatBlockType } from 'metabox/utils/block-titles';

import './AssociatedList.module.scss';

const AssociatedList = () => {
  const { dispatch, state } = useContext( AdminContext );
  const { blocks, updating } = state;

  const deleteItem = async id => {
    dispatch( { type: 'updating-add', payload: id } );

    await updatePost( { id }, 'delete' );

    dispatch( { type: 'updating-remove', payload: id } );
    dispatch( { type: 'delete', payload: id } );
  };

  const isUpdating = id => updating && updating.includes( id );

  return (
    <Fragment>
      <strong styleName="header">Existing Blocks for This Post:</strong>
      <div styleName="list">
        { blocks.map( item => (
          <div
            key={ item.id }
            data-id={ item.id }
            styleName={ isUpdating( item.id ) ? 'list-item disabled' : 'list-item' }
          >
            { item.title || formatBlockType( item.type ) }
            <button
              aria-label="edit block"
              disabled={ isUpdating( item.id ) }
              styleName="button"
              type="button"
              onClick={ () => dispatch( {
                type: 'modal-show',
                payload: {
                  formId: item.id,
                  formType: item.type,
                  formValues: item.meta,
                },
              } ) }
            >
              <span className="dashicons dashicons-edit" />
            </button>
            <button
              aria-label="delete block"
              disabled={ isUpdating( item.id ) }
              styleName={ isUpdating( item.id ) ? 'button disabled' : 'button' }
              type="button"
              onClick={ () => deleteItem( item.id ) }
            >
              <span className="dashicons dashicons-trash" />
            </button>
          </div>
        ) ) }
      </div>
    </Fragment>
  );
};

export default AssociatedList;
