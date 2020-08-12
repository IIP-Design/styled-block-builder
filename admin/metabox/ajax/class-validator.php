<?php
/**
 * Registers the Validator class.
 *
 * @package Style_Blocks\Validator
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Validates the values sent over in the AJAX request.
 *
 * A series of functions that check if a given value is set and if so,
 * that the value is valid.
 *
 * @package Style_Blocks\Validator
 * @since 0.0.1
 */
class Validator {

  /**
   * Check that the form type is set and valid.
   *
   * @param string $type     Name of the form type submitted.
   */
  public function validate_form_type( $type ) {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Nonce verification occurs in separate function prior to this one running.
    // phpcs:disable WordPress.Security.NonceVerification.Missing

    if ( ! isset( $_POST['type'] ) ) {
      $send_response->send_custom_error( 'no_form' );
    }

    // phpcs:enable

    $accepted_forms = array(
      'article-feed',
      'hero',
      'navigation',
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
   * @param int $id     The provided post id.
   */
  public function validate_post_id( $id ) {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $id ) ) {
      $send_response->send_custom_error( 'no_post_id' );
    }

    if ( ! is_numeric( $id ) ) {
      $send_response->send_custom_error( 'invalid_post_id' );
    }

    if ( is_numeric( $id ) ) {
      // While post ids are numbers, all values coming off AJAX are strings, hence the check for '0' not 0.
      if ( '0' !== $id && get_post_status( $id ) === false ) {
        $send_response->send_custom_error( 'invalid_post_id' );
      }
    }
  }

  /**
   * Check that post id for parent post is set and valid.
   *
   * @param int $id     The provided post id for the parent post.
   */
  public function validate_parent_id( $id ) {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
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
   * Check for a valid nonce coming from the AJAX request (nonce set in Style_Blocks/Admin)
   *
   * @param int $nonce     The nonce provided with the AJAX request.
   */
  public function validate_nonce( $nonce ) {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( ! isset( $nonce ) ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( wp_verify_nonce( $nonce, 'gpalab-block-nonce' ) === false ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( check_ajax_referer( 'gpalab-block-nonce', 'security', false ) === false ) {
      $send_response->send_custom_error( 'invalid_nonce' );
    }

    if ( ! current_user_can( 'edit_pages' ) ) {
      $send_response->send_custom_error( 'insufficient_permissions' );
    }
  }
}
