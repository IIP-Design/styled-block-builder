<?php

namespace Style_Templates;

class Sanitize_Article_Feed_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['articles'] ) ) {
      $sanitized_articles = array();

      foreach ( $unsanitary['articles'] as $article ) {
        $sanitized_article = array();

        $sanitized_article['id'] = sanitize_text_field( $article['id'] );
        $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
        $sanitized_article['source'] = sanitize_text_field( $article['source'] );

        array_push( $sanitized_articles, $sanitized_article );
      }

      unset($article);

      $sanitized['articles'] =  $sanitized_articles;
    }

    if( !empty( $unsanitary['type'] ) ) {
      $sanitized['type'] = sanitize_text_field( $unsanitary['type'] );
    }

    return $sanitized;
  }
}