<?php
/**
 * Registers the Sanitize_Stats_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the stats form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Stats_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['backgroundImage'] ) ) {
      $sanitized['backgroundImage'] = sanitize_text_field( $unsanitary['backgroundImage'] );
    }

    if ( ! empty( $unsanitary['backgroundType'] ) ) {
      $sanitized['backgroundType'] = sanitize_text_field( $unsanitary['backgroundType'] );
    }

    if ( ! empty( $unsanitary['blockBackground'] ) ) {
      $sanitized['blockBackground'] = sanitize_text_field( $unsanitary['blockBackground'] );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['stats'] ) ) {
      $sanitized_stats = array();

      foreach ( $unsanitary['stats'] as $stat ) {
        $sanitized_stat = array();

        $sanitized_stat['id']     = sanitize_text_field( $stat['id'] );
        $sanitized_stat['desc']   = sanitize_text_field( $stat['desc'] );
        $sanitized_stat['number'] = sanitize_text_field( $stat['number'] );
        $sanitized_stat['prefix'] = sanitize_text_field( $stat['prefix'] );
        $sanitized_stat['unit']   = sanitize_text_field( $stat['unit'] );

        array_push( $sanitized_stats, $sanitized_stat );
      }

      unset( $stat );

      $sanitized['stats'] = $sanitized_stats;
    }

    if ( ! empty( $unsanitary['textColor'] ) ) {
      $sanitized['textColor'] = sanitize_text_field( $unsanitary['textColor'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['files'] ) ) {
      $sanitized['files'] = $sanitize_files->sanitize_files( $unsanitary['files'], $uploads );
    }

    return $sanitized;
  }
}
