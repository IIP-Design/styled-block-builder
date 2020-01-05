import React, { Fragment, useContext, useState } from 'react';
import propTypes from 'prop-types';

import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';
import { updatePost } from 'metabox/utils/update-post';

import './AssociatedList.module.scss';

const AssociatedList = ({ edit }) => {
  const [updating, setUpdating] = useState([]);

  const { dispatch, state } = useContext(MetaboxContext);
  const { templates } = state;

  const deleteItem = async id => {
    const newUpdating = [...updating];
    newUpdating.push(id);
    setUpdating(newUpdating);

    await updatePost({ id }, 'delete');

    const resetUpdating = newUpdating.filter(item => item !== id);
    setUpdating(resetUpdating);
    dispatch({ type: 'delete', payload: id });
  };

  return (
    <Fragment>
      <h4 styleName="header">Existing Templates for This Post:</h4>
      <div styleName="list">
        {templates.map(item => (
          <div
            data-id={item.id}
            key={item.id}
            styleName={updating.includes(item.id) ? 'list-item disabled' : 'list-item'}
          >
            {item.title || item.id}
            <button
              aria-label="edit template"
              disabled={item.id === updating}
              onClick={() => edit(item.id, item.type)}
              styleName="button"
              type="button"
            >
              <span className="dashicons dashicons-edit" />
            </button>
            <button
              aria-label="delete template"
              disabled={item.id === updating}
              onClick={() => deleteItem(item.id)}
              styleName={updating.includes(item.id) ? 'button disabled' : 'button'}
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
