<?php
/**
 * Registers the Responses class.
 *
 * @package Style_Blocks\Responses
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * HTTP error and success responses.
 *
 * Sends out the appropriate success or error message.
 *
 * @package Style_Blocks\Responses
 * @since 0.0.1
 */
class Responses {
  /**
   * Accepts the error name and then sends a corresponding error message.
   *
   * @param string $type     Name of error message to be sent.
   */
  public function send_custom_error( $type ) {
    $data   = array();
    $status = null;

    // Status codes.
    $bad_request  = __( '400: Bad Request', 'gpalab-blocks' );
    $unauthorized = __( '401: Unauthorized', 'gpalab-blocks' );
    $forbidden    = __( '403: Forbidden', 'gpalab-blocks' );

    if ( 'insufficient_permissions' === $type ) {
      $data['message'] = __( 'Authorization failed - user does not have sufficient permissions', 'gpalab-blocks' );
      $data['status']  = $forbidden;
      $status          = 403;
    }

    if ( 'invalid_block_id' === $type ) {
      $data['message'] = __( 'Invalid block id provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'invalid_nonce' === $type ) {
      $data['header']  = 'WWW-Authenticate: Bearer';
      $data['message'] = __( 'Authorization failed - invalid nonce provided', 'gpalab-blocks' );
      $data['status']  = $unauthorized;
      $status          = 401;
    }

    if ( 'invalid_parent_id' === $type ) {
      $data['message'] = __( 'The post associated with this block does not exist', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'invalid_post_id' === $type ) {
      $data['message'] = __( 'Invalid post id provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'invalid_form_type' === $type ) {
      $data['message'] = __( 'Invalid form type provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_block_id' === $type ) {
      $data['message'] = __( 'Required field "id" not provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_form' === $type ) {
      $data['message'] = __( 'Required field "form type" not provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_parent_id' === $type ) {
      $data['message'] = __( 'Required field "parent id" not provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_post_id' === $type ) {
      $data['message'] = __( 'Required field "post id" not provided', 'gpalab-blocks' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    wp_send_json_error( $data, $status );
  }

  /**
   * Accepts the success type and then sends a corresponding success message,
   * along with relevant post data.
   *
   * @param string       $type          Name of success message to be sent.
   * @param string|array $post_data     Post data to be included in the HTTP response.
   */
  public function send_custom_success( $type, $post_data ) {
    $data   = array();
    $status = null;

    // Messages.
    $added          = __( 'Added a block with the ID: ', 'gpalab-blocks' );
    $deleted        = __( 'Deleted the block with the ID: ', 'gpalab-blocks' );
    $updated        = __( 'Updated the block with the ID: ', 'gpalab-blocks' );
    $legacy_delete  = __( 'Deleted legacy blocks associate with the post: ', 'gpalab-blocks' );
    $legacy_convert = __( 'Converted legacy blocks associate with the post: ', 'gpalab-blocks' );

    // Status codes.
    $okay    = __( '200: Okay', 'gpalab-blocks' );
    $created = __( '201: Created', 'gpalab-blocks' );

    if ( 'added_post' === $type ) {
      $data['message'] = $added . $post_data['id'];
      $data['status']  = $created;
      $data['data']    = $post_data;
      $status          = 201;
    }

    if ( 'converted_legacy' === $type ) {
      $data['message'] = $legacy_convert . $post_data['id'];
      $data['status']  = $okay;
      $data['data']    = $post_data['blocks'];
      $status          = 200;
    }

    if ( 'deleted_legacy' === $type ) {
      $data['message'] = $legacy_delete . $post_data;
      $data['status']  = $okay;
      $data['data']    = $post_data;
      $status          = 200;
    }

    if ( 'deleted_post' === $type ) {
      $data['message'] = $deleted . $post_data;
      $data['status']  = $okay;
      $data['data']    = $post_data;
      $status          = 200;
    }

    if ( 'updated_post' === $type ) {
      $data['message'] = $updated . $post_data['id'];
      $data['status']  = $okay;
      $data['data']    = $post_data;
      $status          = 200;
    }

    wp_send_json_success( $data, $status );
  }
}
