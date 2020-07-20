<?php
/**
 * Registers the Sanitize_Slides_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the slides form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Slides_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['subTitleColor'] ) ) {
      $sanitized['subTitleColor'] = sanitize_text_field( $unsanitary['subTitleColor'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['slides'] ) ) {
      $sanitized_slides = array();

      foreach ( $unsanitary['slides'] as $slide ) {
        $sanitized_slide = array();

        $sanitized_slide['id']       = sanitize_text_field( $slide['id'] );
        $sanitized_slide['subtitle'] = sanitize_text_field( $slide['subtitle'] );
        $sanitized_slide['text']     = wp_kses_post( $slide['text'] );
        $sanitized_slide['files']    = $sanitize_files->sanitize_files( $slide['files'], $uploads );

        array_push( $sanitized_slides, $sanitized_slide );
      }

      unset( $slide );

      $sanitized['slides'] = $sanitized_slides;
    }

    return $sanitized;
  }
}
