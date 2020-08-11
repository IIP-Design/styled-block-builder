/**
 * The following functions accept various form inputs and route them to the appropriate context dispatch.
 * The are used repeatedly and in several different form components.
 * BE CAREFUL IF CHANGING as you make break other components.
 */

/**
 * Handles form input changes
 *
 * @param {Object} e An event object.
 * @param {dispatch} dispatch The AdminContext dispatch function.
 */
export const handleChange = ( e, dispatch ) => {
  const { name, value } = e.target;

  dispatch( { type: 'form-update', payload: { name, value } } );
};

/**
 * Manages a color change using the color picker component
 *
 * @param {Object} e An event object.
 * @param {dispatch} dispatch The AdminContext dispatch function.
 */
export const handleColor = ( e, dispatch ) => {
  const { group } = e.target.dataset;
  const { value } = e.target;

  dispatch( { type: 'form-update', payload: { name: group, value } } );
};

/**
 * Handles a checkbox toggle
 *
 * @param {Object} e An event object.
 * @param {dispatch} dispatch The AdminContext dispatch function.
 * @param {Object} values Object of form values.
 */
export const handleToggle = ( e, dispatch, values ) => {
  const { name } = e.target;
  const isChecked = values[name] || false;

  dispatch( { type: 'form-update', payload: { name, value: !isChecked } } );
};

/**
 * Handles form input changes for a nested form input.
 *
 * @param {Object} e An event object.
 * @param {dispatch} dispatch The AdminContext dispatch function.
 * @param {string} group Name of the selected group.
 * @param {string} parentGroup Group to which the parent of the selected item belongs.
 * @param {string} parentId The id value of the group where the target object resides.
 */
export const handleChangeNested = ( e, dispatch, group, parentGroup, parentId ) => {
  const { itemid, itemname } = e.target.dataset;
  const { name, value } = e.target;

  const itemName = itemname || name;

  if ( parentGroup ) {
    dispatch( {
      type: 'group-input-nested',
      payload: { itemId: itemid, group, name: itemName, parentGroup, parentId, value },
    } );
  } else {
    dispatch( {
      type: 'group-input',
      payload: { itemId: itemid, group, name, value },
    } );
  }
};

/**
 * Adds a new nested form.
 *
 * @param {dispatch} dispatch The AdminContext dispatch function.
 * @param {Object[]} fields Array of values used to construct input fields.
 * @param {string} group Name of the selected group.
 * @param {string} parentGroup Group to which the parent of the selected item belongs.
 * @param {string} parentId The id value of the group where the target object resides.
 */
export const handleAddNested = ( dispatch, fields, group, parentGroup, parentId ) => {
  if ( parentGroup ) {
    dispatch( {
      type: 'group-add-nested',
      payload: { fields, group, parentGroup, parentId },
    } );
  } else {
    dispatch( { type: 'group-add', payload: { fields, group } } );
  }
};

/**
 * Deletes a nested form.
 *
 * @param {Object} e An event object.
 * @param {dispatch} dispatch The AdminContext dispatch function.
 * @param {string} group Name of the selected group.
 * @param {string} parentGroup Group to which the parent of the selected item belongs.
 * @param {string} parentId The id value of the group where the target object resides.
 */
export const handleRemoveNested = ( e, dispatch, group, parentGroup, parentId ) => {
  const { itemid } = e.target.dataset;

  if ( parentGroup ) {
    dispatch( {
      type: 'group-remove-nested',
      payload: { itemId: itemid, group, parentGroup, parentId },
    } );
  } else {
    dispatch( { type: 'group-remove', payload: { group, id: itemid } } );
  }
};
