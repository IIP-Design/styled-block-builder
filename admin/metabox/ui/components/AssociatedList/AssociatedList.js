import React, { Fragment, useContext } from 'react';

import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import { updatePost } from 'metabox/utils/update-post';

import './AssociatedList.module.scss';

const AssociatedList = () => {
  const { dispatch, state } = useContext(MetaboxContext);
  const { templates, updating } = state;

  const deleteItem = async id => {
    dispatch({ type: 'updating-add', payload: id });

    await updatePost({ id }, 'delete');

    dispatch({ type: 'updating-remove', payload: id });
    dispatch({ type: 'delete', payload: id });
  };

  const isUpdating = id => updating && updating.includes(id);

  return (
    <Fragment>
      <h4 styleName="header">Existing Templates for This Post:</h4>
      <div styleName="list">
        {templates.map(item => (
          <div
            key={item.id}
            data-id={item.id}
            styleName={isUpdating(item.id) ? 'list-item disabled' : 'list-item'}
          >
            {item.title || item.id}
            <button
              aria-label="edit template"
              disabled={isUpdating(item.id)}
              styleName="button"
              type="button"
              onClick={() =>
                dispatch({
                  type: 'modal-show',
                  payload: {
                    formId: item.id,
                    formType: item.type,
                    formValues: item.meta
                  }
                })
              }
            >
              <span className="dashicons dashicons-edit" />
            </button>
            <button
              aria-label="delete template"
              disabled={isUpdating(item.id)}
              styleName={isUpdating(item.id) ? 'button disabled' : 'button'}
              type="button"
              onClick={() => deleteItem(item.id)}
            >
              <span className="dashicons dashicons-trash" />
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default AssociatedList;
