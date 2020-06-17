/**
 * Converts an JS object into a FormData object for use in AJAX calls.
 * If original object has nested properties, it renders them as a string.
 *
 * @param {Object} obj
 * @returns {Object} A FormData object
 */
export const getFormData = obj => {
  const formData = new FormData();

  function checkIfString( item ) {
    if ( typeof item === 'string' ) {
      return item;
    }

    return JSON.stringify( item );
  }

  Object.keys( obj ).forEach( key => formData.append( key, checkIfString( obj[key] ) ) );

  return formData;
};

/**
 * Searches through an array of file objects for a file with a given name.
 *
 * @param {Object[]} files Array of file objects within which to search.
 * @param {string} identifier Name of the file to search for.
 * @returns {Object|null} If file object exists it will be returned, otherwise, null.
 */
const getSelectedFile = ( files, identifier ) => {
  const selectedFile = files.filter( file => file.name === identifier )[0];

  return selectedFile || null;
};

/**
 * Searches through an object of form values for a file with a given name.
 *
 * @param {string} identifier Name of the file to search for.
 * @param {Object} values Object of form values.
 * @param {string=} parentGroup Name for parent group to search in for nested objects.
 * @param {string=} parentId Id of selected item within the nested parent group.
 * @returns {Object|null} If file object exists it will be returned, otherwise, null.
 *
 * @see {getSelectedFile}
 */
export const checkForFile = ( identifier, values, parentGroup, parentId ) => {
  if ( !parentGroup && values?.files ) {
    return getSelectedFile( values.files, identifier );
  }

  if ( parentGroup && parentId && values?.[parentGroup] ) {
    const selectedItem = values[parentGroup].filter( item => item.id === parentId )[0];
    const selectedFile = selectedItem?.files
      ? getSelectedFile( selectedItem.files, identifier )
      : null;

    return selectedFile;
  }

  return null;
};
