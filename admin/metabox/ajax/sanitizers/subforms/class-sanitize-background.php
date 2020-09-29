<?php
/**
 * Registers the Sanitize_Background class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.1.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded background data and sanitize each field.
 *
 * Checks for and sanitizes the fields need to properly set the background.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.1.0
 */
class Sanitize_Background {

  /**
   * Checks for and sanitizes the expected background fields.
   *
   * @param array $data   Unsanitized data values sent over in the AJAX request.
   * @return array        Array of sanitized values
   */
  public function sanitize_background( $data ) {
    $sanitized_background = array();

    if ( ! empty( $data['backgroundGradient'] ) ) {
      $sanitized_background['backgroundGradient'] = sanitize_text_field( $data['backgroundGradient'] );
    }

    if ( ! empty( $data['backgroundType'] ) ) {
      $sanitized_background['backgroundType'] = sanitize_text_field( $data['backgroundType'] );
    }

    if ( ! empty( $data['blockBackground'] ) ) {
      $sanitized_background['blockBackground'] = sanitize_text_field( $data['blockBackground'] );
    }

    return $sanitized_background;
  }
}
