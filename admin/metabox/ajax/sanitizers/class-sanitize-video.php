<?php
/**
 * Registers the Sanitize_Video class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded files and compare.
 *
 * Checks for and sanitizes the fields expected by the video form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Video {

  /**
   * Checks for and sanitizes the expected video fields.
   *
   * @param array $video    Unsanitized video values sent over in the AJAX request.
   * @return array          Array of sanitized values
   */
  public function sanitize_video( $video ) {
    $sanitized_video = array();

    $sanitized_video['brightcove']  = sanitize_text_field( $video['brightcove'] );
    $sanitized_video['id']          = sanitize_text_field( $video['id'] );
    $sanitized_video['description'] = wp_kses_post( $video['description'] );
    $sanitized_video['source']      = sanitize_text_field( $video['source'] );
    $sanitized_video['title']       = sanitize_text_field( $video['title'] );
    $sanitized_video['url']         = sanitize_text_field( $video['url'] );

    return $sanitized_video;
  }

}
