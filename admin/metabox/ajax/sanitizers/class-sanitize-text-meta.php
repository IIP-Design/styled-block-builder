<?php
/**
 * Registers the Sanitize_Text_Meta class.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the text block form.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Text_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data ) {

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

    if ( ! empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = sanitize_textarea_field( $unsanitary['desc'] );
    }

    if ( !empty( $unsanitary['buttonArrow'] ) ) {
      $sanitized['buttonArrow'] = sanitize_text_field( $unsanitary['buttonArrow'] );
    }
    
    if ( !empty( $unsanitary['buttonLink'] ) ) {
      $sanitized['buttonLink'] = sanitize_text_field( $unsanitary['buttonLink'] );
    }
    
    if ( !empty( $unsanitary['buttonStyle'] ) ) {
      $sanitized['buttonStyle'] = sanitize_text_field( $unsanitary['buttonStyle'] );
    }
    
    if ( !empty( $unsanitary['buttonText'] ) ) {
      $sanitized['buttonText'] = sanitize_text_field( $unsanitary['buttonText'] );
    }

    if ( !empty( $unsanitary['fullWidth'] ) ) {
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

    if ( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( ! empty( $unsanitary['textColor'] ) ) {
      $sanitized['textColor'] = sanitize_text_field( $unsanitary['textColor'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['videoTitle'] ) ) {
      $sanitized['videoTitle'] = sanitize_text_field( $unsanitary['videoTitle'] );
    }

    if ( ! empty( $unsanitary['videoURL'] ) ) {
      $sanitized['videoURL'] = sanitize_text_field( $unsanitary['videoURL'] );
    }

    return $sanitized;
  }
}
