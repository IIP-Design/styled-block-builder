import { getFormData } from './helpers';

export const updatePost = async ( data, action ) => {
  // Get values provided to the client by the server
  const fromPHP = window.gpalabTemplateAdmin ? window.gpalabTemplateAdmin : {};

  let actionHandle;
  switch ( action ) {
    case 'save':
      actionHandle = 'gpalab_update_template';
      break;
    case 'delete':
      actionHandle = 'gpalab_delete_template';
      break;
    default:
  }

  // Create a FormData object to send user inputs to server
  const formData = getFormData( data );
  formData.append( 'action', actionHandle );
  formData.append( 'parent', fromPHP.parentPost );
  formData.append( 'security', fromPHP.templateNonce );

  // AJAX call
  try {
    const response = await fetch( fromPHP.ajaxUrl, {
      method: 'POST',
      body: formData
    } );
    const result = await response.json();
    console.log( 'Success:', JSON.stringify( result ) );
  } catch ( error ) {
    console.error( 'Error:', error );
  }
};
