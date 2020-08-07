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
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-video.php';
    $sanitize_video = new Sanitize_Video();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['articles'] ) ) {
      $sanitized_articles = array();

      foreach ( $unsanitary['articles'] as $article ) {
        $sanitized_article = array();

        $sanitized_article['id']     = sanitize_text_field( $article['id'] );
        $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
        $sanitized_article['source'] = sanitize_text_field( $article['source'] );

        array_push( $sanitized_articles, $sanitized_article );
      }

      unset( $article );

      $sanitized['articles'] = $sanitized_articles;
    }

    if ( ! empty( $unsanitary['blockBackground'] ) ) {
      $sanitized['blockBackground'] = sanitize_text_field( $unsanitary['blockBackground'] );
    }

    if ( ! empty( $unsanitary['buttonArrow'] ) ) {
      $sanitized['buttonArrow'] = sanitize_text_field( $unsanitary['buttonArrow'] );
    }

    if ( ! empty( $unsanitary['buttonBorder'] ) ) {
      $sanitized['buttonBorder'] = sanitize_text_field( $unsanitary['buttonBorder'] );
    }

    if ( ! empty( $unsanitary['buttonColor'] ) ) {
      $sanitized['buttonColor'] = sanitize_text_field( $unsanitary['buttonColor'] );
    }

    if ( ! empty( $unsanitary['buttonLink'] ) ) {
      $sanitized['buttonLink'] = sanitize_text_field( $unsanitary['buttonLink'] );
    }

    if ( ! empty( $unsanitary['buttonText'] ) ) {
      $sanitized['buttonText'] = sanitize_text_field( $unsanitary['buttonText'] );
    }

    if ( ! empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = wp_kses_post( $unsanitary['desc'] );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['hasButton'] ) ) {
      $sanitized['hasButton'] = rest_sanitize_boolean( $unsanitary['hasButton'] );
    }

    if ( ! empty( $unsanitary['hasFeed'] ) ) {
      $sanitized['hasFeed'] = rest_sanitize_boolean( $unsanitary['hasFeed'] );
    }

    if ( ! empty( $unsanitary['hasVideo'] ) ) {
      $sanitized['hasVideo'] = rest_sanitize_boolean( $unsanitary['hasVideo'] );
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
      $sanitized_videos = array();

      foreach ( $unsanitary['videos'] as $video ) {
        $sanitized_video = $sanitize_video->sanitize_video( $video );

        array_push( $sanitized_videos, $sanitized_video );
      }

      unset( $video );

      $sanitized['videos'] = $sanitized_videos;
    }

    return $sanitized;
  }
}
