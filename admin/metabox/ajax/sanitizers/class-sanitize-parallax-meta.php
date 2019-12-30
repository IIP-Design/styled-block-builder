<?php

namespace Style_Templates;

class Sanitize_Parallax_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if ( !empty( $unsanitary['background'] ) ) {
      $sanitized['background'] = sanitize_text_field( $unsanitary['background'] );
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

    if ( !empty( $unsanitary['hasButton'] ) ) {
      $sanitized['hasButton'] = rest_sanitize_boolean( $unsanitary['hasButton'] );
    }
    
    if ( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }
  
    if ( !empty( $unsanitary['text'] ) ) {
      $sanitized['text'] = sanitize_textarea_field( $unsanitary['text'] );
    }
    
    if ( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}