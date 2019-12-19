<?php

namespace Style_Templates;

class Sanitize_Quotebox_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['backgroundType'] ) ) {
      $sanitized['backgroundType'] = sanitize_text_field( $unsanitary['backgroundType'] );
    }

    if( !empty( $unsanitary['backgroundImage'] ) ) {
      $sanitized['backgroundImage'] = sanitize_text_field( $unsanitary['backgroundImage'] );
    }

    if( !empty( $unsanitary['blockBackground'] ) ) {
      $sanitized['blockBackground'] = sanitize_text_field( $unsanitary['blockBackground'] );
    }
    
    if( !empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = sanitize_textarea_field( $unsanitary['desc'] );
    }

    if( !empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }
    
    if( !empty( $unsanitary['quote'] ) ) {
      $sanitized['quote'] = sanitize_textarea_field( $unsanitary['quote'] );
    }

    if( !empty( $unsanitary['quoteBackground'] ) ) {
      $sanitized['quoteBackground'] = sanitize_text_field( $unsanitary['quoteBackground'] );
    }
  
    if( !empty( $unsanitary['speaker'] ) ) {
      $sanitized['speaker'] = sanitize_text_field( $unsanitary['speaker'] );
    }
    
    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if( !empty( $unsanitary['textColor'] ) ) {
      $sanitized['textColor'] = sanitize_text_field( $unsanitary['textColor'] );
    }
    
    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}