<?php
/**
 * Registers the Sanitize_Articles class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded articles and compare.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Articles {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $articles    Unsanitized file values sent over in the AJAX request.
   * @return array             Array of sanitized values
   */
  public function sanitize_articles( $articles ) {

    $sanitized_articles = array();

    foreach ( $articles as $article ) {
      $sanitized_article = array();

      $sanitized_article['id']     = sanitize_text_field( $article['id'] );
      $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
      $sanitized_article['source'] = sanitize_text_field( $article['source'] );

      array_push( $sanitized_articles, $sanitized_article );
    }

    unset( $article );

    return $sanitized_articles;
  }
}
