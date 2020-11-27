import { getFormData } from './helpers';

/**
 * Utility function to handle the Ajax response from the server.
 *
 * @param {Object} response The server response as a JSON object.
 * @param {string} action The type of action to be taken (save/delete/primary).
 * @param {onComplete} onComplete A function to be run once the Ajax request completes successfully.
 * @param {onError} onError A function to be run if an error is encountered during the Ajax request.
 */
const handleResponse = ( response, action, onComplete, onError ) => {
  // PHP may return a 200 is AJAX call is received but requested action fails
  // for this reason we check the success message on the response
  if ( response.success === false ) {
    if ( onError ) {
      onError( response.data );
    } else {
      console.error( response.data );
    }
  }

  if ( response.success !== false && onComplete ) {
    const res = response?.data?.data ? response.data.data : null;

    onComplete( res, action );
  }
};

/**
 * Sends an Ajax request to the server to update/delete a given block.
 *
 * @param {Object} data The block data to be saved.
 * @param {string} action The type of action to be taken (save/delete).
 * @param {onComplete} onComplete A function to be run once the Ajax request completes successfully.
 * @param {onError} onError A function to be run if an error is encountered during the Ajax request.
 */
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

    handleResponse( result, action, onComplete, onError );
  } catch ( error ) {
    if ( onError ) {
      onError( error );
    }
  }
};
