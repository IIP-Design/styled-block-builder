<?php
/**
 * Registers the Sanitize_Quotebox_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the quotebox form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Quotebox_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-articles.php';
    $sanitize_articles = new Sanitize_Articles();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['articles'] ) ) {
      $sanitized['articles'] = $sanitize_articles->sanitize_articles( $unsanitary['articles'] );
    }

    if ( ! empty( $unsanitary['backgroundGradient'] ) ) {
      $sanitized['backgroundGradient'] = sanitize_text_field( $unsanitary['backgroundGradient'] );
    }

    if ( ! empty( $unsanitary['backgroundType'] ) ) {
      $sanitized['backgroundType'] = sanitize_text_field( $unsanitary['backgroundType'] );
    }

    if ( ! empty( $unsanitary['blockBackground'] ) ) {
      $sanitized['blockBackground'] = sanitize_text_field( $unsanitary['blockBackground'] );
    }

    if ( ! empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = wp_kses_post( $unsanitary['desc'] );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['quote'] ) ) {
      $sanitized['quote'] = wp_kses_post( $unsanitary['quote'] );
    }

    if ( ! empty( $unsanitary['quoteBackground'] ) ) {
      $sanitized['quoteBackground'] = sanitize_text_field( $unsanitary['quoteBackground'] );
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

    if ( ! empty( $unsanitary['files'] ) ) {
      $sanitized['files'] = $sanitize_files->sanitize_files( $unsanitary['files'], $uploads );
    }

    return $sanitized;
  }
}
