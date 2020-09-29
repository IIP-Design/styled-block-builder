<?php
/**
 * Registers the Sanitize_Articles class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded article data and sanitize each field.
 *
 * Checks for and sanitizes the fields expected by the article form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Articles {

  /**
   * Checks for and sanitizes the expected article fields.
   *
   * @param array $article   Unsanitized article values sent over in the AJAX request.
   * @return array           Array of sanitized values
   */
  public function sanitize_article( $article ) {
    $sanitized_article = array();

    $sanitized_article['id']     = sanitize_text_field( $article['id'] );
    $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
    $sanitized_article['source'] = sanitize_text_field( $article['source'] );

    if ( ! empty( $article['parent'] ) ) {
      $sanitized_article['parent'] = sanitize_text_field( $article['parent'] );
    }

    return $sanitized_article;
  }

  /**
   * Checks for and sanitizes a group of articles.
   *
   * @param array $articles    Unsanitized article group sent over in the AJAX request.
   * @return array             Array of sanitized values
   */
  public function sanitize_articles( $articles ) {

    $sanitized_articles = array();

    foreach ( $articles as $article ) {
      $sanitized_article = $this->sanitize_article( $article );

      array_push( $sanitized_articles, $sanitized_article );
    }

    unset( $article );

    return $sanitized_articles;
  }
}
