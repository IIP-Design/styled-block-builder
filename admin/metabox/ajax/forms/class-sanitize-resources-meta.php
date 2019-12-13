<?php

namespace Style_Templates;

class Sanitize_Resources_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if( !empty( $unsanitary['resources'] ) ) {
      $sanitized_resources = array();

      foreach ( $unsanitary['resources'] as $resource ) {
        $sanitized_resource = array();

        $sanitized_resource['id'] = sanitize_text_field( $resource['id'] );
        $sanitized_resource['text'] = sanitize_textarea_field( $resource['text'] );
        $sanitized_resource['title'] = sanitize_text_field( $resource['title'] );
        $sanitized_resource['video'] = sanitize_text_field( $resource['video'] );

        array_push( $sanitized_resources, $sanitized_resource );
      }

      unset($resource);

      $sanitized['resources'] =  $sanitized_resources;
    }

    return $sanitized;
  }
}