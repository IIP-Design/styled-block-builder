<?php

namespace Style_Templates;

class Responses {
  // Errors
  public function send_custom_error( $type ) {
    $data = array();
    $status = null;

    // Status codes
    $bad_request = __( '400: Bad Request', 'gpalab-templates' );
    $unauthorized = __( '401: Unauthorized', 'gpalab-templates' );
    $forbidden = __( '403: Forbidden', 'gpalab-templates' );
    
    if ( $type == 'insufficient_permissions') {
      $data['message'] = __( 'Authorization failed - user does not have sufficient permissions', 'gpalab-templates' );
      $data['status'] = $forbidden;
      $status = 403;
    }

    if ( $type == 'invalid_parent_id' ) {
      $data['message'] = __( 'The post associated with this template does not exist', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }
    
    if ( $type == 'invalid_nonce') {
      $data['header'] = 'WWW-Authenticate: Bearer';
      $data['message'] = __( 'Authorization failed - invalid nonce provided', 'gpalab-templates' );
      $data['status'] = $unauthorized;
      $status = 401;
    }

    if ( $type == 'invalid_post_id' ) {
      $data['message'] = __( 'Invalid post id provided', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }
    
    if ( $type == 'invalid_form_type' ) {
      $data['message'] = __( 'Invalid form type provided', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }
    
    if ( $type == 'no_form' ) {
      $data['message'] = __( 'Required field "form type" not provided', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }

    if ( $type == 'no_parent_id') {
      $data['message'] = __( 'Required field "parent id" not provided', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }
    
    if ( $type == 'no_post_id') {
      $data['message'] = __( 'Required field "post id" not provided', 'gpalab-templates' );
      $data['status'] = $bad_request;
      $status = 400;
    }

    wp_send_json_error( $data, $status );
  }

  // Successes
  public function send_custom_success( $type, $post_id ) {
    $data = array();
    $status = null;

    // Messages
    $added = __( 'Added a template with the ID: ', 'gpalab-templates' );
    $deleted = __( 'Deleted the template with the ID: ', 'gpalab-templates' );
    $updated = __( 'Updated the template with the ID: ', 'gpalab-templates' );

    // Status codes
    $okay = __( '200: Okay', 'gpalab-templates' );
    $created = __( '201: Created', 'gpalab-templates' );
    
    if ( $type == 'added_post' ) {
      $data['message'] = $added . $post_id;
      $data['status'] = $created;
      $status = 201;
    }

    if ( $type == 'deleted_post' ) {
      $data['message'] = $deleted . $post_id;
      $data['status'] = $okay;
      $status = 200;
    }

    if ( $type == 'updated_post' ) {
      $data['message'] = $updated . $post_id;
      $data['status'] = $okay;
      $status = 200;
    }

    wp_send_json_success( $data, $status );
  }
}