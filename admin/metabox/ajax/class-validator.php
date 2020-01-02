<?php

namespace Style_Templates;

class Validator {

  /**
   * Check that the form type is set and valid.
   *
   * @param   string $type     Name of the form type submitted.
   */
  public function validate_form_type( $type ) {
    // Load in possible HTTP responses.
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $_POST['type'] ) ) {
      $send_response->send_custom_error( 'no_form' );
    }

    $accepted_forms = array(
      'article-feed',
      'hero',
      'parallax',
      'quote-box',
      'resources',
      'slides',
      'stats',
      'text',
      'timeline',
    );

    if ( ! in_array( $type, $accepted_forms, true ) ) {
      $send_response->send_custom_error( 'invalid_form_type' );
    }
  }

  /**
   * Check that post id is set and valid.
   *
   * @param   int $id     The provided post id.
   */
  public function validate_post_id( $id ) {
    // Load in possible HTTP responses.
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $id ) ) {
      $send_response->send_custom_error( 'no_post_id' );
    }

    if ( ! is_numeric( $id ) ) {
      $send_response->send_custom_error( 'invalid_post_id' );
    }

    if ( is_numeric( $id ) ) {
      if ( 0 !== $id && get_post_status( $id ) === false ) {
        $send_response->send_custom_error( 'invalid_post_id' );
      }
    }
  }

  /**
   * Check that post id for parent post is set and valid.
   *
   * @param   int $id     The provided post id for the parent post.
   */
  public function validate_parent_id( $id ) {
    // Load in possible HTTP responses.
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $id ) ) {
      $send_response->send_custom_error( 'no_parent_id' );
    }

    if ( ! is_numeric( $id ) ) {
      $send_response->send_custom_error( 'invalid_parent_id' );
    }

    if ( is_numeric( $id ) && get_post_status( $id ) === false ) {
      $send_response->send_custom_error( 'invalid_parent_id' );
    }
  }

  /**
   * Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
   *
   * @param   int $nonce     The nonce provided with the AJAX request.
   */
  public function validate_nonce( $nonce ) {
    // Load in possible HTTP responses.
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $nonce ) ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( wp_verify_nonce( $nonce, 'gpalab-template-nonce' ) === false ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( check_ajax_referer( 'gpalab-template-nonce', 'security', false ) === false ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( ! current_user_can( 'edit_pages' ) ) {
      $send_response->send_custom_error( 'insufficient_permissions' );
    }
  }
}
