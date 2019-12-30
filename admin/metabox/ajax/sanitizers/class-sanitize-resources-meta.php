<?php

namespace Style_Templates;

class Sanitize_Resources_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();
    
    if ( !empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }
    
    if ( !empty( $unsanitary['resources'] ) ) {
      $sanitized_resources = array();

      foreach ( $unsanitary['resources'] as $resource ) {
        $sanitized_resource = array();

        $sanitized_resource['hasFeed'] = rest_sanitize_boolean( $resource['hasFeed'] );
        $sanitized_resource['id'] = sanitize_text_field( $resource['id'] );
        $sanitized_resource['text'] = sanitize_textarea_field( $resource['text'] );
        $sanitized_resource['title'] = sanitize_text_field( $resource['title'] );
        $sanitized_resource['video'] = sanitize_text_field( $resource['video'] );

        if ( !empty( $resource['articles'] ) ) {
          $sanitized_articles = array();
    
          foreach ( $resource['articles'] as $article ) {
            $sanitized_article = array();
    
            $sanitized_article['id'] = sanitize_text_field( $article['id'] );
            $sanitized_article['parent'] = sanitize_text_field( $article['parent'] );
            $sanitized_article['postId'] = sanitize_text_field( $article['postId'] );
            $sanitized_article['source'] = sanitize_text_field( $article['source'] );
    
            array_push( $sanitized_articles, $sanitized_article );
          }
    
          unset($article);
    
          $sanitized_resource['articles'] = $sanitized_articles;
        }

        array_push( $sanitized_resources, $sanitized_resource );
      }

      unset($resource);

      $sanitized['resources'] = $sanitized_resources;
    }

    if ( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}