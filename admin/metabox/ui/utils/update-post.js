import { getFormData } from './helpers';

export const updatePost = async ( data, action, onComplete, onError ) => {
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

  const files = data?.meta?.files ? data.meta.files : [];

  const clone = { ...data };
  if ( data?.meta?.files ) {
    delete clone.meta.files;
  }

  // Create a FormData object to send user inputs to server
  const formData = getFormData( clone );
  if ( files.length > 0 ) {
    files.forEach( file => formData.append( file.name, file.file ) );
  }
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

    if ( result.success === false && onError ) {
      onError( result.data );
    }

    if ( result.success !== false && onComplete ) {
      const res = result?.data?.data ? result.data.data : null;
      onComplete( res, action );
    }
  } catch ( error ) {
    if ( onError ) {
      onError( error );
    }
  }
};
