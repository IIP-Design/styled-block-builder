<?php
/**
 * Registers the Sanitize_Navigation_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the navigation form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Navigation_Meta {

  /**
   * Checks for and sanitizes the expected button fields.
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

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['nav'] ) ) {
      $sanitized_nav = array();

      foreach ( $unsanitary['nav'] as $nav_item ) {
        $sanitized_nav_item = array();

        $sanitized_nav_item['files'] = $sanitize_files->sanitize_files( $nav_item['files'], $uploads );
        $sanitized_nav_item['id']    = sanitize_text_field( $nav_item ['id'] );
        $sanitized_nav_item['link']  = sanitize_text_field( $nav_item ['link'] );
        $sanitized_nav_item['text']  = sanitize_text_field( $nav_item ['text'] );

        array_push( $sanitized_nav, $sanitized_nav_item );
      }

      unset( $nav_item );

      $sanitized['nav'] = $sanitized_nav;
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }

}
