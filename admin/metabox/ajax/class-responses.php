<?php
/**
 * Registers the Responses class.
 *
 * @package Style_Templates\Responses
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * HTTP error and success responses.
 *
 * Sends out the appropriate success or error message.
 *
 * @package Style_Templates\Responses
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
    $bad_request  = __( '400: Bad Request', 'gpalab-templates' );
    $unauthorized = __( '401: Unauthorized', 'gpalab-templates' );
    $forbidden    = __( '403: Forbidden', 'gpalab-templates' );

    if ( 'insufficient_permissions' === $type ) {
      $data['message'] = __( 'Authorization failed - user does not have sufficient permissions', 'gpalab-templates' );
      $data['status']  = $forbidden;
      $status          = 403;
    }

    if ( 'invalid_parent_id' === $type ) {
      $data['message'] = __( 'The post associated with this template does not exist', 'gpalab-templates' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'invalid_nonce' === $type ) {
      $data['header']  = 'WWW-Authenticate: Bearer';
      $data['message'] = __( 'Authorization failed - invalid nonce provided', 'gpalab-templates' );
      $data['status']  = $unauthorized;
      $status          = 401;
    }

    if ( 'invalid_post_id' === $type ) {
      $data['message'] = __( 'Invalid post id provided', 'gpalab-templates' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'invalid_form_type' === $type ) {
      $data['message'] = __( 'Invalid form type provided', 'gpalab-templates' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_form' === $type ) {
      $data['message'] = __( 'Required field "form type" not provided', 'gpalab-templates' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_parent_id' === $type ) {
      $data['message'] = __( 'Required field "parent id" not provided', 'gpalab-templates' );
      $data['status']  = $bad_request;
      $status          = 400;
    }

    if ( 'no_post_id' === $type ) {
      $data['message'] = __( 'Required field "post id" not provided', 'gpalab-templates' );
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
    $added   = __( 'Added a template with the ID: ', 'gpalab-templates' );
    $deleted = __( 'Deleted the template with the ID: ', 'gpalab-templates' );
    $updated = __( 'Updated the template with the ID: ', 'gpalab-templates' );

    // Status codes.
    $okay    = __( '200: Okay', 'gpalab-templates' );
    $created = __( '201: Created', 'gpalab-templates' );

    if ( 'added_post' === $type ) {
      $data['message'] = $added . $post_data['id'];
      $data['status']  = $created;
      $data['data']    = $post_data;
      $status          = 201;
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
