export const getAssociated = async endpoint => {
  const params = '?_fields=gpalab_associated_blocks';

  try {
    const response = await fetch( `${endpoint}${params}`, {
      method: 'GET',
    } );

    const result = await response.json();

    return result;
  } catch ( error ) {
    console.log( error );

    return null;
  }
};
