<?php
/**
 * Registers the Sanitize_Resources_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the resources form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Resources_Meta {

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

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['resources'] ) ) {
      $sanitized_resources = array();

      foreach ( $unsanitary['resources'] as $resource ) {
        $sanitized_resource = array();

        $sanitized_resource['hasFeed'] = rest_sanitize_boolean( $resource['hasFeed'] );
        $sanitized_resource['id']      = sanitize_text_field( $resource['id'] );
        $sanitized_resource['tab']     = sanitize_text_field( $resource['tab'] );
        $sanitized_resource['text']    = wp_kses_post( $resource['text'] );
        $sanitized_resource['title']   = sanitize_text_field( $resource['title'] );

        if ( ! empty( $resource['articles'] ) ) {
          $sanitized_articles = array();

          foreach ( $resource['articles'] as $article ) {
            $sanitized_article = array();

            $sanitized_article['id']     = sanitize_text_field( $article['id'] );
            $sanitized_article['parent'] = sanitize_text_field( $article['parent'] );
            $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
            $sanitized_article['source'] = sanitize_text_field( $article['source'] );

            array_push( $sanitized_articles, $sanitized_article );
          }

          unset( $article );

          $sanitized_resource['articles'] = $sanitized_articles;
        }

        if ( ! empty( $resource['videos'] ) ) {
          $sanitized_videos = array();

          foreach ( $resource['videos'] as $video ) {
            $sanitized_video = $sanitize_video->sanitize_video( $video );

            array_push( $sanitized_videos, $sanitized_video );
          }

          unset( $video );

          $sanitized_resource['videos'] = $sanitized_videos;
        }

        array_push( $sanitized_resources, $sanitized_resource );
      }

      unset( $resource );

      $sanitized['resources'] = $sanitized_resources;
    }

    if ( ! empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}
