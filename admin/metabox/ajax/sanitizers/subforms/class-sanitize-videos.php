<?php
/**
 * Registers the Sanitize_Video class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded video data and sanitize each field.
 *
 * Checks for and sanitizes the fields expected by the video form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Videos {

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

  /**
   * Checks for and sanitizes a group of videos.
   *
   * @param array $videos    Unsanitized video group sent over in the AJAX request.
   * @return array           Array of sanitized values
   */
  public function sanitize_videos( $videos ) {

    $sanitized_videos = array();

    foreach ( $videos as $video ) {
      $sanitized_video = $this->sanitize_video( $video );

      array_push( $sanitized_videos, $sanitized_video );
    }

    unset( $video );

    return $sanitized_videos;
  }
}
