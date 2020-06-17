import { v4 as uuid } from 'uuid';

/**
 * Helper function to help manipulate
 *
 * @param {Object[]} data An array of objects to be searched.
 * @param {string} id The id value of the object that the function is searching for.
 * @param {number=} start The default index value.
 * @returns {Object} With three properties: selected item, copy of without selected item, and index of selected object in original array.
 */
const getSelectedFromGroup = ( data, id, start ) => {
  let indexValue = start;

  const selected = data.filter( ( item, index ) => {
    if ( item.id === id ) {
      indexValue = index;
    }

    return item.id === id;
  } )[0];

  const filtered = data.filter( item => item.id !== id );

  return { filtered, indexValue, selected };
};

/**
 * Removes a block from the blocks array in context by id.
 *
 * @param {Object} state The AdminContext object.
 * @param {number} id Selected post id.
 * @returns {Object[]} An array to block objects.
 */
export const blockDelete = ( state, id ) => {
  if ( state?.blocks ) {
    const { filtered } = getSelectedFromGroup( state.blocks, id );

    return filtered;
  }

  return [];
};

/**
 * Add new/edits existing block to/in context array.
 *
 * @param {Object} state The AdminContext object.
 * @param {Object} block Block values.
 * @returns {Object[]} An updated array of blocks.
 *
 * @see {getSelectedFromGroup}
 */
export const blockSave = ( state, block ) => {
  if ( state?.blocks ) {
    const { blocks } = state;

    // ID comes over as a string so must be converted into a number
    const intID = Number( block.id );

    const { filtered, indexValue } = getSelectedFromGroup( blocks, intID, blocks.length );

    const newBlock = {
      id: intID,
      meta: block.post_meta,
      title: block.post_title,
      type: `gpalab-${block.post_type}`,
    };

    filtered.splice( indexValue, 0, newBlock );

    return filtered;
  }

  return [];
};

/**
 * Adds a file to a provided file list.
 *
 * @param {Object} file File object.
 * @param {string} name Identifier for the given file.
 * @param {Object[]} fileList Array of file objects.
 * @returns {Object[]} New array of file objects.
 */
export const fileAdd = ( file, name, fileList ) => {
  const files = fileList || [];

  files.push( { file, name, filename: file.name } );

  return files;
};

/**
 * Adds a file to a provided file list nested within a group.
 *
 * @param {Object} data Data object for the selected group.
 * @param {Object} file Uploaded file object.
 * @param {string} name Name of the given file.
 * @param {string} parentId The id value of the object that the function is searching for.
 * @returns {Object[]} An updated data object, with the newly added file.
 *
 * @see {getSelectedFromGroup}
 * @see {fileAdd}
 */
export const fileAddNested = ( data, file, name, parentId ) => {
  // Pull selected item out of array, preserve the remaining temporary array
  const { filtered, selected } = getSelectedFromGroup( data, parentId );

  // Update the nested group.
  const groupArr = fileAdd( file, name, selected.files );

  // Update selected files list.
  selected.files = groupArr;

  // Push updated item back into group
  filtered.push( selected );

  return filtered;
};

/**
 * Removes a file from a provided file list
 *
 * @param {Object[]} fileList Array of file objects.
 * @param {string} name Name of the given file.
 * @returns {Object[]} Array of file objects, without the selected one.
 */
export const fileRemove = ( fileList, name ) => {
  const filtered = fileList.filter( file => file.name !== name );

  return filtered;
};

/**
 * Removes a file from a provided file list nested within a group.
 *
 * @param {Object} data Data object for the selected group.
 * @param {string} name Name of the given file.
 * @param {string} parentId The id value of the object that the function is searching for.
 * @returns {Object[]} An updated data object, with the nested file removed.
 *
 * @see {getSelectedFromGroup}
 * @see {fileRemove}
 */
export const fileRemoveNested = ( data, name, parentId ) => {
  // Pull selected item out of array, preserve the remaining temporary array
  const { filtered, selected } = getSelectedFromGroup( data, parentId );

  // Update the nested group.
  const groupArr = fileRemove( selected.files, name );

  // Update selected files list.
  selected.files = groupArr;

  // Push updated item back into group
  filtered.push( selected );

  return filtered;
};

/**
 * Add new form to a group of forms.
 *
 * @param {Object[]} fields Array of values used to construct input fields.
 * @param {Object} data Data object for the selected group.
 * @param {string} group Name of the selected group.
 * @returns {Object[]} Updated array with new item added.
 */
export const groupAddItem = ( fields, data, group ) => {
  // Get list of field names required.
  const fieldNames = fields.map( field => field.name );

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = data[group] ? [...data[group]] : [];

  // Create an object to store values for new resource.
  const obj = {};

  obj.id = uuid();
  fieldNames.forEach( name => {
    obj[name] = '';
  } );

  // Add new object to sub-group.
  groupArr.push( obj );

  return groupArr;
};

/**
 * Add new form to a group of forms nested within a group.
 *
 * @param {Object} data Data object for the selected group.
 * @param {Object[]} fields Array of values used to construct input fields.
 * @param {string} group Name of the selected group.
 * @param {string} parentId The id value of the object that the function is searching for.
 * @returns {Object[]} Updated data object with new item added.
 *
 * @see {getSelectedFromGroup}
 * @see {groupAddItem}
 */
export const groupAddItemNested = ( data, fields, group, parentId ) => {
  // Pull selected item out of array, preserve the remaining temporary array
  const { filtered, selected } = getSelectedFromGroup( data, parentId );

  // Update the nested group.
  const groupArr = groupAddItem( fields, selected, group );

  // Update selected group member.
  selected[group] = groupArr;

  // Push updated item back into group
  filtered.push( selected );

  return filtered;
};

/**
 * Handle updates to form inputs.
 *
 * @param {Object} data Data object for the selected group.
 * @param {string} itemId The id value of the object that the function is searching for.
 * @param {string} name Name of the input field.
 * @param {string|number|boolean} value Input value.
 * @returns {Object[]} Updated data object.
 *
 * @see {getSelectedFromGroup}
 */
export const groupHandleInput = ( data, itemId, name, value ) => {
  const { filtered, indexValue, selected } = getSelectedFromGroup( data, itemId, 0 );

  // Update selected sub-group item.
  selected[name] = value;

  // Add updated sub-group item back to sub-group.
  filtered.splice( indexValue, 0, selected );

  return filtered;
};

/**
 * Handle updates to form inputs nested within a group.
 *
 * @param {Object} data Data object for the selected group.
 * @param {string} itemId The id value of the object that the function is searching for.
 * @param {string} group Name of the selected group.
 * @param {string} name Name of the input field.
 * @param {string} parentId The id value of the group where the target object resides.
 * @param {string|number|boolean} value Input value.
 * @returns {Object[]} Updated data object.
 *
 * @see {getSelectedFromGroup}
 * @see {groupHandleInput}
 */
export const groupHandleInputNested = ( data, itemId, group, name, parentId, value ) => {
  const { filtered, indexValue, selected } = getSelectedFromGroup( data, parentId, 0 );

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = selected[group] ? [...selected[group]] : [];

  const itemsTemp = groupHandleInput( groupArr, itemId, name, value );

  // Updated full group with altered sub-group.
  selected[group] = itemsTemp;

  filtered.splice( indexValue, 0, selected );

  return filtered;
};

/**
 * Remove a form from a group of forms.
 *
 * @param {Object} data Data object for the selected group.
 * @param {string} group Name of the selected group.
 * @param {string} id The id value of the object that the function is searching for.
 * @returns {Object[]} An array of the remaining form objects.
 */
export const groupRemoveItem = ( data, group, id ) => {
  const groupArr = data[group] ? [...data[group]] : [];

  const { filtered } = getSelectedFromGroup( groupArr, id );

  return filtered;
};

/**
 * Remove a form from a group of forms nested within a group.
 *
 * @param {Object} data Data object for the selected group.
 * @param {string} itemId The id value of the object that the function is searching for.
 * @param {string} group Name of the selected group.
 * @param {string} parentId The id value of the group where the target object resides.
 * @returns {Object[]} An array of the remaining form objects.
 *
 * @see {getSelectedFromGroup}
 * @see {groupRemoveItem}
 */
export const groupRemoveItemNested = ( data, itemId, group, parentId ) => {
  const { filtered, indexValue, selected } = getSelectedFromGroup( data, parentId, 0 );

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = groupRemoveItem( selected, group, itemId );

  selected[group] = groupArr;

  // Updated full group with altered sub-group.
  filtered.splice( indexValue, 0, selected );

  return filtered;
};

/**
 * Add specified post id from array of posts being updated.
 *
 * @param {Object} state The AdminContext object.
 * @param {number} id Selected post id.
 * @returns {number[]} An array of post ids representing the posts in process of being updated.
 */
export const updatingAddTo = ( state, id ) => {
  if ( state?.updating ) {
    const clone = [...state.updating];

    if ( !clone.includes( id ) ) {
      clone.push( id );
    }

    return clone;
  }

  return [];
};

/**
 * Remove specified post id from array of posts being updated.
 *
 * @param {Object} state The AdminContext object.
 * @param {number} id Selected post id.
 * @returns {number[]} An array of post ids representing the posts in process of being updated.
 */
export const updatingRemoveFrom = ( state, id ) => {
  if ( state?.updating ) {
    const reset = state.updating.filter( item => item !== id );

    return reset;
  }

  return [];
};
