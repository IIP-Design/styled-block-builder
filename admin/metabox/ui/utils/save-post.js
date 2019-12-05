import { getFormData } from './helpers';

export const savePost = async data => {
  // Get values provided to the client by the server
  const fromPHP = window.gpalabTemplateAdmin ? window.gpalabTemplateAdmin : {};

  // Create a FormData object to send user inputs to server
  const formData = getFormData( data );
  formData.append( 'action', 'gpalab_update_template' );
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
