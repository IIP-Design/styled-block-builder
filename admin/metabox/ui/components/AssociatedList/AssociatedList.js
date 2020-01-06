import React, { Fragment, useContext } from 'react';
import propTypes from 'prop-types';

import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import { updatePost } from 'metabox/utils/update-post';

import './AssociatedList.module.scss';

const AssociatedList = ({ edit }) => {
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
            data-id={item.id}
            key={item.id}
            styleName={isUpdating(item.id) ? 'list-item disabled' : 'list-item'}
          >
            {item.title || item.id}
            <button
              aria-label="edit template"
              disabled={isUpdating(item.id)}
              onClick={() => edit(item.id, item.type)}
              styleName="button"
              type="button"
            >
              <span className="dashicons dashicons-edit" />
            </button>
            <button
              aria-label="delete template"
              disabled={isUpdating(item.id)}
              onClick={() => deleteItem(item.id)}
              styleName={isUpdating(item.id) ? 'button disabled' : 'button'}
              type="button"
            >
              <span className="dashicons dashicons-trash" />
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

AssociatedList.propTypes = {
  edit: propTypes.func
};

export default AssociatedList;
