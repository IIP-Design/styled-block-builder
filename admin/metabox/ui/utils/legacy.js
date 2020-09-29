/**
 * Initiates an AJAX call to either delete or convert blocks stored in the legacy format.
 *
 * @param {string} parent Parent post's post id value
 * @param {string} action One of 'convert' or 'delete' depending on the desired action to be taken
 * @param {onComplete} onComplete A callback function to be run on success
 * @param {onError} onError A callback function to be run on error
 */
export const handleLegacy = async ( parent, action, onComplete, onError ) => {
  // Get values provided to the client by the server
  const fromPHP = window?.gpalabBlockAdmin || {};

  let actionHandle;

  switch ( action ) {
    case 'convert':
      actionHandle = 'gpalab_convert_legacy';
      break;
    case 'delete':
      actionHandle = 'gpalab_delete_legacy';
      break;
    default:
  }

  // Construct the body of the AJAX request
  const formData = new FormData();

  formData.append( 'action', actionHandle );
  formData.append( 'parent', parent );
  formData.append( 'security', fromPHP.blockNonce );

  try {
    const response = await fetch( fromPHP.ajaxUrl, {
      method: 'POST',
      body: formData,
    } );

    const result = await response.json();

    // PHP may return a 200 is AJAX call is received but requested action fails
    // for this reason we check the success message on the response
    if ( result.success === false && onError ) {
      onError( result.data );
    }

    if ( result.success !== false && onComplete ) {
      const res = result?.data?.data || null;

      onComplete( res, action );
    }
  } catch ( error ) {
    if ( onError ) {
      onError( error );
    }
  }
};
