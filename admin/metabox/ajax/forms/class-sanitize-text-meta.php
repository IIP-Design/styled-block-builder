<?php

namespace Style_Templates;

class Sanitize_Text_Meta {

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

      $sanitized['articles'] = $sanitized_articles;
    }
    
    if( !empty( $unsanitary['button'] ) ) {
      $sanitized['button'] = sanitize_text_field( $unsanitary['button'] );
    }

    if( !empty( $unsanitary['color'] ) ) {
      $sanitized['color'] = sanitize_text_field( $unsanitary['color'] );
    }

    if( !empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = sanitize_textarea_field( $unsanitary['desc'] );
    }

    if( !empty( $unsanitary['hasFeed'] ) ) {
      $sanitized['hasFeed'] = rest_sanitize_boolean( $unsanitary['hasFeed'] );
    }

    if( !empty( $unsanitary['link'] ) ) {
      $sanitized['link'] = sanitize_text_field( $unsanitary['link'] );
    }

    if( !empty( $unsanitary['style'] ) ) {
      $sanitized['style'] = sanitize_text_field( $unsanitary['style'] );
    }

    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}