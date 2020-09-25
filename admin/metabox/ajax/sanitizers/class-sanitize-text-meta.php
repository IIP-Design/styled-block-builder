<?php
/**
 * Registers the Sanitize_Text_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the text block form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Text_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @return array          Array of sanitized values.
   */
  public function sanitize_inputs( $data ) {

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-articles.php';
    $sanitize_articles = new Sanitize_Articles();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-background.php';
    $sanitize_background = new Sanitize_Background();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-buttons.php';
    $sanitize_buttons = new Sanitize_Buttons();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-videos.php';
    $sanitize_videos = new Sanitize_Videos();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['articles'] ) ) {
      $sanitized['articles'] = $sanitize_articles->sanitize_articles( $unsanitary['articles'] );
    }

    if ( ! empty( $unsanitary['buttons'] ) ) {
      $sanitized['buttons'] = $sanitize_buttons->sanitize_buttons( $unsanitary['buttons'] );
    }

    if ( ! empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = wp_kses_post( $unsanitary['desc'] );
    }

    if ( ! empty( $unsanitary['files'] ) ) {
      $sanitized['files'] = $sanitize_files->sanitize_files( $unsanitary['files'], $uploads );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
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

    if ( ! empty( $unsanitary['videos'] ) ) {
      $sanitized['videos'] = $sanitize_videos->sanitize_videos( $unsanitary['videos'] );
    }

    $sanitized_background = $sanitize_background->sanitize_background( $unsanitary );

    $combined = array_merge( $sanitized, $sanitized_background );

    return $combined;
  }
}
