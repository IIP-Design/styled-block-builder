// Converts an JS object into a FormData object for use in AJAX calls
// If original object has nested properties, it renders them as a string
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
