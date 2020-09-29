import { getFormData } from './helpers';

export const updatePost = async ( data, action, onComplete, onError ) => {
  // Get values provided to the client by the server
  const fromPHP = window?.gpalabBlockAdmin || {};

  let actionHandle;

  switch ( action ) {
    case 'save':
      actionHandle = 'gpalab_update_block';
      break;
    case 'delete':
      actionHandle = 'gpalab_delete_block';
      break;
    default:
  }

  const files = [];
  const nestedFiles = [];
  const clone = { ...data };

  if ( data?.meta?.files ) {
    data.meta.files.forEach( file => {
      if ( file.file ) {
        files.push( file );
      }
    } );
  }

  if ( data.type === 'slides' || data.type === 'timeline' ) {
    const items = data?.meta?.[data.type] || [];

    items.forEach( item => {
      if ( item.files ) {
        item.files.forEach( file => {
          if ( file.file ) {
            nestedFiles.push( file );
          }
        } );
      }
    } );
  }

  // Create a FormData object to send user inputs to server
  const formData = getFormData( clone );

  if ( files.length > 0 ) {
    files.forEach( file => formData.append( file.name, file.file ) );
  }
  if ( nestedFiles.length > 0 ) {
    nestedFiles.forEach( file => {
      formData.append( `${file.name}[]`, file.file );
    } );
  }
  formData.append( 'action', actionHandle );
  formData.append( 'parent', fromPHP.parentPost );
  formData.append( 'security', fromPHP.blockNonce );

  // AJAX call to submit block data for saving
  try {
    const response = await fetch( fromPHP.ajaxUrl, {
      method: 'POST',
      body: formData,
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
