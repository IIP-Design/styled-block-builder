<?php
/**
 * Registers the Sanitize_Hero_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the hero form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Hero_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-buttons.php';
    $sanitize_buttons = new Sanitize_Buttons();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['align'] ) ) {
      $sanitized['align'] = sanitize_text_field( $unsanitary['align'] );
    }

    if ( ! empty( $unsanitary['buttons'] ) ) {
      $sanitized['buttons'] = $sanitize_buttons->sanitize_buttons( $unsanitary['buttons'] );
    }

    if ( ! empty( $unsanitary['textColor'] ) ) {
      $sanitized['textColor'] = sanitize_text_field( $unsanitary['textColor'] );
    }

    if ( ! empty( $unsanitary['description'] ) ) {
      $sanitized['description'] = wp_kses_post( $unsanitary['description'] );
    }

    if ( ! empty( $unsanitary['lines'] ) ) {
      $sanitized_lines = array();

      foreach ( $unsanitary['lines'] as $line ) {
        $sanitized_line = array();

        $sanitized_line['id']   = sanitize_text_field( $line['id'] );
        $sanitized_line['text'] = sanitize_text_field( $line['text'] );

        array_push( $sanitized_lines, $sanitized_line );
      }

      unset( $line );

      $sanitized['lines'] = $sanitized_lines;
    }

    if ( ! empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['type'] ) ) {
      $sanitized['type'] = sanitize_text_field( $unsanitary['type'] );
    }

    if ( ! empty( $unsanitary['files'] ) ) {
      $sanitized['files'] = $sanitize_files->sanitize_files( $unsanitary['files'], $uploads );
    }

    return $sanitized;
  }
}
