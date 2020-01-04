<?php
/**
 * Registers the Sanitize_Quotebox_Meta class.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the quotebox form.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Quotebox_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['backgroundType'] ) ) {
      $sanitized['backgroundType'] = sanitize_text_field( $unsanitary['backgroundType'] );
    }

    if ( ! empty( $unsanitary['blockBackground'] ) ) {
      $sanitized['blockBackground'] = sanitize_text_field( $unsanitary['blockBackground'] );
    }

    if ( ! empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = sanitize_textarea_field( $unsanitary['desc'] );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['quote'] ) ) {
      $sanitized['quote'] = sanitize_textarea_field( $unsanitary['quote'] );
    }

    if ( ! empty( $unsanitary['quoteBackground'] ) ) {
      $sanitized['quoteBackground'] = sanitize_text_field( $unsanitary['quoteBackground'] );
    }

    if ( ! empty( $unsanitary['speaker'] ) ) {
      $sanitized['speaker'] = sanitize_text_field( $unsanitary['speaker'] );
    }

    if ( ! empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( ! empty( $unsanitary['textColor'] ) ) {
      $sanitized['textColor'] = sanitize_text_field( $unsanitary['textColor'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}
